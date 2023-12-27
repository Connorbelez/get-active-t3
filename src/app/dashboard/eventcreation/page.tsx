"use client"
import Editor from "@/ui/editor";
import React, { useEffect, useRef, useState } from "react";
import { useEditor } from "@tiptap/react";
import { TiptapEditorProps } from "@/ui/editor/props";
import { TiptapExtensions } from "@/ui/editor/extensions";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { useDebouncedCallback } from "use-debounce";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
import va from "@vercel/analytics";
// import DEFAULT_EDITOR_CONTENT from "./default-content";
// import { EditorBubbleMenu } from "@/ui/editor/components/bubble-menu";
import { getPrevText } from "@/lib/editor";
// import { ImageResizer } from "@/ui/editor/components/image-resizer";
// import { generateHTML } from '@tiptap/html'
// import { useMemo } from "react";
// import { DatePicker, DatePickerValue } from "@tremor/react";
// import { NumberInput } from "@tremor/react";
import ReactHtmlParser from "html-react-parser";
import {Tabs, Tab} from "@nextui-org/react";
import axios from "axios";
import { Input } from "@nextui-org/react";
// import Link from "next/link";
import Image from "next/image"
import {Button} from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Switch } from "@nextui-org/switch";
import { title } from "@/components/Primatives/Typography";
// import TextEditor from "./TextEditor";
// import DynamicForm from "./DynamicForm";
// import EventCreationModal from "./EventCreationModal"
// import {useSession} from "next-auth/react";
// import dynamic from "next/dynamic";
import DynamicForm from "./DynamicForm";
import EventCreationModal from "./EventCreationModal"
// import {BlobResult} from "@vercel/blob";



interface ticketData{
  ticket_type: string,
  logo:string,
  paymentTypes:[string]
  price:number,
  drinksInlcuded:boolean,
  alsoIncluded:string
}

interface eventData {
  event_title: string,
  event_headline: string,
  event_date: string,
  event_start_time: string,
  event_length: number,
  event_hero_image: string,
  is_18_plus: boolean,
  is_private: boolean,
  event_city: string,
  event_address: string,
  event_content: string,
}

// interface databasePayload{
//   tickets: ticketData[]
//   event: eventData
// }

