import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import ProductDetail from "./pages/ProductDetail";
import Workshops from "./pages/Workshops";
import WorkshopDetail from "./pages/WorkshopDetail";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Contact from "./pages/Contact";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCategories from "./pages/admin/ManageCategories";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageWorkshops from "./pages/admin/ManageWorkshops";
import ManageServices from "./pages/admin/ManageServices";

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh]">{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* Public / user panel */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/categories" element={<PublicLayout><Categories /></PublicLayout>} />
      <Route path="/product/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
      <Route path="/workshops" element={<PublicLayout><Workshops /></PublicLayout>} />
      <Route path="/workshops/:id" element={<PublicLayout><WorkshopDetail /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
      <Route path="/services/:id" element={<PublicLayout><ServiceDetail /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

      {/* Admin panel */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="categories" replace />} />
        <Route path="categories" element={<ManageCategories />} />
        <Route path="products" element={<ManageProducts />} />
        <Route path="workshops" element={<ManageWorkshops />} />
        <Route path="services" element={<ManageServices />} />
      </Route>

      <Route path="*" element={<PublicLayout><div className="container-px py-24 text-center text-ink/50">Page not found</div></PublicLayout>} />
    </Routes>
    </>
  );
}
