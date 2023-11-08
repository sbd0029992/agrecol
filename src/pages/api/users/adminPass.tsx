/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcryptjs';
import User from 'models/User';
import { dbConnect } from 'utils/mongosee';

dbConnect();

async function handler(req: any, res: any) {
  const { method, body } = req;

  switch (method) {
    case 'PUT': {
      const { id, newPassword } = body;

      if (!id || !newPassword) {
        return res
          .status(400)
          .json({ error: 'Todos los campos deben ser llenados' });
      }

      try {
        const user = await User.findById(id);

        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        await User.findOneAndUpdate(
          { _id: id },
          { password: hashedPassword },
          { new: true, useFindAndModify: false }
        );

        return res
          .status(200)
          .json({ message: 'Contraseña exitosamente cambiada' });
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    }
    default:
      return res.status(400).json({ error: 'This method is not supported' });
  }
}

export default handler;
