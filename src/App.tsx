import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import HomePage from './components/HomePage';
import ProjectPage from './components/ProjectPage';
import ContactPage from './components/ContactPage';

type PageType = 'home' | 'project' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when page changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPage]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => setCurrentPage('home')}
            className="text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Portfolio
          </motion.button>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <NavLink onClick={() => setCurrentPage('home')} active={currentPage === 'home'}>
              Home
            </NavLink>
            <NavLink onClick={() => setCurrentPage('project')} active={currentPage === 'project'}>
              Work
            </NavLink>
            <NavLink onClick={() => setCurrentPage('contact')} active={currentPage === 'contact'}>
              Contact
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.span
              className="w-6 h-0.5 bg-white"
              animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 8 : 0 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-white"
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-white"
              animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -8 : 0 }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-black border-t border-white/10"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                <MobileNavLink onClick={() => setCurrentPage('home')} active={currentPage === 'home'}>
                  Home
                </MobileNavLink>
                <MobileNavLink onClick={() => setCurrentPage('project')} active={currentPage === 'project'}>
                  Work
                </MobileNavLink>
                <MobileNavLink onClick={() => setCurrentPage('contact')} active={currentPage === 'contact'}>
                  Contact
                </MobileNavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {currentPage === 'home' && <HomePage onNavigateToProjects={() => setCurrentPage('project')} />}
          {currentPage === 'project' && <ProjectPage />}
          {currentPage === 'contact' && <ContactPage />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function NavLink({ children, onClick, active }: { children: React.ReactNode; onClick: () => void; active: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative ${active ? 'text-white' : 'text-white/60'} transition-colors hover:text-white`}
      whileHover={{ y: -2 }}
    >
      {children}
      {active && (
        <motion.div
          layoutId="activeNav"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

function MobileNavLink({ children, onClick, active }: { children: React.ReactNode; onClick: () => void; active: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      className={`text-left text-xl ${active ? 'text-white' : 'text-white/60'}`}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
