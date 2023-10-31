/* eslint-disable @typescript-eslint/no-explicit-any */
import authMiddleware from 'middlewares/authMiddleware';
import Cart from 'models/Cart';
import Product from 'models/Product';
import User from 'models/User';
import { dbConnect } from 'utils/mongosee';

dbConnect();

async function handler(req: any, res: any) {
  const { method, body } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const cart = await Cart.findById(id)
          .populate({ path: 'user', model: User })
          .populate({ path: 'product', model: Product });
        return res.status(200).json(cart);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    case 'PUT':
      try {
        const updatedCart = await Cart.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        })
          .populate({ path: 'user', model: User })
          .populate({ path: 'product', model: Product });
        return res.status(200).json(updatedCart);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    case 'DELETE':
      try {
        const deletedCart = await Cart.findByIdAndRemove(id);
        if (!deletedCart) {
          return res.status(404).json({ msg: 'No cart found with this ID' });
        }
        return res.status(200).json({ msg: 'Cart deleted' });
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
}

export default authMiddleware(handler);
