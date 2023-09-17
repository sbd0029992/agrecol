/* eslint-disable @typescript-eslint/no-explicit-any */
import withSession from 'lib/session';

export default withSession(async (req: any, res: any) => {
  req.session.destroy();
  res.redirect('/login');
});
