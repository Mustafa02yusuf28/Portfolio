import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Particles } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';
import { tsParticles } from '@tsparticles/engine';
import { 
  EnvelopeIcon, 
  CodeBracketIcon, 
  ArrowUpIcon,
  CpuChipIcon,
  ServerIcon,
  CommandLineIcon,
  BeakerIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { 
  SiCplusplus, SiPython, SiC, SiJavascript, SiTypescript,
  SiSolidity, SiHtml5, SiCss3, SiMysql, SiDjango, SiNextdotjs, 
  SiReact, SiPandas, SiTensorflow, SiPytorch, SiNumpy,
  SiGit, SiLinux, SiEthereum, SiIpfs, SiRedux, SiChainlink,
  SiGithub
} from 'react-icons/si';
import { TbBrandReactNative, TbBrandVscode, TbApi } from 'react-icons/tb';
import { FaDatabase, FaWindows, FaChartBar } from 'react-icons/fa';
import { BiNetworkChart } from 'react-icons/bi';

const particlesOptions: ISourceOptions = {
  background: {
    color: {
      value: "transparent"
    }
  },
  fpsLimit: 60,
  particles: {
    color: {
      value: "#3b82f6"
    },
    links: {
      color: "#3b82f6",
      distance: 150,
      enable: true,
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 0.2,
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "out"
      }
    },
    number: {
      value: 50,
      density: {
        enable: true
      }
    },
    opacity: {
      value: 0.2,
      animation: {
        enable: true,
        speed: 0.5
      }
    },
    size: {
      value: { min: 1, max: 3 }
    }
  },
  detectRetina: true,
  smooth: true,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab"
      }
    },
    modes: {
      grab: {
        distance: 140,
        links: {
          opacity: 0.5
        }
      }
    }
  }
};

const skillsData = {
  languages: [
    { name: 'C++', icon: <SiCplusplus className="text-xl" /> },
    { name: 'Python', icon: <SiPython className="text-xl" /> },
    { name: 'C', icon: <SiC className="text-xl" /> },
    
    { name: 'JavaScript', icon: <SiJavascript className="text-xl" /> },
    { name: 'TypeScript', icon: <SiTypescript className="text-xl" /> },
    { name: 'SQL', icon: <FaDatabase className="text-xl" /> },
    { name: 'Solidity', icon: <SiSolidity className="text-xl" /> }
  ],
  technologies: [
    { name: 'HTML', icon: <SiHtml5 className="text-xl" /> },
    { name: 'CSS', icon: <SiCss3 className="text-xl" /> },
    { name: 'MySQL', icon: <SiMysql className="text-xl" /> },
    { name: 'WebSocket', icon: <BiNetworkChart className="text-xl" /> },
    { name: 'REST APIs', icon: <TbApi className="text-xl" /> },
    { name: 'Ethereum', icon: <SiEthereum className="text-xl" /> },
    { name: 'IPFS', icon: <SiIpfs className="text-xl" /> },
    { name: 'Web3.js', icon: <SiEthereum className="text-xl" /> },
    { name: 'MetaMask', icon: <SiEthereum className="text-xl" /> },
    { name: 'WalletConnect', icon: <SiEthereum className="text-xl" /> }
  ],
  tools: [
    { name: 'Git', icon: <SiGit className="text-xl" /> },
    { name: 'Linux', icon: <SiLinux className="text-xl" /> },
    { name: 'Windows', icon: <FaWindows className="text-xl" /> },
    { name: 'Tableau', icon: <FaChartBar className="text-xl" /> },
    { name: 'Visual Studio Code', icon: <TbBrandVscode className="text-xl" /> }
  ],
  frameworks: [
    { name: 'Django', icon: <SiDjango className="text-xl" /> },
    { name: 'Next.js', icon: <SiNextdotjs className="text-xl" /> },
    { name: 'React', icon: <SiReact className="text-xl" /> }
  ],
  libraries: [
    { name: 'Pandas', icon: <SiPandas className="text-xl" /> },
    { name: 'TensorFlow', icon: <SiTensorflow className="text-xl" /> },
    { name: 'PyTorch', icon: <SiPytorch className="text-xl" /> },
    { name: 'NumPy', icon: <SiNumpy className="text-xl" /> },
    { name: 'BeautifulSoup', icon: <TbBrandReactNative className="text-xl rotate-45" /> },
    { name: 'Material-UI', icon: <TbBrandReactNative className="text-xl" /> },
    { name: 'Redux', icon: <SiRedux className="text-xl" /> },
    { name: 'Recharts', icon: <FaChartBar className="text-xl" /> }
  ],
  blockchain: [
    { name: 'Smart Contracts', icon: <SiSolidity className="text-xl" /> },
    { name: 'Ethereum Testnets', icon: <SiEthereum className="text-xl" /> },
    { name: 'Chainlink', icon: <SiChainlink className="text-xl" /> }
  ]
};

