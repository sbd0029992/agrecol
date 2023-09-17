/* eslint-disable @typescript-eslint/no-explicit-any */
import withSession from 'lib/session';

export default withSession(async (req: any, res: any) => {
  const user = req.session.get('user');

  if (user) {
    res.json({
      isLoggedIn: true,
      ...user,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
});
