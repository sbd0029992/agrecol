/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcryptjs';
import authMiddleware from 'middlewares/authMiddleware';
import User from 'models/User';
import { dbConnect } from 'utils/mongosee';

dbConnect();

async function handler(req: any, res: any) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const allUsers = await User.find({});
        return res.status(200).json(allUsers);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    case 'POST':
      try {
        if (!body.password) {
          return res.status(400).json({ error: 'Password is required' });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);
        body.password = hashedPassword;
        console.log(
          '🚀 ~ file: index.tsx:27 ~ handler ~ hashedPassword:',
          hashedPassword
        );

        const newUser = new User(body);
        console.log('🚀 ~ file: index.tsx:31 ~ handler ~ newUser:', newUser);
        const savedUser = await newUser.save();
        console.log(
          '🚀 ~ file: index.tsx:33 ~ handler ~ savedUser:',
          savedUser
        );
        return res.status(201).json(savedUser);
      } catch (error: any) {
        console.error('Error stack:', error.stack);
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
}

export default authMiddleware(handler);
