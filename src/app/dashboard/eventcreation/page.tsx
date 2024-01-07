"use client";
import Editor from "@/ui/editor";
import React, { useEffect, useRef, useState } from "react";
import { useEditor } from "@tiptap/react";
import { TiptapEditorProps } from "@/ui/editor/props";
// import { TiptapExtensions } from "@/ui/editor/extensions";
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
import { Tabs, Tab } from "@nextui-org/react";
import axios from "axios";
import { Input } from "@nextui-org/react";
// import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Switch } from "@nextui-org/switch";
import { title } from "@/components/Primatives/Typography";
// import TextEditor from "./TextEditor";
// import DynamicForm from "./DynamicForm";
// import EventCreationModal from "./EventCreationModal"
// import {useSession} from "next-auth/react";
// import dynamic from "next/dynamic";
import DynamicForm from "./DynamicForm";
import EventCreationModal from "./EventCreationModal";
// import {BlobResult} from "@vercel/blob";
import { api } from "@/trpc/react";
import z from "zod";
import { ticketTypeSchema, eventSchema } from "@/types/schemas";
import { useResetProjection } from "framer-motion";



interface eventData {
  event_title: string;
  event_headline: string;
  event_date: string;
  event_start_time: string;
  event_length: number;
  event_hero_image: string;
  is_18_plus: boolean;
  is_private: boolean;
  event_city: string;
  event_address: string;
  event_content: string;
}

// interface databasePayload{
//   tickets: ticketData[]
//   event: eventData
// }

