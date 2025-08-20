import React from "react";
import { motion } from "framer-motion"; 
import { SlideRight } from "../../utility/animation"; 
import { FaHome } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; // Ajuste aqui

const NotFound = () => {
  const navigate = useNavigate(); // Substituindo useHistory

  const goHome = () => {
    navigate("/"); // Redireciona para a página inicial
  };

  return (
    <div className="container flex justify-center items-center min-h-screen relative">
      {/* Texto de fundo */}
      <div className="absolute inset-0 flex justify-center items-center">
        <h1 className="text-[120px] md:text-[180px] font-bold text-gray-300 opacity-20 text-center -z-10">
          Página <br /> Não Encontrada
        </h1>
      </div>

      {/* Conteúdo central */}
      <div className="flex flex-col justify-center items-center z-10 space-y-8 text-center">
        <motion.p
          variants={SlideRight(0.4)}
          initial="hidden"
          animate="visible"
          className="text-orange-600 uppercase font-semibold"
        >
          Ops! Algo deu errado.
        </motion.p>
        <motion.h1
          variants={SlideRight(0.6)}
          initial="hidden"
          animate="visible"
          className="text-5xl font-semibold lg:text-6xl !leading-tight"
        >
          A página que você está procurando não existe.
        </motion.h1>
        <motion.p
          variants={SlideRight(0.8)}
          initial="hidden"
          animate="visible"
          className="text-xl text-gray-600"
        >
          Mas não se preocupe, estamos aqui para te ajudar a encontrar o caminho certo.
        </motion.p>
        <motion.div
          variants={SlideRight(1.0)}
          initial="hidden"
          animate="visible"
          className="flex justify-center items-center gap-4 mt-8"
        >
          <button
            onClick={goHome}
            className="primary-btn flex items-center gap-2"
          >
            <FaHome className="text-white" />
            Voltar para Home
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
