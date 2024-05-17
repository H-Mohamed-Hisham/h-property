import { ToastContainer } from "react-toastify";

// Context
import { GlobalProvider } from "@/context/GlobalContext";

// Component
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// CSS
import "react-toastify/dist/ReactToastify.css";
import "@/assets/styles/globals.css";

export const metadata = {
  title: "H Property | Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
