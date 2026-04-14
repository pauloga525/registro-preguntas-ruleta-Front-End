import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Image, Check, Circle } from 'lucide-react';

const QuestionForm = ({ onSave, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    question: initialData?.question || '',
    options: initialData?.options || ['', '', '', ''],
    correctAnswer: initialData?.correctAnswer || 0,
    hasImage: initialData?.hasImage || false
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageBase64, setImageBase64] = useState(initialData?.imageBase64 || null);

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImageBase64(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.question.trim() || formData.options.some(opt => !opt.trim())) {
      alert('Todos los campos son obligatorios');
      return;
    }

    onSave({
      question: formData.question,
      options: formData.options,
      correctAnswer: formData.correctAnswer,
      imageBase64,
      hasImage: !!imageBase64
    });
  };

  const optionLabels = ['A', 'B', 'C', 'D'];
  const optionColors = ['blue', 'green', 'amber', 'red'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-blue-100"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {initialData ? 'Editar Pregunta' : 'Nueva Pregunta'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Enunciado */}
        <div>
          <label className="block text-lg font-bold text-gray-700 mb-2">
            Enunciado de la Pregunta
          </label>
          <textarea
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            className="w-full px-6 py-4 bg-blue-50/50 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-none"
            rows={4}
            placeholder="Escribe aquí tu pregunta..."
            required
          />
        </div>

        {/* Imagen */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <label className="text-lg font-bold text-gray-700">Imagen (Opcional)</label>
            <motion.button
              type="button"
              onClick={() => setFormData({ ...formData, hasImage: !formData.hasImage })}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                formData.hasImage 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image className="w-4 h-4" />
              {formData.hasImage ? 'Imagen incluida' : 'Agregar imagen'}
            </motion.button>
          </div>

          {formData.hasImage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-6 bg-green-50 border border-green-200 rounded-2xl flex flex-col items-center"
            >
              {!imageBase64 ? (
                <label className="flex flex-col items-center cursor-pointer text-green-700 font-medium">
                  📷 Subir imagen
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <img src={imageBase64} alt="Preview" className="max-h-40 rounded-xl" />
                  <button
                    type="button"
                    className="text-sm text-red-600 hover:underline"
                    onClick={() => {
                      setImageFile(null);
                      setImageBase64(null);
                    }}
                  >
                    Eliminar imagen
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Opciones */}
        <div>
          <label className="block text-lg font-bold text-gray-700 mb-4">Opciones de Respuesta</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 bg-${optionColors[index]}-500 text-white rounded-xl flex items-center justify-center font-bold`}>
                    {optionLabels[index]}
                  </div>
                  <label className="font-semibold text-gray-700">Opción {optionLabels[index]}</label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                      formData.correctAnswer === index
                        ? 'border-green-300 bg-green-50 focus:border-green-500'
                        : 'border-gray-200 bg-gray-50 focus:border-blue-500'
                    }`}
                    placeholder={`Escribe la opción ${optionLabels[index]}...`}
                    required
                  />
                  <motion.button
                    type="button"
                    onClick={() => setFormData({ ...formData, correctAnswer: index })}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-all ${
                      formData.correctAnswer === index
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {formData.correctAnswer === index ? <Check className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  </motion.button>
                </div>

                {formData.correctAnswer === index && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-green-600 font-medium mt-1 ml-11"
                  >
                    ✓ Respuesta correcta
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <motion.button
            type="submit"
            className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Save className="w-5 h-5" />
            {initialData ? 'Actualizar Pregunta' : 'Guardar Pregunta'}
          </motion.button>

          {onCancel && (
            <motion.button
              type="button"
              onClick={onCancel}
              className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-2xl hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancelar
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default QuestionForm;
