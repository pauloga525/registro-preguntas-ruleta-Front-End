import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, ArrowLeft, Settings, Bell } from 'lucide-react';
import { logout as apiLogout } from '../utils/api';

const Layout = ({ children, title = "EduQuiz Pro", showBackButton = false, onBack }) => {
  const user = localStorage.getItem("user");
  const handleLogout = async () => {
    try {
      await apiLogout(); // Llamada al backend
    } catch (err) {
      console.error("Error cerrando sesión en backend:", err);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      if (typeof onLogout === 'function') onLogout(); // ✅ seguro
      window.location.reload(true);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <motion.header
        className="bg-white/80 backdrop-blur-xl border-b border-blue-100/50 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {showBackButton && (
                <motion.button
                  onClick={onBack}
                  className="p-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.button>
              )}
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  EduQuiz Pro
                </h1>
                <p className="text-blue-600 text-sm font-medium"></p>
              </div>
            </div>

            <div className="flex items-center gap-3">


              <motion.button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-xl text-blue-700 hover:bg-blue-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">{user.nombre}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;