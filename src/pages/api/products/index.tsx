/* eslint-disable @typescript-eslint/no-explicit-any */
import Product from 'models/Product';
import Rack from 'models/Rack';
import { dbConnect } from 'utils/mongosee';

dbConnect();

async function handler(req: any, res: any) {
  const { method, body } = req;

  let statusFilter: number[] = [];
  if (req.query.status) {
    statusFilter = req.query.status.split(',').map(Number);
  }

  switch (method) {
    case 'GET':
      try {
        let query = {};
        if (statusFilter.length > 0) {
          query = { status: { $in: statusFilter } };
        }

        const allProducts = await Product.find(query).populate({
          path: 'rack',
          model: Rack,
        });
        return res.status(200).json(allProducts);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    case 'POST':
      try {
        const newProduct = new Product(body);
        const savedProduct = await newProduct.save();
        return res.status(201).json(savedProduct);
      } catch (error: any) {
        console.error('Error stack:', error.stack);
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
}

export default handler;
