
import {NextResponse } from "next/server";

import {
    S3Client,

    PutObjectCommand
} from "@aws-sdk/client-s3";
// import { Readable } from 'stream';
// import { pipeline } from 'stream/promises';
// import path from 'path';
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import formidable from 'formidable';
import {v4 as uuidv4} from 'uuid';
// import multer from 'multer';
const accountid = "7ae396f6a94454a9629d2684fe843ef5"

//
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
//   },
// });
//@ts-ignore
const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${accountid}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.CLOUD_FLARE_BUCKET_ACCESS_ID,
        secretAccessKey: process.env.CLOUD_FLARE_BUCKET_SECRET_ID,
    },
});
// export const config = {
//   api: {
//     bodyParser: false, // Disabling Next.js's body parser as we're handling the stream manually
//   },
// };

async function streamToBuffer(readableStream: ReadableStream): Promise<Buffer> {
    const reader = readableStream.getReader();
    const chunks: Uint8Array[] = [];

    //ToDo: this is unsafe, add timeout and max size
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        chunks.push(value);
    }

    return Buffer.concat(chunks);
}

//@ts-ignore
export async function POST(req: Request) {
    console.log("POST UPLOAD IMAGE!!!!")


    const file = req.body;
    // @ts-ignore
    const filename = (req.headers['x-vercel-filename'] as string) || "file.pdf";
    // @ts-ignore
    const contentType = (req.headers['content-type'] as string) || "application/pdf";

    const fileType = `.${contentType.split("/")[1]}`;
    console.log("FILEasdf : ",file, typeof file);
    const id = uuidv4();
    // construct final filename based on content-type if not provided
    const finalName = filename.includes(fileType)
        ? filename
        : `${filename}${id}${fileType}`;

    //@ts-ignore
    const buffer = await streamToBuffer(file);
    console.log("FILE NAME : ",finalName);
    console.log("FILE TYPE : ",fileType);
    console.log("CONTENT TYPE : ",contentType);
    console.log("FILE : ",buffer, typeof buffer);

    //read image from filesystem into buffer
    try{


        try{
            const params = {
                Bucket: 'getactiveimages', // replace with your bucket name
                Key: finalName, // File name you want to save as in S3
                Body: buffer,
                ContentType: 'application/pdf', // update to match the incoming file type
                ACL: 'public-read', // File permission
            };
            //@ts-ignore
            const data = await S3.send(new PutObjectCommand(params));
            console.log("Data from s3: ",data);
        }catch(err){
            console.error("Error uploading to s3: ",err);
        }
        //upload file to s3 bucket

    }
    catch(err){
        console.error("Error reading file: ",err);
    }

    return NextResponse.json({ success: true, message: `File uploaded to ${finalName}`, url: `https://get-active.app/${finalName}` });


}
