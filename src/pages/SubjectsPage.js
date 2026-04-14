import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import DashboardCard from '../components/DashboardCard';

const SubjectsPage = ({ tipo, anio, niveles = [], onNavigate, onBack }) => {
  const tipoNormalizado = tipo?.toString().trim().toUpperCase();

  // ============================
  // 🧠 OBTENER MATERIAS
  // ============================
  const materiasMap = new Map();

  niveles.forEach(nivel => {
    nivel.cursos?.forEach(curso => {

      // 🎓 BACHILLERATO → filtrar por año (acronimo)
      if (tipoNormalizado === 'BACHILLERATO') {
        if (curso.acronimo === anio) {
          curso.materias?.forEach(materia => {
            materiasMap.set(materia.id, materia);
          });
        }
      }

      // 📘 BÁSICA / PRIMARIA
      else {
        curso.materias?.forEach(materia => {
          if (materia.tipo?.toString().trim().toUpperCase() === tipoNormalizado) {
            materiasMap.set(materia.id, materia);
          }
        });
      }

    });
  });

  const materias = Array.from(materiasMap.values());

  // ============================
  // 🚫 SIN MATERIAS
  // ============================
  if (materias.length === 0) {
    return (
      <Layout title="Materias" showBackButton onBack={onBack}>
        <div className="text-center p-10 text-gray-600">
          No hay materias disponibles
        </div>
      </Layout>
    );
  }

  // ============================
  // ✅ RENDER
  // ============================
  return (
    <Layout title="Materias" showBackButton onBack={onBack}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {materias.map((materia, index) => (
            <motion.div
              key={materia.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <DashboardCard
                title={materia.nombre}
                description="Crear preguntas"
                icon="📚"
                color={index % 2 === 0 ? 'blue' : 'green'}
                onClick={() =>
                  onNavigate('questions', {
                    subject: materia,
                    tipo,
                    anio
                  })
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SubjectsPage;
