import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, ArrowRight } from 'lucide-react';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error al iniciar sesión");
      }

      const data = await response.json();
      const token = data.token;
      // Guardar token y usuario en localStorage para que las requests puedan usarlo
      if (token) localStorage.setItem('token', token);
      // Guardar el objeto de usuario completo si viene en la respuesta o toda la respuesta
      // Mantener compatibilidad si solo viene nombre, se guarda como string
      if (data) {
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        const userToStore = data.usuario || data.user || data;
        localStorage.setItem('user', JSON.stringify(userToStore));
      }

      onLogin(token);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div 
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <User className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-2">
            EduQuiz Pro
          </h1>
          <p className="text-blue-600 font-medium">Plataforma para docentes</p>
        </motion.div>

        {/* --- Formulario --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-blue-100/50"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-blue-50/50 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                  placeholder="tu.email@colegio.edu.ec"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 bg-blue-50/50 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 ${
                isLoading 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
              }`}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Ingresar</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          
        </motion.div>

        {/* --- Items inferiores --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="flex items-center justify-center gap-8 text-blue-600">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                📚
              </div>
              <p className="text-sm font-medium">Gestión Fácil</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                ⭐
              </div>
              <p className="text-sm font-medium">Intuitivo</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                🚀
              </div>
              <p className="text-sm font-medium">Moderno</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;
