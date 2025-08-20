import React from "react";
import { motion } from "framer-motion";
import { SlideRight, FadeIn } from "../../utility/animation"; // Importe as animações
import { FaBook, FaLightbulb, FaPaintBrush, FaHandsHelping } from "react-icons/fa";
import Footer from "../Footer/Footer"; // Importe o Footer


const Segment = () => {
  return (
    <>
      {/* Seção Hero */}
      <div className="container grid grid-cols-1 min-h-[650px] relative">
        {/* Texto de fundo */}
        <div className="absolute inset-0 flex justify-center items-center">
          <h1 className="text-[100px] md:text-[150px] lg:text-[150px] font-bold text-gray-300 opacity-20 text-center -z-10">
            Nossos Segmentos <br /> de Atuação
          </h1>
        </div>

        {/* Informações do Segmento */}
        <div className="flex flex-col justify-center py-14 md:pr-16 xl:pr-40 md:py-0 relative z-10">
          <div className="text-center md:text-left space-y-6">
            <motion.p
              variants={SlideRight(0.4)}
              initial="hidden"
              animate="visible"
              className="text-orange-600 uppercase font-semibold"
            >
              Transformando Realidades
            </motion.p>
            <motion.h1
              variants={SlideRight(0.6)}
              initial="hidden"
              animate="visible"
              className="text-5xl font-semibold lg:text-6xl !leading-tight"
            >
              Nossos Segmentos <span className="text-primary"> de Atuação</span>
            </motion.h1>
            <motion.p
              variants={SlideRight(0.8)}
              initial="hidden"
              animate="visible"
              className="text-gray-600"
            >
              No Instituto Criativo, atuamos em diferentes segmentos para promover a educação, a criatividade e o desenvolvimento social. Conheça nossas áreas de atuação e saiba como estamos transformando vidas.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Seção de Segmentos */}
      <div className="bg-gray-50 py-20">
        <div className="container">
          <motion.h2
            variants={FadeIn(0.4)}
            initial="hidden"
            animate="visible"
            className="text-4xl font-semibold text-center mb-12"
          >
            Conheça Nossos Segmentos
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Segmento 1: Educação */}
            <motion.div
              variants={SlideRight(0.6)}
              initial="hidden"
              animate="visible"
              className="text-center p-8 bg-white rounded-lg shadow-md"
            >
              <FaBook className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Educação</h3>
              <p className="text-gray-600">
                Promovemos a educação criativa e inclusiva, capacitando estudantes e educadores para um futuro melhor.
              </p>
            </motion.div>

            {/* Segmento 2: Empreendedorismo */}
            <motion.div
              variants={SlideRight(0.8)}
              initial="hidden"
              animate="visible"
              className="text-center p-8 bg-white rounded-lg shadow-md"
            >
              <FaLightbulb className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Empreendedorismo</h3>
              <p className="text-gray-600">
                Incentivamos o empreendedorismo criativo, ajudando jovens e adultos a transformarem ideias em negócios.
              </p>
            </motion.div>

            {/* Segmento 3: Arte e Cultura */}
            <motion.div
              variants={SlideRight(1.0)}
              initial="hidden"
              animate="visible"
              className="text-center p-8 bg-white rounded-lg shadow-md"
            >
              <FaPaintBrush className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Arte e Cultura</h3>
              <p className="text-gray-600">
                Levamos arte e cultura para comunidades, promovendo a expressão criativa e a valorização da diversidade.
              </p>
            </motion.div>

            {/* Segmento 4: Desenvolvimento Social */}
            <motion.div
              variants={SlideRight(1.2)}
              initial="hidden"
              animate="visible"
              className="text-center p-8 bg-white rounded-lg shadow-md"
            >
              <FaHandsHelping className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Desenvolvimento Social</h3>
              <p className="text-gray-600">
                Trabalhamos para o desenvolvimento social, criando oportunidades e fortalecendo comunidades.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Seção de Chamada para Ação */}
      <div className="bg-blue-600 py-20">
        <div className="container text-center">
          <motion.h2
            variants={FadeIn(0.4)}
            initial="hidden"
            animate="visible"
            className="text-4xl font-semibold text-white mb-6"
          >
            Faça Parte Dessa Transformação
          </motion.h2>
          <motion.p
            variants={FadeIn(0.6)}
            initial="hidden"
            animate="visible"
            className="text-gray-100 mb-8"
          >
            Sua contribuição pode ajudar a levar mais projetos como esses para quem mais precisa. Junte-se a nós e faça a diferença!
          </motion.p>
          <motion.button
            variants={FadeIn(0.8)}
            initial="hidden"
            animate="visible"
            className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all"
          >
            Doe Agora
          </motion.button>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Segment;