import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaComputer } from "react-icons/fa6"; // Ícones da versão 6
import { FaBook, FaPaintBrush, FaLightbulb, FaUsers, FaHandsHelping, FaGlobe, FaChartLine } from "react-icons/fa"; // Ícones da versão 4

const subjectList = [
  {
    id: 1,
    name: "Tecnologia",
    icon: <FaComputer />,
    color: "#0063ff",
    delay: 0.2,
    type: "Curso Técnico",
    description: "Aprenda sobre programação, desenvolvimento de software e inovação tecnológica.",
  },
  {
    id: 2,
    name: "Literatura",
    icon: <FaBook />,
    color: "#00c986",
    delay: 0.3,
    type: "Curso de Humanidades",
    description: "Explore obras clássicas e contemporâneas, desenvolvendo habilidades de análise crítica.",
  },
  {
    id: 3,
    name: "Arte e Cultura",
    icon: <FaPaintBrush />,
    color: "#922aee",
    delay: 0.4,
    type: "Curso Artístico",
    description: "Descubra diferentes formas de expressão artística e cultural.",
  },
  {
    id: 4,
    name: "Empreendedorismo",
    icon: <FaLightbulb />,
    color: "#ea7516",
    delay: 0.5,
    type: "Curso de Negócios",
    description: "Desenvolva habilidades para criar e gerenciar seu próprio negócio.",
  },
  {
    id: 5,
    name: "Educação Social",
    icon: <FaUsers />,
    color: "#075267",
    delay: 0.6,
    type: "Curso Social",
    description: "Aprenda sobre práticas educacionais que promovem a inclusão e a transformação social.",
  },
  {
    id: 6,
    name: "Voluntariado",
    icon: <FaHandsHelping />,
    color: "#986d1d",
    delay: 0.7,
    type: "Curso de Serviço Comunitário",
    description: "Participe de projetos voluntários e faça a diferença na comunidade.",
  },
  {
    id: 7,
    name: "Sustentabilidade",
    icon: <FaGlobe />,
    color: "#b93838",
    delay: 0.8,
    type: "Curso Ambiental",
    description: "Entenda os princípios da sustentabilidade e como aplicá-los no dia a dia.",
  },
  {
    id: 8,
    name: "Ver Todos",
    icon: <FaChartLine />,
    color: "#464646",
    delay: 0.9,
    type: "Todos os Cursos",
    description: "Explore todos os cursos disponíveis em nossa plataforma.",
  },
];

const SubjectCard = () => {
  const [selectedSubject, setSelectedSubject] = useState(null); // Estado para armazenar a matéria selecionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade do modal

  // Função para abrir o modal com os dados da matéria selecionada
  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubject(null);
  };

  return (
    <>
      <div className="container py-14 md:py-24">
        {/* header section */}
        <div className="space-y-4 p-6 text-center max-w-[600px] mx-auto mb-5">
          <h1 className="uppercase font-semibold text-orange-500">
            Nossas Áreas de Ensino
          </h1>
          <p className="font-semibold text-3xl">
            Nossos Ensinos e Segmentos
          </p>
        </div>
        {/* cards section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subjectList.map((subject) => {
            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  delay: subject.delay,
                }}
                className="border rounded-lg border-secondary/20 p-4 flex justify-start items-center gap-4 hover:!scale-105 hover:!shadow-xl duration-200 cursor-pointer"
                onClick={() => handleSubjectClick(subject)} // Abre o modal ao clicar na matéria
              >
                <div
                  style={{
                    color: subject.color,
                    backgroundColor: subject.color + "20",
                  }}
                  className="w-10 h-10 rounded-md flex justify-center items-center"
                >
                  {subject.icon}
                </div>
                <p>{subject.name}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedSubject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{selectedSubject.name}</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                <strong>Tipo:</strong> {selectedSubject.type}
              </p>
              <p className="text-gray-600">
                <strong>Descrição:</strong> {selectedSubject.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubjectCard;