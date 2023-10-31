/* eslint-disable @typescript-eslint/no-explicit-any */
import authMiddleware from 'middlewares/authMiddleware';
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

        const allRacks = await Rack.find(query);
        return res.status(200).json(allRacks);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    case 'POST':
      try {
        const newRack = new Rack(body);
        const savedRack = await newRack.save();
        return res.status(201).json(savedRack);
      } catch (error: any) {
        console.error('Error stack:', error.stack);
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
}

export default authMiddleware(handler);