const App = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { ref: skillsRef, inView: skillsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { ref: projectsRef, inView: projectsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { ref: leetcodeRef, inView: leetcodeInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show scroll to top button when scrolling
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const init = async () => {
      await loadSlim(tsParticles);
    };
    init();
  }, []);

  // Add this new function
  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('/resume/document.pdf', '_blank');
  };

  return (
    <div className="min-h-screen bg-black">
      <Particles
        id="tsparticles"
        className="fixed inset-0 h-screen w-screen"
        options={particlesOptions}
      />
      <div className="relative">
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 w-full bg-black/30 backdrop-blur-xl z-50 border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0"
              >
                <span className="text-primary-400 font-mono text-xl bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  Portfolio
                </span>
              </motion.div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {['About', 'Skills', 'Projects', 'LeetCode', 'Contact'].map((item) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      whileHover={{ scale: 1.05, color: '#60A5FA' }}
                      className="text-dark-300 hover:text-primary-400 px-3 py-2 rounded-md transition-colors duration-300"
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.nav>

        <motion.section 
          className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative"
          style={{ opacity, scale }}
        >
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                animate={{
                  background: [
                    "linear-gradient(to right, #3b82f6, #60a5fa)",
                    "linear-gradient(to right, #60a5fa, #93c5fd)",
                    "linear-gradient(to right, #93c5fd, #3b82f6)"
                  ]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute inset-0 opacity-10 blur-3xl"
              />
              <motion.h1 
                className="text-6xl md:text-7xl font-bold mb-4 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Hi, I'm{" "}
                <motion.span 
                  className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent relative inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Md Mustafa Yusuf
                </motion.span>
              </motion.h1>
              <motion.p 
                className="text-xl text-dark-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                A developer with a strong interest in quantitative trading and high-frequency trading (HFT), passionate about building projects and exploring innovations in this field.
              </motion.p>
            </motion.div>
          </div>
        </motion.section>

        <section id="about" ref={aboutRef} className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="section-title">About Me</h2>
              <div className="grid md:grid-cols-1 gap-8">
                <motion.div 
                  className="card bg-dark-800/50 border border-dark-700/5 transform-gpu"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2, type: "tween" }}
                >
                  <p className="text-dark-200">
                    Driven by a fascination with algorithmic trading and market dynamics, I specialize in developing high-performance trading systems and quantitative analysis tools. My experience spans from implementing low-latency trading algorithms to creating sophisticated market analysis dashboards, always striving for optimal execution and innovative solutions in the fast-paced world of financial technology.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="skills" ref={skillsRef} className="py-16 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={skillsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="section-title">
                <motion.span
                  className="inline-block"
                  whileHover={{
                    scale: 1.05,
                    color: "#3b82f6",
                    transition: { duration: 0.2 }
                  }}
                >
                  Skills
                </motion.span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div 
                  className="card bg-dark-800/30 backdrop-blur-xl border border-white/5 transform-gpu relative group"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)"
                  }}
                  transition={{ duration: 0.2, type: "tween" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  <div className="flex items-center mb-4">
                    <CpuChipIcon className="h-8 w-8 text-primary-400 mr-2" />
                    <h3 className="text-xl font-semibold text-white">Languages</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillsData.languages.map((skill) => (
                      <div key={skill.name} className="skill-tag">
                        {skill.icon}
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="card bg-dark-800/30 backdrop-blur-xl border border-white/5 transform-gpu relative group"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)"
                  }}
                  transition={{ duration: 0.2, type: "tween" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  <div className="flex items-center mb-4">
                    <ServerIcon className="h-8 w-8 text-primary-400 mr-2" />
                    <h3 className="text-xl font-semibold text-white">Technologies</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillsData.technologies.map((skill) => (
                      <div key={skill.name} className="skill-tag">
                        {skill.icon}
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="card bg-dark-800/30 backdrop-blur-xl border border-white/5 transform-gpu relative group"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)"
                  }}
                  transition={{ duration: 0.2, type: "tween" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  <div className="flex items-center mb-4">
                    <CommandLineIcon className="h-8 w-8 text-primary-400 mr-2" />
                    <h3 className="text-xl font-semibold text-white">Tools</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillsData.tools.map((skill) => (
                      <div key={skill.name} className="skill-tag">
                        {skill.icon}
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="card bg-dark-800/30 backdrop-blur-xl border border-white/5 transform-gpu relative group"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)"
                  }}
                  transition={{ duration: 0.2, type: "tween" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  <div className="flex items-center mb-4">
                    <CodeBracketIcon className="h-8 w-8 text-primary-400 mr-2" />
                    <h3 className="text-xl font-semibold text-white">Frameworks</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillsData.frameworks.map((skill) => (
                      <div key={skill.name} className="skill-tag">
                        {skill.icon}
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="card bg-dark-800/30 backdrop-blur-xl border border-white/5 transform-gpu relative group"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)"
                  }}
                  transition={{ duration: 0.2, type: "tween" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  <div className="flex items-center mb-4">
                    <BeakerIcon className="h-8 w-8 text-primary-400 mr-2" />
                    <h3 className="text-xl font-semibold text-white">Libraries</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillsData.libraries.map((skill) => (
                      <div key={skill.name} className="skill-tag">
                        {skill.icon}
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="card bg-dark-800/30 backdrop-blur-xl border border-white/5 transform-gpu relative group"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)"
                  }}
                  transition={{ duration: 0.2, type: "tween" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  <div className="flex items-center mb-4">
                    <ChartBarIcon className="h-8 w-8 text-primary-400 mr-2" />
                    <h3 className="text-xl font-semibold text-white">Blockchain</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillsData.blockchain.map((skill) => (
                      <div key={skill.name} className="skill-tag">
                        {skill.icon}
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="projects" ref={projectsRef} className="py-16 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="section-title">Projects</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                  className="card bg-dark-800/30 backdrop-blur-xl border border-white/5 transform-gpu relative group perspective"
                  whileHover={{ 
                    scale: 1.02,
                    rotateX: 5,
                    rotateY: 5,
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)"
                  }}
                  transition={{ duration: 0.2, type: "tween" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-white mb-2">High-Frequency Trading (HFT) AI Dashboard</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-dark-700/30 text-primary-400">Next.js</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-dark-700/30 text-primary-400">Python</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-dark-700/30 text-primary-400">WebSocket</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-dark-700/30 text-primary-400">AI/ML</span>
                    </div>
                    <p className="text-dark-200 mb-4">
                      • AI-powered dashboard for real-time market data visualization and trade execution insights<br/>
                      • Implemented transformer-based time-series forecasting and reinforcement learning models<br/>
                      • Enhanced trade accuracy through predictive order flow analysis
                    </p>
                    <div className="mt-4">
                      <a 
                        href="https://github.com/Mustafa02yusuf28/-HFT-Dashboard"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline inline-flex items-center space-x-2 w-full justify-center relative z-20"
                      >
                        <span>View Project</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="card bg-dark-800/30 backdrop-blur-xl border border-white/5 transform-gpu relative group perspective"
                  whileHover={{ 
                    scale: 1.02,
                    rotateX: 5,
                    rotateY: 5,
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)"
                  }}
                  transition={{ duration: 0.2, type: "tween" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-white mb-2">IPO Listing Price Predictor</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-dark-700/30 text-primary-400">Python</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-dark-700/30 text-primary-400">React</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-dark-700/30 text-primary-400">Machine Learning</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-dark-700/30 text-primary-400">GNews API</span>
                    </div>
                    <p className="text-dark-200 mb-4">
                      • Full-stack web application for predicting IPO listing prices using market sentiment and historical data<br/>
                      • Integrated GNews API for real-time market sentiment analysis<br/>
                      • Developed ML model trained on historical IPO data for accurate price predictions
                    </p>
                    <div className="mt-4">
                      <a 
                        href="https://github.com/Mustafa02yusuf28/ipo-Listing-predictor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline inline-flex items-center space-x-2 w-full justify-center relative z-20"
                      >
                        <span>View Project</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="resume" className="py-16 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="section-title">Resume</h2>
              <div className="flex justify-center">
                <motion.a
                  href="#"
                  onClick={handleResumeClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary inline-flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>View My Resume</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="leetcode" ref={leetcodeRef} className="py-16 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={leetcodeInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="section-title">LeetCode Stats</h2>
              <motion.div 
                className="card bg-[#151515]/50 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden p-6 relative group"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)"
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/5 to-primary-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://leetcode.com/static/images/LeetCode_logo_rvs.png"
                      alt="LeetCode"
                      className="w-8 h-8"
                    />
                    <motion.a
                      href="https://leetcode.com/mmy288/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-bold text-white font-nunito hover:text-[#3b82f6] transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      mmy288
                    </motion.a>
                  </div>
                  <div className="text-[#808080] text-sm">Solved Problems: 321</div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#1a1a1a] rounded-lg p-4">
                    <div className="text-[#00b8a3] text-sm mb-1">Easy</div>
                    <div className="text-white font-bold">140</div>
                    <div className="text-[#808080] text-sm">873</div>
                    <div className="mt-2 h-1 bg-[#262626] rounded-full">
                      <div className="h-full bg-[#00b8a3] rounded-full" style={{ width: `${(140/873)*100}%` }} />
                    </div>
                  </div>
                  <div className="bg-[#1a1a1a] rounded-lg p-4">
                    <div className="text-[#ffc01e] text-sm mb-1">Medium</div>
                    <div className="text-white font-bold">152</div>
                    <div className="text-[#808080] text-sm">1826</div>
                    <div className="mt-2 h-1 bg-[#262626] rounded-full">
                      <div className="h-full bg-[#ffc01e] rounded-full" style={{ width: `${(152/1826)*100}%` }} />
                    </div>
                  </div>
                  <div className="bg-[#1a1a1a] rounded-lg p-4">
                    <div className="text-[#ef4743] text-sm mb-1">Hard</div>
                    <div className="text-white font-bold">31</div>
                    <div className="text-[#808080] text-sm">822</div>
                    <div className="mt-2 h-1 bg-[#262626] rounded-full">
                      <div className="h-full bg-[#ef4743] rounded-full" style={{ width: `${(29/822)*100}%` }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="section-title">Get in Touch</h2>
              <div className="grid md:grid-cols-1 gap-8">
                <motion.div 
                  className="card bg-dark-800/30 backdrop-blur-xl border border-white/5 transform-gpu relative group"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white">Contact Information</h3>
                    <div className="space-y-4">
                      <a 
                        href="mailto:workforthieves@gmail.com" 
                        className="flex items-center space-x-3 text-dark-200 hover:text-primary-400 transition-colors duration-200 relative z-20"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <EnvelopeIcon className="h-5 w-5" />
                        <span>workforthieves@gmail.com</span>
                      </a>
                      <a 
                        href="https://t.me/thieves_28" 
                        className="flex items-center space-x-3 text-dark-200 hover:text-primary-400 transition-colors duration-200 relative z-20"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg 
                          className="h-5 w-5" 
                          viewBox="0 0 24 24" 
                          fill="currentColor"
                        >
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.815-.168.73-.337 1.466-.505 2.2-.168.735-.574.882-.941.882-.505 0-1.123-.253-1.729-.557-.606-.304-1.853-1.193-2.458-1.497-.606-.304-1.124-.557-1.629-.861-.505-.304-.909-.608-1.213-.912-.303-.304-.505-.557-.707-.861-.202-.304-.303-.557-.303-.861s.202-.608.505-.912c.303-.304.707-.608 1.213-.912.505-.304 1.123-.557 1.729-.861.606-.304 1.853-1.193 2.458-1.497.606-.304 1.124-.557 1.629-.861.505-.304.909-.608 1.213-.912.303-.304.505-.557.707-.861.202-.304.303-.557.303-.861s-.202-.608-.505-.912z"/>
                        </svg>
                        <span>@thieves_28</span>
                      </a>
                      <a 
                        href="https://github.com/Mustafa02yusuf28" 
                        className="flex items-center space-x-3 text-dark-200 hover:text-primary-400 transition-colors duration-200 relative z-20"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <SiGithub className="h-5 w-5" />
                        <span>GitHub Profile</span>
                      </a>
                    </div>
                    <p className="text-dark-300">
                      Feel free to reach out through email or Telegram. I'll get back to you as soon as possible.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <footer className="bg-black/30 backdrop-blur-xl py-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-dark-400">
              <p>&copy; {new Date().getFullYear()} Md Mustafa Yusuf . All rights reserved.</p>
            </div>
          </div>
        </footer>

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 p-3 rounded-full bg-dark-800/50 backdrop-blur-xl text-white shadow-lg hover:bg-dark-700/50 transition-all duration-300 border border-white/5"
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUpIcon className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App; 