import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DetailPage from "./components/Detail/DetailPage";
import Footer from "./components/Footer/Footer";
import MainPage from "./components/MainPage";
import OfflineNotification from "./components/OnlineOffline";
import About from "./pages/About";
import Blog from "./pages/Blog";

export default function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 7000); // auto-hide after 5 seconds
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowNotification(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const closeNotification = () => setShowNotification(false);

  return (
    <div>
      <ToastContainer />
      {/* Show notification based on online status */}
      {showNotification && (
        <OfflineNotification
          isOnline={isOnline}
          closeNotification={closeNotification}
        />
      )}
      {/* Main content is only shown when online */}
      {isOnline && (
        <>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/recipe/:id" element={<DetailPage />} />
          </Routes>
          <footer>
            <Footer />
          </footer>
        </>
      )}
    </div>
  );
}
