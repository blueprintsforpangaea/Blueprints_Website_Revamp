import Layout from './components/layout/Layout.jsx';
import ScrollToTop from './components/layout/ScrollToTop.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <AppRoutes />
      </Layout>
    </>
  );
}
