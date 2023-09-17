import User from 'models/User';
import { dbConnect } from 'utils/mongosee';

dbConnect();

export function databaseServiceFactory() {
  const getUser = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  };
  console.log('getUser', getUser);
  return { getUser };
}
