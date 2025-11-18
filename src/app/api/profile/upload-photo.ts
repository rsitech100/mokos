// import { NextApiRequest, NextApiResponse } from "next";
// import formidable from "formidable";
// import fs from "fs/promises";

// // Disable Next.js's default body parser for file upload
// export const config = {
//       api: {
//             bodyParser: false,
//       },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//       if (req.method === "POST") {
//             const form = new formidable.IncomingForm();

//             try {
//                   const { files } = await new Promise<{ files: formidable.Files }>((resolve, reject) => {
//                         form.parse(req, (err, fields, files) => {
//                               if (err) reject(err);
//                               resolve({ files });
//                         });
//                   });

//                   const file = files.file as formidable.File;

//                   // Simulate saving the file (e.g., to a CDN or local storage)
//                   const newFilePath = `./public/uploads/${file.originalFilename}`;
//                   await fs.rename(file.filepath, newFilePath);

//                   const photoUrl = `/uploads/${file.originalFilename}`;
//                   return res.status(200).json({ photoUrl });
//             } catch (error) {
//                   console.error("Error uploading file:", error);
//                   return res.status(500).json({ error: "Internal Server Error" });
//             }
//       } else {
//             res.setHeader("Allow", ["POST"]);
//             res.status(405).end("Method Not Allowed");
//       }
// }
