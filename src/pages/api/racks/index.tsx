/* eslint-disable @typescript-eslint/no-explicit-any */
import Rack from 'models/Rack';
import { dbConnect } from 'utils/mongosee';

dbConnect();

async function handler(req: any, res: any) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const allRacks = await Rack.find({});
        return res.status(200).json(allRacks);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    case 'POST':
      try {
        if (!body.name || !body.description) {
          return res.status(400).json({ error: 'Password is required' });
        }
        const newRack = new Rack(body);
        const savedUser = await newRack.save();
        return res.status(201).json(savedUser);
      } catch (error: any) {
        console.error('Error stack:', error.stack);
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
}

export default handler;
