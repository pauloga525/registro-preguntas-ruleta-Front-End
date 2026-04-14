import React from 'react';
import { motion } from 'framer-motion';
import { User, ArrowRight } from 'lucide-react';

const SubjectCard = ({ subject, onSelect, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-blue-100 transition-all group cursor-pointer"
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(subject)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-3">{subject.name}</h3>
          <div className="flex items-center gap-2 text-blue-600">
            <User className="w-4 h-4" />
            <span className="font-medium text-sm">{subject.coordinator}</span>
          </div>
        </div>
        
        <motion.div
          className="ml-4 p-3 bg-blue-100 rounded-xl text-blue-600 group-hover:bg-blue-200 transition-colors"
          whileHover={{ scale: 1.1, x: 5 }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <motion.button
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Seleccionar Materia
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SubjectCard;