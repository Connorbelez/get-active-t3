// import { EditorState, Plugin, PluginKey } from '@tiptap/pm/state';
// import { Decoration, DecorationSet, EditorView } from '@tiptap/pm/view';
// import { toast } from 'sonner';
//
// const uploadKey = new PluginKey('upload-file');
//
// const UploadFilesPlugin = () =>
//     new Plugin({
//         key: uploadKey,
//         state: {
//             init() {
//                 return DecorationSet.empty;
//             },
//             apply(tr, set) {
//                 set = set.map(tr.mapping, tr.doc);
//                 const action = tr.getMeta(this);
//                 if (action && action.add) {
//                     const { id, pos } = action.add;
//                     const placeholder = document.createElement("div");
//                     placeholder.setAttribute("class", "pdf-placeholder");
//                     placeholder.textContent = "Uploading PDF...";
//
//                     const file = document.createElement("a");
//
//                     file.setAttribute(
//                         "class",
//                         "opacity-40 rounded-lg border border-stone-200",
//                     );
//                     placeholder.appendChild(file);
//
//                     const deco = Decoration.widget(pos + 1, placeholder, { id });
//                     set = set.add(tr.doc, [deco]);
//                 } else if (action && action.remove) {
//                     //@ts-ignore
//                     set = set.remove(set.find(null, null, (spec) => spec.id == action.remove.id));
//                 }
//                 return set;
//             },
//         },
//         props: {
//             decorations(state) {
//                 return this.getState(state);
//             },
//         },
//     });
//
// export default UploadFilesPlugin;
//
// function findPlaceholder(state, id) {
//     console.log("STATE: ",state)
//     const decos = uploadKey.getState(state);
//     //@ts-ignore
//     const found = decos.find(null, null, (spec) => spec.id == id);
//     return found.length ? found[0].from : null;
// }
//
// export function startFileUpload(file, view, pos) {
//     if (!file.type.includes('application/pdf')) {
//         toast.error('File type not supported. Only PDFs are allowed.');
//         return;
//     }
//
//     // A fresh object to act as the ID for this upload
//     const id = {};
//
//     // Replace the selection with a placeholder
//     const tr = view.state.tr;
//     if (!tr.selection.empty) tr.deleteSelection();
//
//     tr.setMeta(uploadKey, {
//         add: { id, pos },
//     });
//     view.dispatch(tr);
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//         tr.setMeta(uploadKey, {
//             add: {
//                 id,
//                 pos,
//                 src: reader.result,
//             },
//         });
//         view.dispatch(tr);
//     };
//
//     handleFileUpload(file).then((url) => {
//         const { schema } = view.state;
//         let pos = findPlaceholder(view.state, id);
//         if (pos == null) return;
//
//         // Insert a link to the PDF at the placeholder's position
//         const node = schema.nodes.pdf_link.create({ href: url, text: file.name });
//         const transaction = view.state.tr
//             .replaceWith(pos, pos, node)
//             .setMeta(uploadKey, { remove: { id } });
//         view.dispatch(transaction);
//     });
// }
//
// export const handleFileUpload = (file) => {
//     return new Promise((resolve) => {
//         toast.promise(
//             fetch("/api/upload", {
//                 method: "POST",
//                 headers: {
//                     "content-type": file?.type || "application/octet-stream",
//                     "x-vercel-filename": file?.name || "file.pdf",
//                 },
//                 body: file,
//             }).then(async (res) => {
//                 if (res.status === 200) {
//                     const { url } = await res.json();
//                     resolve(url);
//                 } else {
//                     throw new Error('Error uploading file. Please try again.');
//                 }
//             }),
//             {
//                 loading: "Uploading PDF...",
//                 success: "PDF uploaded successfully.",
//                 error: (e) => e.message,
//             },
//         );
//     });
// };