export default function App() {


  const [content, setContent] = useLocalStorage(
    "content",
    "DEFAULT_EDITOR_CONTENT",
  );
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [hydrated, setHydrated] = useState(false);
  const [htmlcontent, sethtmlcontent] = useState("");

  const [eventData, setEventData] = useState({
		title: "",
		headline: "",
		date: "",
		startTime: "",
		length: "",
		heroImage: "",
		is18Plus: false,
		cityProvince: "",
		exactAddress: "",
		isPrivate: false,
		eventDescription: "",
	});

	const [ticketTiers, setTicketTiers] = useState([
		{ name: "", price: "", items: "", logo: "", drinksIncluded: false, paymentType: new Set(["Cash"]) },
	]);

	const [formData, setFormData] = useState({
		ticketDataCompleted: false,
		eventDataCompleted: false,
	})


    const handleImageUpload = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            toast.promise(
                fetch("/api/upload", {
                    method: "POST",
                    headers: {
                        "content-type": file?.type || "application/octet-stream",
                        "x-vercel-filename": file?.name || "image.png",
                    },
                    body: file,
                }).then(async (res) => {
                    if (res.status === 200) {
                        const { url } = await res.json();
                        console.log("IMAGE URL FROM UPLOAD-IMAGES PLUGIN: ", url);
                        resolve(url); // Resolving with the URL
                    } else if (res.status === 401) {
                        // Handle unauthorized error
                        const errorMessage = "`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead.";
                        console.error(errorMessage);
                        reject(new Error(errorMessage));
                    } else {
                        // Handle other errors
                        const error = new Error(`Error uploading image. Please try again.`);
                        console.error(error.message);
                        reject(error);
                    }
                }),
                {
                    loading: "Uploading image...",
                    success: "Image uploaded successfully.",
                    error: (e) => {
                        // This will handle any error during the upload process
                        reject(e);
                        return e.message();
                    },
                }
            );
        });
    };

    const handleHeroImage = (file:File)=>{

        if (!file.type.includes("image/")) {
            toast.error("File type not supported.");
            return;

            // check if the file size is less than 20MB
        } else if (file.size / 1024 / 1024 > 20) {
            toast.error("File size too big (max 20MB).");
            return;
        }

        // A fresh object to act as the ID for this upload
        const id = {};

        // Replace the selection with a placeholder


        const reader = new FileReader();
        reader.readAsDataURL(file);

        void handleImageUpload(file).then(
            (urlVal) => {
                console.log("HERO URL: ",urlVal);
                setEventData((prevData) => ({ ...prevData, ["heroImage"]: urlVal }));
                console.log("event data: ", eventData)

            }
        )
    }

	const handleInputChange = (event: any) => {
		const { name, value, type, checked } = event.target;
		const inputValue = type === "checkbox" ? checked : value;
		setEventData((prevData) => ({ ...prevData, [name]: inputValue }));
	};

	const saveEventDetails = (event:React.FormEvent<HTMLFormElement>) => {

		event.stopPropagation()
		event.preventDefault()
        const target = event.target as typeof event.target & {
            heroImage: { value: string };
        };
        console.log("Target: target", target)

        setFormData((prevFormData) => ({
			...prevFormData, // Spread the previous formData object
			eventDataCompleted: true, // Update only the ticketData property
		}));

		console.log("Form Data:", eventData);
		console.log(formData)
		// You can process the data or send it to an API here
	};




  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON();
    console.log("JSON contentff: ", json);
    console.log("MYCONTENT: ", content);
    sethtmlcontent(editor.getHTML());
  
    console.log("HTML: ", editor.getHTML(), typeof editor.getHTML())

    setSaveStatus("Saving...");
    setContent(json);
    // Simulate a delay in saving.
    setTimeout(() => {
      setSaveStatus("Saved");
    }, 500);
  }, 750);

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: (e) => {
      setSaveStatus("Unsaved");
      const selection = e.editor.state.selection;
      const lastTwo = getPrevText(e.editor, {
        chars: 2,
      });
      if (lastTwo === "++" && !isLoading) {
        e.editor.commands.deleteRange({
          from: selection.from - 2,
          to: selection.from,
        });
        void complete(
          getPrevText(e.editor, {
            chars: 5000,
          }),
        );

        va.track("Autocomplete Shortcut Used");
      } else {
        void debouncedUpdates(e);
      }
    },
    autofocus: "end",
  });

  const { complete, completion, isLoading, stop } = useCompletion({
    id: "novel",
    api: "/api/generate",
    onFinish: (_prompt, completion) => {
      editor?.commands.setTextSelection({
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      });
    },
    onError: (err) => {
      toast.error(err.message);
      if (err.message === "You have reached your request limit for the day.") {
        va.track("Rate Limit Reached");
      }
    },
  });

  const prev = useRef("");

  // Insert chunks of the generated text
  useEffect(() => {
    const diff = completion.slice(prev.current.length);
    prev.current = completion;
    editor?.commands.insertContent(diff);
  }, [isLoading, editor, completion]);

  useEffect(() => {
    // if user presses escape or cmd + z and it's loading,
    // stop the request, delete the completion, and insert back the "++"
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || (e.metaKey && e.key === "z")) {
        stop();
        console.log(editor)
        if (e.key === "Escape") {
          editor?.commands.deleteRange({
            from: editor.state.selection.from - completion.length,
            to: editor.state.selection.from,
          });
        }
        editor?.commands.insertContent("++");
      }
    };
    const mousedownHandler = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      stop();
      if (window.confirm("AI writing paused. Continue?")) {
        void complete(editor?.getText() || "");
      }
    };
    if (isLoading) {
      document.addEventListener("keydown", onKeyDown);
      window.addEventListener("mousedown", mousedownHandler);
    } else {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    };
  }, [stop, isLoading, editor, complete, completion.length]);

  // Hydrate the editor with the content from localStorage.
  useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content);
      setHydrated(true);
    }
  }, [editor, content, hydrated]);



	const handleEventCreation = () => {
		console.log("FROM MODAL :", ticketTiers)
		console.log("FROM MODAL :", eventData)
		if(!formData.eventDataCompleted || !formData.ticketDataCompleted){
			alert(`EVENT NOT CREATED! Missing data: eventdata: ${formData.eventDataCompleted} ticketdata: ${formData.ticketDataCompleted}`)
			// throw new Error("Missing Data!");
			return;
		}

		//ToDo: build ticket JSON
		const event : eventData = {
			event_title : eventData.title,
			event_content : htmlcontent,
			event_date : eventData.date,
			event_address : eventData.exactAddress,
			event_city : eventData.cityProvince,
			event_length : parseInt(eventData.length),
			event_headline : eventData.headline,
			event_hero_image : eventData.heroImage,
			event_start_time : eventData.startTime,
			is_18_plus : eventData.is18Plus,
			is_private : eventData.isPrivate,
		}
		const td = ticketTiers.map((ticket)=>{
			const t: ticketData = {
				ticket_type: ticket.name,
				logo:ticket.logo,
				// @ts-ignore
				paymentTypes: [...ticket.paymentType],
				price: parseFloat(ticket.price),
				drinksInlcuded:ticket.drinksIncluded,
				alsoIncluded:ticket.items
			}
			return t
		});


    //ToDo: unhardcode this, implement sessions

    const email = "connor.belez@gmail.com"

		// const creator = Session?.user || "connor.belez@gmail.com"

		const payload  = {
			event : event,
			tickets : JSON.stringify(td),
			creator : email
		}



		console.log("EVENT CREATION TICKET DATA :",payload)
		console.log(JSON.stringify(payload))

        //ToDO: change this to a real url
        const prodUrl = "/api/newevent"

		// const url = "http://localhost:3000/api/newevent";

        //ToDo: revalidate cacheq


//ToDo check for response
		//event type needs an update.
        void axios.post("api/revalidate/events",JSON.stringify({"secret":"sF0XA3UhthHBYxyv"}))
        //ToDo: insert into database here
        //ToDo: this is in the browser, but we need to specify the endpoint on the server hardcoding is bad.
        //can't use env file.
        axios.post(prodUrl, JSON.stringify(payload)).then(response => {
            if (!response.status === true) {
                throw new Error('Network response was not ok');
            }
            return response; // If the response contains JSON data
        })
            .then(data => {
                console.log('PUT request successful:', data);
                // Handle the response data as needed
            })
            .catch(error => {
                console.error('Error making PUT request:', error);
                // Handle any errors that occurred during the request
            });

	}
	const saveTicketDetails = (event:React.FormEvent<HTMLFormElement>) => {
		event.stopPropagation()
		event.preventDefault()

		setFormData((prevFormData) => ({
			...prevFormData, // Spread the previous formData object
			ticketDataCompleted: true, // Update only the ticketData property
		}));
		console.log("Ticket Form Data:", ticketTiers);
		console.log(formData)
		// You can process the data or send it to an API here
	};




  return (
    <div className="flex flex-col items-center justify-items-center place-items-center min-h-screen  sm:px-5 ">
      <div className="divider w-3/4 place-self-center justify-self-center"><h1 className="prose prose-2xl dark:text-slate-400 text-slate-700/50 ">Event Details</h1></div>
      <Card className=" flex justify-center justify-items-center w-3/4 p-5 my-4">


        <form onSubmit={saveEventDetails} className="grid grid-cols-3 grid-flow-row auto-rows-max gap-5 w-full">
                    <div className={"col-span-3"}>
                      <Input
                        label="Title"
                        type="text"
                        variant={"bordered"}
                        radius={"full"}
                        color={"primary"}
                        labelPlacement={"outside"}
                        className={
                          "focus-within:-translate-y-0.5 focus-within:duration-300 focus-within:bg-transparent pt-4"
                        }
                        isRequired
                        name="title"
                        value={eventData.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={"col-span-3"}>
                      <Input
                        isRequired
                        label="Headline"
                        type="text"
                        variant={"bordered"}
                        radius={"full"}
                        color={"primary"}
                        labelPlacement={"outside"}
                        className={
                          "focus-within:-translate-y-0.5 focus-within:duration-300 focus-within:bg-transparent pt-4"
                        }
                        name="headline"
                        value={eventData.headline}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Input
                        isRequired
                        width="186px"
                        label="Date"
                        type="date"
                        variant={"bordered"}
                        radius={"full"}
                        color={"primary"}
                        placeholder={"yyyy-mm-dd"}
                        className={
                          "focus-within:-translate-y-0.5 focus-within:duration-300 focus-within:bg-transparent"
                        }
                        name="date"
                        value={eventData.date}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Input
                        isRequired
                        width="186px"
                        label="Start Time"
                        type="time"
                        variant={"bordered"}
                        radius={"full"}
                        color={"primary"}
                        placeholder={"hh-mm-ss"}
                        className={
                          "focus-within:-translate-y-0.5 focus-within:duration-300 focus-within:bg-transparent"
                        }
                        name="startTime"
                        value={eventData.startTime}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Input
                        label="Length"
                        type="number"
                        variant={"bordered"}
                        radius={"full"}
                        color={"primary"}
                        placeholder={"5"}
                        className={"focus-within:-translate-y-0.5 focus-within:duration-300 "}
                        description={"Length of event (hours)"}
                        name="length"
                        value={eventData.length}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={"col-span-1"}>
                        <div className="max-w-sm h-40 rounded-lg border-2 border-dashed flex items-center justify-center relative">
                            <label htmlFor="file" className="cursor-pointer text-center p-4 mt-10 md:p-8 absolute inset-0 z-0 flex items-center justify-center">
                                <svg className="w-10 h-10 mx-auto " viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </label>
                            <p className="mt-3 text-gray-700 max-w-xs mx-auto absolute z-10">Click to <span className="font-medium text-indigo-600">Upload your file</span> or drag and drop your file here</p>
                            <input
                                type="file"
                                name="heroImage"
                                className="rounded-xl bg-violet-700 text-black h-full w-full opacity-0 absolute inset-0 z-10"
                                id="heroImage"
                                onChange={(e:any) => {
                                    // Check if files are selected and pass the first file to handleHeroImage
                                    if (e.target.files && e.target.files.length > 0) {
                                        handleHeroImage(e.target.files[0]);
                                    }
                                }}
                            >
                            </input>
                        </div>

                    </div>
                    <div className={'col-span-1'}>
                        <Image
                            src={eventData.heroImage || ""}
                            alt={"Hero Image"}
                            width={200}
                            height={200}
                        >

                        </Image>
                    </div>
                    <div className={"flex items-center justify-center"}>
                      <Switch
                        defaultSelected={eventData.is18Plus}
                        size="lg"
                        onValueChange={(checked : boolean) => setEventData((prevData) => ({ ...prevData, is18Plus: checked }))}
                      >
                        18+
                      </Switch>
                    </div>
                    <div className={"col-span-1"}>
                      <Input
                        isRequired
                        label="City, Province"
                        type="text"
                        variant={"bordered"}
                        radius={"full"}
                        color={"primary"}
                        labelPlacement={"outside"}
                        description={"visible to all"}
                        className={
                          "focus-within:-translate-y-0.5 focus-within:duration-300 focus-within:bg-transparent pt-4"
                        }
                        name="cityProvince" value={eventData.cityProvince}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={"col-span-1"}>
                      <Input
                        label="Exact Address"
                        type="text"
                        variant={"bordered"}
                        radius={"full"}
                        color={"primary"}
                        labelPlacement={"outside"}
                        description={"enable private to only show to ticket holders"}
                        className={
                          "focus-within:-translate-y-0.5 focus-within:duration-300 focus-within:bg-transparent pt-4"
                        }
                        name="exactAddress"
                        value={eventData.exactAddress}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={"flex pt-4 items-center justify-center"}>
                      <Switch
                        defaultSelected={eventData.isPrivate}
                        size="md"

                        // isSelected={eventData.isPrivate}
                        onValueChange={
                          (checked :boolean ) =>
                            setEventData((prevData) =>
                              ({ ...prevData, isPrivate: checked }))}
                      >
                        Private
                      </Switch>
                    </div>
                    <div className={"col-span-3 row-span-3"}>

                      <Editor editor={editor} saveStatus={saveStatus}/>
                    </div>

                    <Button
                      variant={"ghost"}
                      className={"rounded-full"}
                      type={"submit"}
                      >Save Event</Button>
        </form>
    </Card>
    <div className="divider w-3/4 place-self-center justify-self-center"><h1 className="prose prose-2xl dark:text-slate-400 text-slate-700/50 ">Ticket Details</h1></div>
    <Card className=" flex justify-center justify-items-center w-3/4 p-5">
      <DynamicForm
          ticketTiers={ticketTiers}
          // @ts-ignore
          setTicketTiers={setTicketTiers}
          formSubmit={saveTicketDetails} />
    </Card>
    <EventCreationModal onCreate={handleEventCreation} formData={formData}></EventCreationModal>


        <div className="divider w-3/4 place-self-center justify-self-center"><h1 className="prose prose-2xl dark:text-slate-400 text-slate-700/50 my-4">Preview</h1></div>

        <div className="w-full">
            <Card className="max-w-full">
                <CardBody className="overflow-hidden">
                    <Tabs
                        fullWidth
                        size="md"
                        color="primary"
                        variant="bordered"
                        aria-label="Tabs form"

                        disableAnimation={false}
                    >
                        <Tab key="mobile" title="Mobile" className={"grid justify-center justify-items-center"}>
                            <div className="mockup-phone border-primary">
                                <div className="camera"></div>
                                <div className="display">
                                    <div className="artboard artboard-demo phone-1 ">
                                        <div className={"overflow-auto"}>
                                            <div className={"mt-10"}
                                            ></div>
                                            <h1 className={title({ color: "cyan",size:"md" })}>About Event&nbsp;</h1>
                                            <div className="prose prose-sm">{ReactHtmlParser(htmlcontent)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab key="web" title="Web" >
                            <div className="mockup-browser border bg-neutral-200 px-2">
                                <div className="mockup-browser-toolbar">
                                    <div className="input text-slate-800/60">{`https://get-active.app/${eventData.title}`}</div>
                                </div>
                                <div className={"p-2"}>
                                    <h1 className={title({ color: "cyan" })}>About Event&nbsp;</h1>
                                    <div className="prose prose-lg sm:w-1/2 py-4">{ReactHtmlParser(htmlcontent)}</div>
                                </div>
                            </div>

                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    </div>
  );
}
