import Layout from './components/layout/Layout.jsx';
import ScrollToTop from './components/layout/ScrollToTop.jsx';
import DocumentMeta from './components/layout/DocumentMeta.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  return (
    <>
      <DocumentMeta />
      <ScrollToTop />
      <Layout>
        <AppRoutes />
      </Layout>
    </>
  );
}
