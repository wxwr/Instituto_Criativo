import React, { useState } from "react";  
import AboutImg from "../../assets/foto_lucy-p-500.jpeg"; // Certifique-se de que a imagem está correta
import { motion } from "framer-motion"; 
import { SlideRight } from "../../utility/animation";
import Footer from "../Footer/Footer"; // Importe o Footer

const About = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalVideo, setModalVideo] = useState("");

  // Array de vídeos para exibir
  const videos = [
    { id: 1, url: "https://www.youtube.com/embed/gPHI53pwwmE", title: "A Tecnologia a favor da Educação" },
    { id: 2, url: "https://www.youtube.com/embed/bua0ozc7Uhc?si=7oPtgNn91OXlgxIg", title: "A crise da educação no Brasil" },
    { id: 3, url: "https://www.youtube.com/embed/-cZJ-erRG1Y?si=tS6eSVQ-g5MHVlfT", title: "O Papel do educador no Aprendizado" },
    { id: 4, url: "https://www.youtube.com/embed/4TCTSqmVH80?si=OzSnxMqeLFJ_J56l", title: "Projeto Jovens Criativos" },
  ];

  const openModal = (url) => {
    setModalVideo(url);
    setShowModal(true);
  };

  return (
    <>
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative">
        {/* Texto de fundo */}
        <div className="absolute inset-0 flex justify-center items-center">
          <h1 className="text-[100px] md:text-[150px] lg:text-[150px] font-bold text-gray-300 opacity-20 text-center -z-10">
            Nossa História <br /> e Impacto
          </h1>
        </div>
        
        {/* Informações sobre o Instituto Criativo */}
        <div className="flex flex-col justify-center py-14 md:pr-16 xl:pr-40 md:py-0 relative z-10">
          <div className="text-center md:text-left space-y-6">
            <motion.p
              variants={SlideRight(0.4)}
              initial="hidden"
              animate="visible"
              className="text-orange-600 uppercase font-semibold"
            >
              Transformando o Futuro
            </motion.p>
            <motion.h1
              variants={SlideRight(0.6)}
              initial="hidden"
              animate="visible"
              className="text-5xl font-semibold lg:text-6xl !leading-tight"
            >
              Conheça o <span className="text-primary">Instituto Criativo</span>
            </motion.h1>
            <motion.p
              variants={SlideRight(0.8)}
              initial="hidden"
              animate="visible"
            >
              O Instituto Criativo é uma ONG dedicada a promover a educação inovadora, proporcionando oportunidades para jovens e comunidades em situação de vulnerabilidade.
            </motion.p>
            <motion.p
              variants={SlideRight(1.0)}
              initial="hidden"
              animate="visible"
            >
              Acreditamos no poder da educação criativa para transformar vidas e criar um impacto social positivo, ajudando a desenvolver habilidades que vão além do convencional.
            </motion.p>
            <motion.div
              variants={SlideRight(1.2)}
              initial="hidden"
              animate="visible"
              className="flex gap-8 justify-center md:justify-start !mt-8 items-center"
            >
              <button className="primary-btn">Junte-se a Nós</button>
            </motion.div>
          </div>
        </div>
        
        <div className="flex justify-center items-center relative z-10">
          <motion.img
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            src={AboutImg}
            alt="Instituto Criativo"
            className="w-[350px] md:w-[550px] xl:w-[300px]"
          />
        </div>
      </div>

      {/* Seção de vídeos */}
      <section className="py-20 bg-gray-100">
        <div className="container text-center">
          <motion.h2
            variants={SlideRight(0.4)}
            initial="hidden"
            animate="visible"
            className="text-4xl font-bold mb-12"
          >
            Assista aos Nossos Vídeos
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {videos.map((video) => (
              <div key={video.id} className="relative rounded-lg overflow-hidden shadow-lg bg-white">
                <iframe
                  className="w-full h-64 md:h-80"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full p-4 text-white text-center">
                  <h3 className="font-semibold text-xl">{video.title}</h3>
                  <button
                    className="bg-primary text-white py-2 px-4 mt-2 rounded-md"
                    onClick={() => openModal(video.url)}
                  >
                    Assistir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-3xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={modalVideo}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </>
  );
};

export default About;
