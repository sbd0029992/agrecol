/* eslint-disable @typescript-eslint/no-explicit-any */
import { S3 } from 'aws-sdk';
import formidable from 'formidable';
import fs from 'fs';
import util from 'util';

const readFile = util.promisify(fs.readFile);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  const { method } = req;
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  async function uploadToS3(file: any, id: any) {
    const bucketName = process.env.AWS_BUCKET_NAME;
    if (!bucketName) {
      res.status(500).json({ error: 'AWS_BUCKET_NAME is not defined.' });
      return;
    }
    const fileContent = await readFile(file.filepath);

    // Aquí agregamos un UUID al nombre del archivo para asegurarnos de que sea único
    const fileName = `${id}/${file.originalFilename}`;

    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileContent,
      ContentType: file.type,
      ACL: 'public-read',
    };

    try {
      const response = await s3.upload(params).promise();
      return response.Location;
    } catch (error) {
      console.error('Error uploading to S3:', error);
    }
  }

  switch (method) {
    case 'POST': {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err: any, fields: any, files: any) => {
        if (err) {
          res.status(500).json({ error: 'Error parsing form data.' });
          return;
        }
        console.log(files); // Agregar esto para verificar si se recibió el archivo
        if (!files.file) {
          res.status(400).json({ error: 'No file received.' });
          return;
        }
        console.log(files.file.path); // Agregar esto para verificar si la propiedad path existe
        const uploadedImageUrl = await uploadToS3(files.file, fields.id);
        res.status(200).json({ imageUrl: uploadedImageUrl });
      });
      break;
    }
    default:
      res.setHeader('Allow', ['POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
