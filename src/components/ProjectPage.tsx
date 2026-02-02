import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    year: '2025',
    description: 'A full-featured e-commerce platform with a modern design, built with React and Node.js. Features include product filtering, shopping cart, and secure checkout.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'ecommerce website design',
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 2,
    title: 'Brand Identity System',
    category: 'Design',
    year: '2025',
    description: 'Complete brand identity design including logo, color palette, typography, and brand guidelines for a sustainable fashion startup.',
    technologies: ['Figma', 'Illustrator', 'Photoshop'],
    image: 'brand identity design',
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 3,
    title: 'Fitness Tracking App',
    category: 'Mobile App',
    year: '2024',
    description: 'A comprehensive fitness tracking mobile application with workout plans, progress tracking, and social features.',
    technologies: ['React Native', 'Firebase', 'Redux'],
    image: 'fitness app interface',
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 4,
    title: 'Real Estate Dashboard',
    category: 'Web Development',
    year: '2024',
    description: 'An intuitive dashboard for real estate agents to manage properties, track leads, and analyze market trends.',
    technologies: ['Vue.js', 'Express', 'PostgreSQL'],
    image: 'dashboard analytics',
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 5,
    title: 'Restaurant Website',
    category: 'Web Design',
    year: '2024',
    description: 'A beautiful, responsive website for a fine dining restaurant with online reservations and menu showcase.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    image: 'restaurant interior',
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 6,
    title: 'Portfolio CMS',
    category: 'Full Stack',
    year: '2024',
    description: 'A custom content management system for creative professionals to showcase their work and manage their portfolio.',
    technologies: ['Next.js', 'Prisma', 'TailwindCSS'],
    image: 'portfolio website design',
    liveUrl: '#',
    githubUrl: '#'
  }
];

export default function ProjectPage() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Web Development', 'Design', 'Mobile App', 'Full Stack'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl mb-6">My Work</h1>
          <p className="text-xl text-white/70 max-w-2xl">
            A collection of projects showcasing my skills in web development, design, and creative problem solving.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="flex gap-4 mb-12 overflow-x-auto pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full border whitespace-nowrap transition-colors ${
                filter === category
                  ? 'bg-white text-black border-white'
                  : 'border-white/20 hover:border-white/40'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <motion.div
                  className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-white/5"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageWithFallback
                    src={`https://source.unsplash.com/1200x800/?${encodeURIComponent(project.image)}`}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-sm text-white/80 mb-2">Click to view details</p>
                    </div>
                  </div>
                </motion.div>

                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-sm text-white/60">{project.category}</span>
                    <h3 className="text-2xl mt-1 group-hover:text-white/80 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-white/60">{project.year}</span>
                </div>

                <p className="text-white/70 line-clamp-2">{project.description}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              className="fixed inset-4 md:inset-8 lg:inset-16 bg-zinc-900 rounded-3xl z-50 overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-white/10 p-6 flex items-center justify-between z-10">
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center gap-2 hover:text-white/70 transition-colors"
                  whileHover={{ x: -5 }}
                >
                  <ArrowLeft size={20} />
                  Back to Projects
                </motion.button>
                <div className="flex gap-4">
                  <motion.a
                    href={selectedProject.liveUrl}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                  <motion.a
                    href={selectedProject.githubUrl}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={20} />
                  </motion.a>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="max-w-5xl mx-auto">
                  <div className="flex items-center gap-4 mb-4 text-white/60">
                    <span>{selectedProject.category}</span>
                    <span>•</span>
                    <span>{selectedProject.year}</span>
                  </div>

                  <h2 className="text-4xl md:text-6xl mb-8">{selectedProject.title}</h2>

                  <div className="aspect-video rounded-2xl overflow-hidden mb-12 bg-white/5">
                    <ImageWithFallback
                      src={`https://source.unsplash.com/1600x900/?${encodeURIComponent(selectedProject.image)}`}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2">
                      <h3 className="text-2xl mb-4">About the Project</h3>
                      <p className="text-white/70 text-lg leading-relaxed mb-6">
                        {selectedProject.description}
                      </p>
                      <p className="text-white/70 text-lg leading-relaxed">
                        This project demonstrates my ability to create scalable, user-friendly applications 
                        with modern technologies. Every aspect was carefully considered, from initial design 
                        concepts to final implementation and deployment.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl mb-4">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-2 bg-white/10 rounded-full border border-white/20 text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-8">
                        <h3 className="text-2xl mb-4">Links</h3>
                        <div className="flex flex-col gap-3">
                          <a
                            href={selectedProject.liveUrl}
                            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                          >
                            <ExternalLink size={18} />
                            Live Site
                          </a>
                          <a
                            href={selectedProject.githubUrl}
                            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                          >
                            <Github size={18} />
                            Source Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