export default function App() {
  const mutate = api.event.create.useMutation();

  // const createEventMutation = useMutation('.create');

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
    {
      name: "",
      price: "",
      items: "",
      logo: "",
      drinksIncluded: false,
      paymentType: new Set(["Cash"]),
    },
  ]);

  const [formData, setFormData] = useState({
    ticketDataCompleted: false,
    eventDataCompleted: false,
  });

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
            //console.log("IMAGE URL FROM UPLOAD-IMAGES PLUGIN: ", url);
            resolve(url); // Resolving with the URL
          } else if (res.status === 401) {
            // Handle unauthorized error
            const errorMessage =
              "`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead.";
            //console.error(errorMessage);
            reject(new Error(errorMessage));
          } else {
            // Handle other errors
            const error = new Error(`Error uploading image. Please try again.`);
            //console.error(error.message);
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
        },
      );
    });
  };

  const handleHeroImage = (file: File) => {
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

    void handleImageUpload(file).then((urlVal) => {
      //console.log("HERO URL: ", urlVal);
      setEventData((prevData) => ({ ...prevData, ["heroImage"]: urlVal }));
      //console.log("event data: ", eventData);
    });
  };

  const handleInputChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    setEventData((prevData) => ({ ...prevData, [name]: inputValue }));
  };

  const saveEventDetails = (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const target = event.target as typeof event.target & {
      heroImage: { value: string };
    };
    //console.log("Target: target", target);

    setFormData((prevFormData) => ({
      ...prevFormData, // Spread the previous formData object
      eventDataCompleted: true, // Update only the ticketData property
    }));

    //console.log("Form Data:", eventData);
    //console.log(formData);
    // You can process the data or send it to an API here
  };

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON();
    //console.log("JSON contentff: ", json);
    //console.log("MYCONTENT: ", content);
    sethtmlcontent(editor.getHTML());

    //console.log("HTML: ", editor.getHTML(), typeof editor.getHTML());

    setSaveStatus("Saving...");
    setContent(json);
    // Simulate a delay in saving.
    setTimeout(() => {
      setSaveStatus("Saved");
    }, 500);
  }, 750);

  // const editor = useEditor({
  //   extensions: TiptapExtensions,
  //   editorProps: TiptapEditorProps,
  //   onUpdate: (e) => {
  //     setSaveStatus("Unsaved");
  //     const selection = e.editor.state.selection;
  //     const lastTwo = getPrevText(e.editor, {
  //       chars: 2,
  //     });
  //     if (lastTwo === "++" && !isLoading) {
  //       e.editor.commands.deleteRange({
  //         from: selection.from - 2,
  //         to: selection.from,
  //       });
  //       void complete(
  //         getPrevText(e.editor, {
  //           chars: 5000,
  //         }),
  //       );

  //       va.track("Autocomplete Shortcut Used");
  //     } else {
  //       void debouncedUpdates(e);
  //     }
  //   },
  //   autofocus: "end",
  // });

  // const { complete, completion, isLoading, stop } = useCompletion({
  //   id: "novel",
  //   api: "/api/generate",
  //   onFinish: (_prompt, completion) => {
  //     editor?.commands.setTextSelection({
  //       from: editor.state.selection.from - completion.length,
  //       to: editor.state.selection.from,
  //     });
  //   },
  //   onError: (err) => {
  //     toast.error(err.message);
  //     if (err.message === "You have reached your request limit for the day.") {
  //       va.track("Rate Limit Reached");
  //     }
  //   },
  // });

  const prev = useRef("");

  // Insert chunks of the generated text
  // useEffect(() => {
  //   const diff = completion.slice(prev.current.length);
  //   prev.current = completion;
  //   editor?.commands.insertContent(diff);
  // }, [isLoading, editor, completion]);

  // useEffect(() => {
  //   // if user presses escape or cmd + z and it's loading,
  //   // stop the request, delete the completion, and insert back the "++"
  //   const onKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "Escape" || (e.metaKey && e.key === "z")) {
  //       stop();
  //       //console.log(editor);
  //       if (e.key === "Escape") {
  //         editor?.commands.deleteRange({
  //           from: editor.state.selection.from - completion.length,
  //           to: editor.state.selection.from,
  //         });
  //       }
  //       editor?.commands.insertContent("++");
  //     }
  //   };
  //   const mousedownHandler = (e: MouseEvent) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     stop();
  //     if (window.confirm("AI writing paused. Continue?")) {
  //       void complete(editor?.getText() || "");
  //     }
  //   };
  //   if (isLoading) {
  //     document.addEventListener("keydown", onKeyDown);
  //     window.addEventListener("mousedown", mousedownHandler);
  //   } else {
  //     document.removeEventListener("keydown", onKeyDown);
  //     window.removeEventListener("mousedown", mousedownHandler);
  //   }
  //   return () => {
  //     document.removeEventListener("keydown", onKeyDown);
  //     window.removeEventListener("mousedown", mousedownHandler);
  //   };
  // }, [stop, isLoading, editor, complete, completion.length]);

  // Hydrate the editor with the content from localStorage.
  // useEffect(() => {
  //   if (editor && content && !hydrated) {
  //     editor.commands.setContent(content);
  //     setHydrated(true);
  //   }
  // }, [editor, content, hydrated]);





  const handleEventCreation = () => {
      //console.log("FROM MODAL :", ticketTiers);
      //console.log("FROM MODAL :", eventData);
      if (!formData.eventDataCompleted || !formData.ticketDataCompleted) {
        alert(
          `EVENT NOT CREATED! Missing data: eventdata: ${formData.eventDataCompleted} ticketdata: ${formData.ticketDataCompleted}`,
        );
        // throw new Error("Missing Data!");
        return;
      }

      //ToDo: build ticket JSON
      const event: eventData = {
        event_title: eventData.title,
        event_content: htmlcontent,
        event_date: eventData.date,
        event_address: eventData.exactAddress,
        event_city: eventData.cityProvince,
        event_length: parseInt(eventData.length),
        event_headline: eventData.headline,
        event_hero_image: eventData.heroImage,
        event_start_time: eventData.startTime,
        is_18_plus: eventData.is18Plus,
        is_private: eventData.isPrivate,
      };


      const td = ticketTiers.map((ticket) => {
        const t: any = {
          name: ticket.name,
          logo: ticket.logo,
          paymentTypes: Array.from(ticket.paymentType).toString(),
          price: parseFloat(ticket.price),
          foodIncluded: false,
          drinksInlcuded: true,
          ticketDescription: { description: ticket.items },
        };
        return t;
      });

      const ticketTypesSchemas = td.map((ticket) => {
        //console.log("TICKET: ", ticket)
        return ticketTypeSchema.parse({
          name: ticket.name,
          logo: ticket.logo,
          paymentTypes: ticket.paymentTypes,
          price: ticket.price,
          foodIncluded: ticket.foodIncluded,
          drinksIncluded: false,
          ticketDescription: ticket.ticketDescription,
        });
      });

      const eventZodInput = {
        title: event.event_title,
        address: event.event_address,
        headline: event.event_headline,
        category: "Party",
        heroImage: event.event_hero_image,
        startDate: event.event_date,
        startTime: event.event_start_time,
        location: event.event_city,
        eventDescription: event.event_content,
        length: event.event_length,
        capacity: 100,
        adultOnly: event.is_18_plus,
        private: event.is_private,
        // foodIncluded: false,
        // drinksIncluded: false,
        ticketTypes: ticketTypesSchemas,
        ticketStartingPrice: 0,
        createdById: "1234",
        createdByEmail: "connor.belez@gmail.com",
      };

      const email = "connor.belez@gmail.com";



      const payload = {
        event: event,
        tickets: JSON.stringify(td),
        creator: email,
      };

      //console.log("EVENT CREATION TICKET DATA :", payload);
      //console.log(JSON.stringify(payload));

      const prodUrl = "/api/newevent";

      try {
        // const res = await api.event.create.mutate(eventSchema.parse(eventZodInput))
        // const mutate = api.event.create.useMutation();
        void mutate.mutateAsync(eventSchema.parse({
          title: event.event_title,
          address: event.event_address,
          headline: event.event_headline,
          category: "Party",
          heroImage: event.event_hero_image,
          startDate: event.event_date,
          startTime: event.event_start_time,
          location: event.event_city,
          eventDescription: event.event_content,
          length: event.event_length,
          capacity: 100,
          adultOnly: event.is_18_plus,
          private: event.is_private,
          // foodIncluded: false,
          // drinksIncluded: false,
          ticketTypes: ticketTypesSchemas,
          ticketStartingPrice: 0,
          createdById: "1234",
          createdByEmail: "connor.belez@gmail.com",
        })).then((res) => {
          //console.log("\n\n\n======================RES: ", res);
          //console.table(res);
          alert("EVENT CREATED!");
        });
      } catch (e:any)  {
        //console.log("ERROR: ",e);
        //throw alert
        alert("DB INSERTION ERROR!");
      }
 
  };





  const saveTicketDetails = (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();

    setFormData((prevFormData) => ({
      ...prevFormData, // Spread the previous formData object
      ticketDataCompleted: true, // Update only the ticketData property
    }));
    //console.log("Ticket Form Data:", ticketTiers);
    //console.log(formData);
    // You can process the data or send it to an API here
  };

  return (
    <div className="flex min-h-screen flex-col place-items-center items-center justify-items-center  sm:px-5 ">
      <div className="divider w-3/4 place-self-center justify-self-center">
        <h1 className="prose prose-2xl text-slate-700/50 dark:text-slate-400 ">
          Event Details
        </h1>
      </div>
      <Card className=" my-4 flex w-3/4 justify-center justify-items-center p-5">
        <form
          onSubmit={saveEventDetails}
          className="grid w-full grid-flow-row auto-rows-max grid-cols-3 gap-5"
        >
          <div className={"col-span-3"}>
            <Input
              label="Title"
              type="text"
              variant={"bordered"}
              radius={"full"}
              color={"primary"}
              labelPlacement={"outside"}
              className={
                "pt-4 focus-within:-translate-y-0.5 focus-within:bg-transparent focus-within:duration-300"
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
                "pt-4 focus-within:-translate-y-0.5 focus-within:bg-transparent focus-within:duration-300"
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
                "focus-within:-translate-y-0.5 focus-within:bg-transparent focus-within:duration-300"
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
                "focus-within:-translate-y-0.5 focus-within:bg-transparent focus-within:duration-300"
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
              className={
                "focus-within:-translate-y-0.5 focus-within:duration-300 "
              }
              description={"Length of event (hours)"}
              name="length"
              value={eventData.length}
              onChange={handleInputChange}
            />
          </div>
          <div className={"col-span-1"}>
            <div className="relative flex h-40 max-w-sm items-center justify-center rounded-lg border-2 border-dashed">
              <label
                htmlFor="file"
                className="absolute inset-0 z-0 mt-10 flex cursor-pointer items-center justify-center p-4 text-center md:p-8"
              >
                <svg
                  className="mx-auto h-10 w-10 "
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667"
                    stroke="#4F46E5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
              <p className="absolute z-10 mx-auto mt-3 max-w-xs text-gray-700">
                Click to{" "}
                <span className="font-medium text-indigo-600">
                  Upload your file
                </span>{" "}
                or drag and drop your file here
              </p>
              <input
                type="file"
                name="heroImage"
                className="absolute inset-0 z-10 h-full w-full rounded-xl bg-violet-700 text-black opacity-0"
                id="heroImage"
                onChange={(e: any) => {
                  // Check if files are selected and pass the first file to handleHeroImage
                  if (e.target.files && e.target.files.length > 0) {
                    handleHeroImage(e.target.files[0]);
                  }
                }}
              ></input>
            </div>
          </div>
          <div className={"col-span-1"}>
            <Image
              src={eventData.heroImage || ""}
              alt={"Hero Image"}
              width={200}
              height={200}
            ></Image>
          </div>
          <div className={"flex items-center justify-center"}>
            <Switch
              defaultSelected={eventData.is18Plus}
              size="lg"
              onValueChange={(checked: boolean) =>
                setEventData((prevData) => ({ ...prevData, is18Plus: checked }))
              }
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
                "pt-4 focus-within:-translate-y-0.5 focus-within:bg-transparent focus-within:duration-300"
              }
              name="cityProvince"
              value={eventData.cityProvince}
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
                "pt-4 focus-within:-translate-y-0.5 focus-within:bg-transparent focus-within:duration-300"
              }
              name="exactAddress"
              value={eventData.exactAddress}
              onChange={handleInputChange}
            />
          </div>
          <div className={"flex items-center justify-center pt-4"}>
            <Switch
              defaultSelected={eventData.isPrivate}
              size="md"
              // isSelected={eventData.isPrivate}
              onValueChange={(checked: boolean) =>
                setEventData((prevData) => ({
                  ...prevData,
                  isPrivate: checked,
                }))
              }
            >
              Private
            </Switch>
          </div>
          {/* <div className={"col-span-3 row-span-3"}>
            <Editor editor={editor} saveStatus={saveStatus} />
          </div> */}

          <Button variant={"ghost"} className={"rounded-full"} type={"submit"}>
            Save Event
          </Button>
        </form>
      </Card>
      <div className="divider w-3/4 place-self-center justify-self-center">
        <h1 className="prose prose-2xl text-slate-700/50 dark:text-slate-400 ">
          Ticket Details
        </h1>
      </div>
      <Card className=" flex w-3/4 justify-center justify-items-center p-5">
        <DynamicForm
          ticketTiers={ticketTiers}
          // @ts-ignore
          setTicketTiers={setTicketTiers}
          formSubmit={saveTicketDetails}
        />
      </Card>
      <EventCreationModal
        onCreate={handleEventCreation}
        formData={formData}
      ></EventCreationModal>

      <div className="divider w-3/4 place-self-center justify-self-center">
        <h1 className="prose prose-2xl my-4 text-slate-700/50 dark:text-slate-400">
          Preview
        </h1>
      </div>

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
              <Tab
                key="mobile"
                title="Mobile"
                className={"grid justify-center justify-items-center"}
              >
                <div className="mockup-phone border-primary">
                  <div className="camera"></div>
                  <div className="display">
                    <div className="artboard artboard-demo phone-1 ">
                      <div className={"overflow-auto"}>
                        <div className={"mt-10"}></div>
                        <h1 className={title({ color: "cyan", size: "md" })}>
                          About Event&nbsp;
                        </h1>
                        <div className="prose prose-sm">
                          {ReactHtmlParser(htmlcontent)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab key="web" title="Web">
                <div className="mockup-browser border bg-neutral-200 px-2">
                  <div className="mockup-browser-toolbar">
                    <div className="input text-slate-800/60">{`https://get-active.app/${eventData.title}`}</div>
                  </div>
                  <div className={"p-2"}>
                    <h1 className={title({ color: "cyan" })}>
                      About Event&nbsp;
                    </h1>
                    <div className="prose prose-lg py-4 sm:w-1/2">
                      {ReactHtmlParser(htmlcontent)}
                    </div>
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
