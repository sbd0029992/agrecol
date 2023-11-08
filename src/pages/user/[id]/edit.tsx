import { useServerSideLogin } from 'hooks/permission/useServerSideLogin';
import withSession from 'lib/session';

import New from '../new';

export const getServerSideProps = withSession(useServerSideLogin);
export default New;
