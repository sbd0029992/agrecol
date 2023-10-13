/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
import Product from 'models/Product';
import Rack from 'models/Rack';
import { dbConnect } from 'utils/mongosee';

dbConnect();

async function handler(req: any, res: any) {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const product = await Product.findById(id).populate({
          path: 'rack',
          model: Rack,
        });
        return res.status(200).json({ product });
      } catch (error: any) {
        return res.status(500).json({ msg: error.message });
      }
    case 'PUT':
      try {
        const updateProduct = await Product.findByIdAndUpdate(id, body, {
          new: true,
        });
        if (!updateProduct) return res.status(404).end(`Product not found`);
        return res.status(200).json({ updateProduct });
      } catch (error: any) {
        return res.status(400).json({ msg: error.message });
      }
    case 'DELETE':
      try {
        const deleteProduct = await Product.findByIdAndDelete(id);
        if (!deleteProduct) return res.status(404).end(`Product not found`);
        return res.status(204).json({ deleteProduct });
      } catch (error: any) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default handler;
