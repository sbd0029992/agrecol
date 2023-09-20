import { AuthProvider } from 'context/authContext';
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

import Layout from '../components/Layout';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;
