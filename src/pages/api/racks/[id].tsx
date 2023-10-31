/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
import authMiddleware from 'middlewares/authMiddleware';
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
        const rack = await Rack.findById(id);
        if (!rack) {
          return res.status(404).end(`Rack not found`);
        }
        return res.status(200).json({ rack });
      } catch (error: any) {
        return res.status(500).json({ msg: error.message });
      }
    case 'PUT':
      try {
        const updateRack = await Rack.findByIdAndUpdate(id, body, {
          new: true,
        });
        if (!updateRack) return res.status(404).end(`Rack not found`);
        return res.status(200).json({ updateRack });
      } catch (error: any) {
        return res.status(400).json({ msg: error.message });
      }
    case 'DELETE':
      try {
        const deleteRack = await Rack.findByIdAndDelete(id);
        if (!deleteRack) return res.status(404).end(`Rack not found`);
        return res.status(204).json({ deleteRack });
      } catch (error: any) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default authMiddleware(handler);
