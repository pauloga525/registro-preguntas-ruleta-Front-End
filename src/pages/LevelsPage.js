import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import DashboardCard from '../components/DashboardCard';

const LevelsPage = ({ tipo, niveles = [], onNavigate, onBack }) => {
  const tipoNormalizado = tipo?.toString().trim().toUpperCase();

  // 🔒 Validación básica
  if (!tipoNormalizado) {
    return <div className="p-6 text-center">Nivel no encontrado</div>;
  }

  // ============================
  // 🧠 CONFIGURACIÓN VISUAL
  // ============================
  const tipoConfig = {
    'PRIMARIA': { nombre: 'Primaria', icono: '🏫' },
    'BASICA ELEMENTAL': { nombre: 'Básica Elemental', icono: '📘' },
    'BASICA MEDIA': { nombre: 'Básica Media', icono: '📗' },
    'BASICA SUPERIOR': { nombre: 'Básica Superior', icono: '📙' },
    'BACHILLERATO': { nombre: 'Bachillerato', icono: '🎓' }
  };

  const currentSection = tipoConfig[tipoNormalizado] || {
    nombre: tipo,
    icono: '📚'
  };

  // ============================
  // 🎓 BACHILLERATO → SOLO AÑOS
  // ============================
  if (tipoNormalizado === 'BACHILLERATO') {
    const anios = [
      { label: 'Primero de Bachillerato', value: '1ro' },
      { label: 'Segundo de Bachillerato', value: '2do' },
      { label: 'Tercero de Bachillerato', value: '3ro' }
    ];

    return (
      <Layout title={currentSection.nombre} showBackButton onBack={onBack}>
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl">
              {currentSection.icono}
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent mb-4">
              {currentSection.nombre}
            </h1>

            <p className="text-xl text-gray-600 font-medium">
              Selecciona el año académico
            </p>
          </motion.div>

          {/* AÑOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {anios.map((anio, index) => (
              <motion.div
                key={anio.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <DashboardCard
                  title={anio.label}
                  description="Aplica a todas las especialidades"
                  icon="📘"
                  color={index % 2 === 0 ? 'purple' : 'indigo'}
                  onClick={() =>
                    onNavigate('subjects', {
                      tipo,
                      anio: anio.value,
                      niveles
                    })
                  }
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  // ============================
  // 📘 BÁSICA (COMPORTAMIENTO ACTUAL)
  // ============================
  const cursosFiltrados = (niveles || []).flatMap(nivel =>
    (nivel.cursos || [])
      .filter(curso => curso.materias?.some(m => m.tipo?.toString().trim().toUpperCase() === tipoNormalizado))
      .map(curso => ({ ...curso, nivelNombre: nivel.nombre }))
  );
  if (cursosFiltrados.length === 0) {
    return <div className="p-6 text-center">No hay cursos disponibles</div>;
  }
  console.log('====================================');
  console.log(cursosFiltrados);
  console.log('====================================');

  return (
    <Layout title={currentSection.nombre} showBackButton onBack={onBack}>
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl">
            {currentSection.icono}
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-4">
            {currentSection.nombre}
          </h1>

          <p className="text-xl text-gray-600 font-medium">
            Selecciona un curso
          </p>
        </motion.div>

        {/* CURSOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cursosFiltrados.map((curso, index) => (
            <motion.div
              key={curso.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <DashboardCard
                title={curso.nombre}
                description={`Nivel: Básica Superior`}
                icon="📖"
                color={index % 2 === 0 ? 'blue' : 'green'}
                onClick={() =>
                  onNavigate('subjects', {
                    tipo,
                    anio: curso.acronimo,
                    niveles
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

export default LevelsPage;
