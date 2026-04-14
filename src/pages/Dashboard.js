import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import DashboardCard from '../components/DashboardCard';
import AdminForm from '../components/AdminForm';
import { getNiveles } from '../utils/api';

const Dashboard = ({ onNavigate }) => {
  const [showAreaForm, setShowAreaForm] = useState(false);
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [niveles, setNiveles] = useState([]);
  const [tiposDisponibles, setTiposDisponibles] = useState([]);

  let user = localStorage.getItem('user');
  try {
    user = user ? JSON.parse(user) : null;
  } catch {}
  // user may be a string (legacy) or an object with `nombre`/`name`/`username` properties
  const userName = typeof user === 'string' ? user : (user?.nombre || user?.name || user?.username || 'Profesor/a');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getNiveles();
        const nivelesList = res?.niveles || [];
        setNiveles(nivelesList);

        const tipos = new Set();

        nivelesList.forEach(nivel => {
          nivel.cursos?.forEach(curso => {
            curso.materias?.forEach(materia => {
              const tipoMateria = materia.tipo?.toString().trim().toUpperCase();
              if (tipoMateria) {
                tipos.add(tipoMateria);
              }
            });
          });
        });

        setTiposDisponibles([...tipos]);
      } catch (err) {
        console.error('Error cargando niveles', err);
      }
    };

    load();
  }, []);

  const handleAreaSave = (data) => {
    setShowAreaForm(false);
  };

  const handleSubjectSave = (data) => {
    setShowSubjectForm(false);
  };

  const cardsConfig = {
    'PRIMARIA': {
      title: 'Primaria',
      description: 'Nivel primario',
      icon: '🏫',
      color: 'sky'
    },
    'BASICA ELEMENTAL': {
      title: 'Básica Elemental',
      description: 'Subnivel inicial',
      icon: '📘',
      color: 'blue'
    },
    'BASICA MEDIA': {
      title: 'Básica Media',
      description: 'Subnivel medio',
      icon: '📗',
      color: 'green'
    },
    'BASICA SUPERIOR': {
      title: 'Básica Superior',
      description: '8vo, 9no y 10mo',
      icon: '📙',
      color: 'amber'
    },
    'BACHILLERATO': {
      title: 'Bachillerato',
      description: '1ro, 2do y 3ro',
      icon: '🎓',
      color: 'purple'
    }
  };

  return (
    <Layout title="Panel Principal">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-4">
            ¡Bienvenido/a, {userName}!
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Accede a los niveles asignados a tu perfil
          </p>
        </motion.div>

        {/* CARDS */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {tiposDisponibles.map(tipo => {
            const cfg = cardsConfig[tipo];
            if (!cfg) return null;

            return (
              <DashboardCard
                key={tipo}
                title={cfg.title}
                description={cfg.description}
                icon={cfg.icon}
                color={cfg.color}
                onClick={() =>
                  onNavigate('levels', {
                    tipo,
                    niveles
                  })
                }
              />
            );
          })}

         {/* ✅ ICONOS COMO STRING */}
           {/*<DashboardCard
            title="Áreas Educativas"
            description="Gestiona áreas académicas"
            icon="📚"
            color="green"
            onClick={() => setShowAreaForm(true)}
            isNew
          />*/}

          {/*<DashboardCard
            title="Materias"
            description="Gestión general de materias"
            icon="🧠"
            color="amber"
            onClick={() => setShowSubjectForm(true)}
          />*/}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-4">🚀 Sistema inteligente</h3>
          <p className="text-blue-100 font-medium text-lg">
            Solo ves los niveles que realmente impartes
          </p>
        </motion.div>
      </div>

      {showAreaForm && (
        <AdminForm
          type="area"
          onSave={handleAreaSave}
          onCancel={() => setShowAreaForm(false)}
        />
      )}

      {showSubjectForm && (
        <AdminForm
          type="subject"
          onSave={handleSubjectSave}
          onCancel={() => setShowSubjectForm(false)}
        />
      )}
    </Layout>
  );
};

export default Dashboard;
