import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import LevelsPage from './pages/LevelsPage';
import SubjectsPage from './pages/SubjectsPage';
import QuestionsPage from './pages/QuestionsPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [pageParams, setPageParams] = useState({
    niveles: [],
  });

  const handleLogin = (token) => {
    setIsLoggedIn(true);
  };

const handleNavigate = (page, params = {}) => {
  setCurrentPage(page);
  setPageParams(prev => ({ ...prev, ...params })); 
};

  const handleBack = () => {
    if (currentPage === 'questions') {
      setCurrentPage('subjects');
    } else if (currentPage === 'subjects') {
      setCurrentPage('levels');   
    } else {
      setCurrentPage('dashboard');
    }
  };
  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'levels':
        return (
          <LevelsPage
            tipo={pageParams.tipo}
            niveles={pageParams.niveles}
            onNavigate={handleNavigate}
            onBack={handleBack}
          />
        );
      case 'subjects':
        return (
          <SubjectsPage
            /*curso={pageParams.curso}*/
            niveles={pageParams.niveles}
            tipo={pageParams.tipo}
            anio={pageParams.anio}
            onNavigate={handleNavigate}
            onBack={handleBack}
          />
        );
      case 'questions':
        return (
          <QuestionsPage
            subject={pageParams.subject}
            tipo={pageParams.tipo}
            anio={pageParams.anio}
            onBack={handleBack}
          />
        );
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderCurrentPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;