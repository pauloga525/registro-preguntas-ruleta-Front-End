
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import QuestionCard from '../components/QuestionCard';
import QuestionPreviewModal from '../components/QuestionPreviewModal';
import QuestionForm from '../components/QuestionForm';
import { getPreguntas, createPregunta, deletePregunta, updatePregunta } from '../utils/api';
import { Plus, BookOpen } from 'lucide-react';

const QuestionsPage = ({ subject, tipo, anio, onBack }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // 🔑 NIVEL FINAL (ej: 1BACHILLERATO)
  const level = `${anio}${tipo}`;

  // =========================
  // 📥 CARGAR PREGUNTAS
  // =========================
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const res = await getPreguntas();
        const list = Array.isArray(res) ? res : [];

        const filtered = list
          .map(q => ({
            ...q,
            id: q.id || q._id
          }))
          .filter(
            q => q.subject === subject?.id && q.level === level
          );

        setQuestions(filtered);
      } catch (err) {
        console.error('❌ Error al cargar preguntas', err);
      }
    };

    if (subject?.id && level) {
      loadQuestions();
    }
  }, [subject, level]);

  // =========================
  // ➕ CREAR PREGUNTA
  // =========================
  const handleAddQuestion = async (data) => {
    try {
      if (!subject?.id || !level) return alert('❌ Falta materia o nivel');

      const rawUser = localStorage.getItem('user');
      let parsedUser = rawUser ? JSON.parse(rawUser) : null;
      const docenteId = String(parsedUser?.id);
      console.log('====================================');
      console.log(docenteId);
      console.log('====================================');
      const docenteNombre = parsedUser?.nombre || parsedUser?.name || parsedUser?.username || null;

      const payload = {
        pregunta: data.question,
        respuesta1: data.options[0],
        respuesta2: data.options[1],
        respuesta3: data.options[2],
        respuesta4: data.options[3],
        respuestaCorrecta: Number(data.correctAnswer),
        subject: subject.id,
        level,
        imageBase64: data.imageBase64 || null,
        hasImage: !!data.imageBase64,
        docenteId,
        docenteNombre,
        createdBy: docenteId
      };

      console.log("Payload enviado:", payload);

      const created = await createPregunta(payload);

      setQuestions(prev => [{ ...created, id: created.id || created._id }, ...prev]);
      setShowForm(false);
      alert('✅ Pregunta creada correctamente');
    } catch (err) {
      console.error('❌ Error al crear pregunta', err);
      alert('❌ Error al crear la pregunta');
    }
  };


  // =========================
  // 🗑️ ELIMINAR
  // =========================
  const handleDeleteQuestion = async (id) => {
    if (!window.confirm('¿Eliminar esta pregunta?')) return;

    try {
      await deletePregunta(id);
      setQuestions(prev => prev.filter(q => q.id !== id));
    } catch (err) {
      console.error(err);
      alert('❌ Error al eliminar la pregunta');
    }
  };

  // =========================
  // 👁️ PREVIEW
  // =========================
  const handlePreview = (question) => {
    setSelectedQuestion(question);
    setShowPreview(true);
  };

  // =========================
// ✏️ EDITAR (PREPARAR FORM)
// =========================
  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setShowForm(true);
  };

  const handleUpdateQuestion = async (data) => {
    if (!editingQuestion) return;
    try {
      const payload = {
        pregunta: data.question,
        respuesta1: data.options[0],
        respuesta2: data.options[1],
        respuesta3: data.options[2],
        respuesta4: data.options[3],
        respuestaCorrecta: Number(data.correctAnswer),
        subject: editingQuestion.subject, // no cambia
        level: editingQuestion.level      // no cambia
      };

      const updated = await updatePregunta(editingQuestion.id, payload);

      setQuestions(prev =>
        prev.map(q => (q.id === editingQuestion.id ? updated : q))
      );

      setEditingQuestion(null);
      setShowForm(false);
      alert('✅ Pregunta actualizada correctamente');

    } catch (err) {
      console.error(err);
      alert('❌ Error al actualizar la pregunta', err);
    }
  };


  // =========================
  // 📝 FORMULARIO
  // =========================
  if (showForm) {
    return (
      <Layout
        title={editingQuestion ? 'Editar Pregunta' : 'Nueva Pregunta'}
        showBackButton
        onBack={() => {
          setShowForm(false);
          setEditingQuestion(null);
        }}
      >
        <QuestionForm
          onSave={editingQuestion ? handleUpdateQuestion : handleAddQuestion}
          initialData={editingQuestion}
          onCancel={() => {
            setShowForm(false);
            setEditingQuestion(null);
          }}
        />
      </Layout>
    );
  }

  // =========================
  // 📄 LISTADO
  // =========================
  return (
    <Layout
      title={`Preguntas - ${subject?.nombre}`}
      showBackButton
      onBack={onBack}
    >
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
              <BookOpen className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {subject?.nombre}
              </h1>
              <p className="text-blue-600">
                {questions.length} preguntas
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700"
          >
            <Plus size={18} />
            Agregar Pregunta
          </button>
        </div>

        {questions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questions.map((q, i) => (
              <QuestionCard
                key={q.id}          // ✅ key única
                question={q}
                index={i}
                onPreview={handlePreview}
                onEdit={() => handleEditQuestion(q)}
                onDelete={() => handleDeleteQuestion(q.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-600">
            No hay preguntas para este nivel aún
          </div>
        )}
      </div>

      <QuestionPreviewModal
        question={selectedQuestion}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </Layout>
  );
};

export default QuestionsPage;
