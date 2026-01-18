import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from './app/store';
import { syncAuthFromStorage } from './features/auth/authSlice';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CompanyPage from './pages/CompanyPage';
import ClientsPage from './pages/ClientsPage';
import InvoiceNewPage from './pages/InvoiceNewPage';
import InvoiceDetailPage from './pages/InvoiceDetailPage';
import InvoicePublicPage from './pages/InvoicePublicPage';
import InvoiceBuilderPage from './pages/InvoiceBuilderPage';
import AboutUsPage from './pages/AboutUsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import BlogListPage from './pages/BlogListPage';
import BlogCountryRequirementsPage from './pages/BlogCountryRequirementsPage';
import BlogSimpleInvoicesPage from './pages/BlogSimpleInvoicesPage';
import NotFoundPage from './pages/NotFoundPage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Sync auth state from localStorage on mount
    dispatch(syncAuthFromStorage());

    // Listen for storage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken' || e.key === 'user') {
        dispatch(syncAuthFromStorage());
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<InvoicePublicPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />
      <Route path="/blog" element={<BlogListPage />} />
      <Route path="/blog/country-specific-invoice-requirements" element={<BlogCountryRequirementsPage />} />
      <Route path="/blog/simple-invoices-for-small-businesses" element={<BlogSimpleInvoicesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/invoice-builder" element={<InvoiceBuilderPage />} />
      <Route path="/create" element={<InvoiceBuilderPage />} />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/company" element={<CompanyPage />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/invoices/new" element={<InvoiceNewPage />} />
                <Route path="/invoices/:id" element={<InvoiceDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