import { BlobResult } from "@vercel/blob";
import { toast } from "sonner";
import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet, EditorView } from "@tiptap/pm/view";
const uploadKey = new PluginKey('upload-file');
import {PDFLink} from "../extensions/PDFLink/PDFLink"

const UploadFilesPlugin = () =>
    new Plugin({
        key: uploadKey,
        state: {
            init() {
                return DecorationSet.empty;
            },
            apply(tr, set) {
                set = set.map(tr.mapping, tr.doc);
                // See if the transaction adds or removes any placeholders
                const action = tr.getMeta(this);
                if (action && action.add) {
                    const { id, pos, src } = action.add;

                    const placeholder = document.createElement("div");
                    placeholder.setAttribute("class", "pdf-placeholder");


                    const image = document.createElement("a");
                    image.setAttribute(
                        "class",
                        "opacity-40 rounded-lg border border-stone-200",
                    );
                    image.href = src;
                    placeholder.appendChild(image);


                    const deco = Decoration.widget(pos + 1, placeholder, {
                        id,
                    });
                    set = set.add(tr.doc, [deco]);


                } else if (action && action.remove) {
                    set = set.remove(
                        //@ts-ignore
                        set.find(null, null, (spec) => spec.id == action.remove.id),
                    );
                }
                return set;
            },
        },
        props: {
            decorations(state) {
                return this.getState(state);
            },
        },
    });

export default UploadFilesPlugin;

function findPlaceholder(state: EditorState, id: {}) {
    console.log("STATEFILE: ",state)
    const decos = uploadKey.getState(state);
    console.log("UPLOAD KEY: Decos ",decos)
    console.log("ID: ",id)
    const found = decos.find(null, null, (spec) => spec.id == id);
    return found.length ? found[0].from : null;
}

export function startFileUpload(file: File, view: EditorView, pos: number) {
    // check if the file is an image
    if (!file.type.includes("application/pdf")) {
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
    const tr = view.state.tr;
    if (!tr.selection.empty) tr.deleteSelection();

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        tr.setMeta(uploadKey, {
            add: {
                id,
                pos,
                src: reader.result,
            },
        });
        view.dispatch(tr);
    };

    handleFileUpload(file).then((url) => {
        const { schema } = view.state;

        let pos = findPlaceholder(view.state, id);
        // If the content around the placeholder has been deleted, drop
        // the image
        if (pos == null) return;

        // Otherwise, insert it at the placeholder's position, and remove
        // the placeholder

        // When BLOB_READ_WRITE_TOKEN is not valid or unavailable, read
        // the image locally
        // const imageSrc = typeof src === "object" ? reader.result : src;
        console.log("HFU URL: ",url,'FILE NAMEL: ',file.name)
        const node = schema.nodes.pdflink.create({ href: url, text: file.name });
        const transaction = view.state.tr
            .replaceWith(pos, pos, node)
            .setMeta(uploadKey, { remove: { id } });
        view.dispatch(transaction);
    });
}

export const handleFileUpload = (file: File) => {
    // upload to Vercel Blob
    return new Promise((resolve) => {
        toast.promise(
            fetch("/api/uploadFile", {
                method: "POST",
                headers: {
                    "content-type": file?.type || "application/pdf",
                    "x-vercel-filename": file?.name || "doc.pdf",
                },
                body: file,
            }).then(async (res) => {
                // Successfully uploaded image
                if (res.status === 200) {
                    const { url } = (await res.json()) as BlobResult;
                    console.log("IMAGE URL FROM UPLOAD-IMAGES PLUGIN: ", url);
                    // preload the image
                    resolve(url)
                    // No blob store configured
                } else if (res.status === 401) {
                    resolve(file);

                    throw new Error(
                        "`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead.",
                    );
                    // Unknown error
                } else {
                    throw new Error(`Error uploading image. Please try again.`);
                }
            }),
            {
                loading: "Uploading image...",
                success: "Image uploaded successfully.",
                error: (e) => e.message,
            },
        );
    });
};
