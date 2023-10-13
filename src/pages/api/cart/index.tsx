/* eslint-disable @typescript-eslint/no-explicit-any */
import Cart from 'models/Cart';
import Product from 'models/Product';
import User from 'models/User';
import mongoose from 'mongoose';
import { dbConnect } from 'utils/mongosee';

dbConnect();

async function handler(req: any, res: any) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const userId = req.query.userId;
        const carts = await Cart.find({
          user: userId,
          status: { $in: [1, 2] },
        })
          .populate({
            path: 'user',
            model: User,
          })
          .populate({ path: 'product', model: Product });
        return res.status(200).json(carts);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    case 'POST':
      try {
        const newCart = new Cart(body);
        await newCart.save();
        const populatedCart = await Cart.findById(newCart._id)
          .populate({
            path: 'user',
            model: User,
          })
          .populate({ path: 'product', model: Product });
        return res.status(201).json(populatedCart);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    case 'PUT': {
      const session = await mongoose.startSession();
      try {
        const cartItemsToUpdate = await Cart.find({
          user: body.userId,
          status: 1,
        }).populate({ path: 'product', model: Product });

        session.startTransaction();

        for (const item of cartItemsToUpdate) {
          item.status = body.newStatus;
          await item.save({ session });

          // Resta la cantidad comprada del inventario del producto
          const product = await Product.findById(item.product._id, null, {
            session,
          });
          product.weight -= item.quantity;
          if (product.weight === 0) {
            product.status = 0;
          }
          await product.save({ session });
        }

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ message: 'Cart updated successfully' });
      } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ error: error.message });
      }
    }

    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
}

export default handler;
