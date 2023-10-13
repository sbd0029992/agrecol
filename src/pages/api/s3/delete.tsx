/* eslint-disable @typescript-eslint/no-explicit-any */
// /api/s3/delete.js
import { S3 } from 'aws-sdk';

export const config = {
  api: {
    bodyParser: true, // Habilita bodyParser para esta ruta
  },
};

export default async function handler(req: any, res: any) {
  const { method } = req;

  if (method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const deleteFromS3 = async (key: any) => {
    const bucketName = process.env.AWS_BUCKET_NAME;
    if (!bucketName) {
      res.status(500).json({ error: 'AWS_BUCKET_NAME is not defined.' });
      return;
    }

    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: bucketName,
      Key: key,
    };

    try {
      await s3.deleteObject(params).promise();
      res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error('Error deleting from S3:', error);
      res.status(500).json({ error: 'Error deleting from S3.' });
    }
  };

  deleteFromS3(req.body.key);
}
