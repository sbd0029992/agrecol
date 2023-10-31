/* eslint-disable @typescript-eslint/no-explicit-any */
import authMiddleware from 'middlewares/authMiddleware';
import Cart from 'models/Cart';
import Product from 'models/Product';
import User from 'models/User';
import { dbConnect } from 'utils/mongosee';

dbConnect();

const handleRequest = async (
  req: { method: any; body: any; query: any },
  res: {
    status: (arg0: number) => {
      json: (arg0: any) => any;
    };
  }
) => {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      try {
        const { startDate, endDate } = query;

        if (startDate && endDate) {
          const sales = await Cart.find({
            createdAt: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          })
            .populate('product', Product)
            .populate('user', User);

          const totalProductsSold = sales.reduce(
            (acc, cart) => acc + cart.quantity,
            0
          );

          return res.status(200).json({ totalProductsSold, sales });
        }

        return res
          .status(400)
          .json({ msg: 'You must provide a startDate and endDate' });
      } catch (error: any) {
        console.error('GET error', error.message);
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
};

export default authMiddleware(handleRequest);
