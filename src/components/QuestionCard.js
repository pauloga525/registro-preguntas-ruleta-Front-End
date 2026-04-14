import React from 'react';
import { motion } from 'framer-motion';
import { Image, Eye, Edit, Trash, CheckCircle } from 'lucide-react';

const QuestionCard = ({
  question,
  index,
  onPreview = () => {},
  onEdit = () => {},
  onDelete = () => {}
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-blue-100 transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
            {question.question}
          </h3>
          {question.docenteNombre && (
            <p className="text-sm text-gray-500 mb-2">Docente: {question.docenteNombre}</p>
          )}
          <div className="flex items-center gap-3">
            {question.hasImage && (
              <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-lg text-green-600 text-xs font-medium">
                <Image className="w-3 h-3" />
                <span>Con imagen</span>
              </div>
            )}
            <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-lg text-blue-600 text-xs font-medium">
              <CheckCircle className="w-3 h-3" />
              <span>Respuesta: {String.fromCharCode(65 + question.correctAnswer)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <motion.button
          onClick={() => onPreview(question)}
          className="flex-1 py-2 px-4 bg-blue-100 text-blue-600 rounded-xl font-medium hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Eye className="w-4 h-4" />
          Vista Previa
        </motion.button>
        
        <motion.button
          onClick={() => onEdit(question)}
          className="flex-1 py-2 px-4 bg-amber-100 text-amber-600 rounded-xl font-medium hover:bg-amber-200 transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Edit className="w-4 h-4" />
          Editar
        </motion.button>
        
        <motion.button
          onClick={() => onDelete(question.id)}
          className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Trash className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuestionCard;