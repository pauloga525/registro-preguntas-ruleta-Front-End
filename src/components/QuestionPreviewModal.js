import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const QuestionPreviewModal = ({ question, isOpen, onClose }) => {
  if (!isOpen || !question) return null;

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-8 max-w-4xl w-full sm:h-auto max-h-[90vh] shadow-2xl border border-blue-400/20 overflow-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Vista Previa</h2>
                <p className="text-blue-300 text-sm sm:text-base">Pregunta de Opción Múltiple</p>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors self-start sm:self-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          {/* PREGUNTA */}
          <div className="text-center mb-6 sm:mb-8 px-2 sm:px-0">
            <motion.h3
              className="text-xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight break-words"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {question.question}
            </motion.h3>

            {question.hasImage && (
              <motion.div
                className="mb-4 sm:mb-6 bg-white/10 rounded-2xl p-2 sm:p-4 border border-white/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-full rounded-xl flex items-center justify-center overflow-hidden">
                  <img
                    src={question.imageBase64}
                    alt="Pregunta"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* OPCIONES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {question.options.map((option, index) => (
              <motion.div
                key={index}
                className={`p-4 sm:p-6 rounded-2xl border-2 transition-all cursor-pointer break-words ${index === question.correctAnswer
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400 text-white shadow-lg'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-sm sm:text-lg ${index === question.correctAnswer ? 'bg-white/20' : 'bg-blue-500'
                      }`}
                  >
                    {['A', 'B', 'C', 'D'][index]}
                  </div>
                  <span className="font-semibold text-sm sm:text-lg">{option}</span>
                </div>

                {index === question.correctAnswer && (
                  <motion.div
                    className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="text-xs sm:text-sm text-green-100 font-medium">✓ Respuesta Correcta</span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CERRAR */}
          <div className="mt-4 sm:mt-8 text-center">
            <motion.button
              onClick={onClose}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cerrar Vista Previa
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

    </AnimatePresence>
  );
};

export default QuestionPreviewModal;