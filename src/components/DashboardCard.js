import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const DashboardCard = ({
  title,
  description,
  icon,
  color = 'blue',
  onClick,
  isNew = false
}) => {

  const colorClasses = {
    blue: "from-blue-500 to-indigo-600 bg-blue-50 border-blue-200 text-blue-600",
    amber: "from-amber-500 to-orange-600 bg-amber-50 border-amber-200 text-amber-600",
    green: "from-green-500 to-emerald-600 bg-green-50 border-green-200 text-green-600",
    purple: "from-purple-500 to-violet-600 bg-purple-50 border-purple-200 text-purple-600",
    pink: "from-pink-500 to-rose-600 bg-pink-50 border-pink-200 text-pink-600"
  };

  // ✅ FALLBACK REAL
  const safeColor = colorClasses[color] || colorClasses.blue;

  const gradientClasses = safeColor.split(' ').slice(0, 2).join(' ');
  const baseClasses = safeColor.split(' ').slice(2).join(' ');

  return (
    <motion.div
      className={`bg-white/80 backdrop-blur-sm border-2 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden ${baseClasses}`}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isNew && (
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
            NUEVO
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <motion.div
          className={`p-4 rounded-2xl bg-gradient-to-br ${gradientClasses}`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {typeof icon === 'string' ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            icon && <icon className="w-8 h-8 text-white" />
          )}
        </motion.div>

        <motion.div
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ x: 5 }}
        >
          <ArrowRight className="w-6 h-6" />
        </motion.div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 font-medium leading-relaxed">
          {description}
        </p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  );
};

export default DashboardCard;
