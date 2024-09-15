/* eslint-disable @typescript-eslint/no-explicit-any */
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import authMiddleware from 'middlewares/authMiddleware';
import Cart from 'models/Cart';
import { dbConnect } from 'utils/mongosee';

dbConnect();

const handleRequest = async (req: any, res: any) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const now = new Date();
        const weekStart = startOfWeek(now);
        const weekEnd = endOfWeek(now);
        const monthStart = startOfMonth(now);
        const monthEnd = endOfMonth(now);

        // Get weekly sales
        const weeklySales = await Cart.find({
          createdAt: { $gte: weekStart, $lte: weekEnd },
        })
          .populate('product')
          .populate('user');

        // Get monthly sales
        const monthlySales = await Cart.find({
          createdAt: { $gte: monthStart, $lte: monthEnd },
        })
          .populate('product')
          .populate('user');

        // Calculate top products
        const topProducts = await Cart.aggregate([
          { $group: { _id: '$product', totalQuantity: { $sum: '$quantity' } } },
          { $sort: { totalQuantity: -1 } },
          { $limit: 5 },
          {
            $lookup: {
              from: 'products',
              localField: '_id',
              foreignField: '_id',
              as: 'productDetails',
            },
          },
          { $unwind: '$productDetails' },
          {
            $project: {
              product: '$productDetails.name',
              quantity: '$totalQuantity',
              purchasePrice: '$productDetails.purchasePrice',
              sellingPrice: '$productDetails.price',
            },
          },
        ]);

        // Calculate cashier sales
        const cashierSales = await Cart.aggregate([
          {
            $group: {
              _id: '$user',
              totalSales: {
                $sum: { $multiply: ['$quantity', '$product.price'] },
              },
            },
          },
          { $sort: { totalSales: -1 } },
          {
            $lookup: {
              from: 'users',
              localField: '_id',
              foreignField: '_id',
              as: 'userDetails',
            },
          },
          { $unwind: '$userDetails' },
          { $project: { cashier: '$userDetails.name', sales: '$totalSales' } },
        ]);

        // Calculate total profit
        const totalProfit = await Cart.aggregate([
          {
            $lookup: {
              from: 'products',
              localField: 'product',
              foreignField: '_id',
              as: 'productDetails',
            },
          },
          { $unwind: '$productDetails' },
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: { $multiply: ['$quantity', '$productDetails.price'] },
              },
              totalCost: {
                $sum: {
                  $multiply: ['$quantity', '$productDetails.purchasePrice'],
                },
              },
            },
          },
          {
            $project: {
              totalProfit: { $subtract: ['$totalRevenue', '$totalCost'] },
              totalRevenue: 1,
              totalCost: 1,
            },
          },
        ]);

        return res.status(200).json({
          weeklySales,
          monthlySales,
          topProducts,
          cashierSales,
          totalProfit: totalProfit[0],
        });
      } catch (error: any) {
        console.error('GET error', error.message);
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
};

export default authMiddleware(handleRequest);
