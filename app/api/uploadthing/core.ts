import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    videoUploader: f({ video: { maxFileSize: "64MB", maxFileCount: 1 } }).onUploadComplete(async ({metadata, file}) => {
        return {fileUrl: file.ufsUrl, fileKey: file.key};
    }),
    imageUploader: f({image: { maxFileSize: "16MB", maxFileCount: 1 }}).onUploadComplete(async ({file}) => {
        return {fileUrl: file.ufsUrl, FileKey: file.key}
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;