import React from "react";
import { motion } from "framer-motion";
import { SlideRight, SlideLeft } from "../../utility/animation"; // Certifique-se de importar as animações corretas

const FAQ = () => {
  // Lista de perguntas e respostas
  const perguntas = [
    {
      pergunta: "O que é o Instituto Criativo?",
      resposta: "O Instituto Criativo é uma plataforma dedicada ao ensino e à promoção de habilidades criativas, como design, programação, música e artes visuais. Nosso objetivo é capacitar pessoas a transformar suas ideias em realidade.",
    },
    {
      pergunta: "Quem pode participar dos cursos?",
      resposta: "Nossos cursos são abertos para todos, desde iniciantes até profissionais que desejam aprimorar suas habilidades. Não há pré-requisitos para a maioria dos cursos.",
    },
    {
      pergunta: "Como faço para me inscrever?",
      resposta: "Para se inscrever, basta criar uma conta no nosso site, escolher o curso desejado e seguir as instruções de pagamento. Após a confirmação, você terá acesso imediato ao conteúdo.",
    },
    {
      pergunta: "Os cursos são gratuitos?",
      resposta: "Temos tanto cursos gratuitos quanto pagos. Os cursos gratuitos oferecem conteúdo introdutório, enquanto os pagos incluem materiais avançados e suporte personalizado.",
    },
    {
      pergunta: "Como posso entrar em contato com o suporte?",
      resposta: "Você pode entrar em contato conosco através do e-mail suporte@institutocriativo.com ou pelo formulário de contato disponível no site. Respondemos em até 24 horas.",
    },
  ];

  return (
    <div className="container min-h-[650px] relative py-14">
      {/* Texto de fundo */}
      <div className="absolute inset-0 flex justify-center items-center">
          <h1 className="text-[100px] md:text-[100px] lg:text-[100px] font-bold text-gray-300 opacity-20 text-center -z-10">
          Perguntas Frequentes
        </h1>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10">
        <motion.h1
          variants={SlideRight(0.4)}
          initial="hidden"
          animate="visible"
          className="text-5xl font-semibold lg:text-6xl !leading-tight text-center md:text-left"
        >
          Perguntas <span className="text-primary">Frequentes</span>
        </motion.h1>

        {/* Lista de perguntas e respostas */}
        <div className="mt-12 space-y-6">
          {perguntas.map((item, index) => (
            <motion.div
              key={index}
              variants={index % 2 === 0 ? SlideRight(0.6 + index * 0.2) : SlideLeft(0.6 + index * 0.2)}
              initial="hidden"
              animate="visible"
              className="bg-gray-50 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold text-orange-600">{item.pergunta}</h2>
              <p className="mt-2 text-gray-700">{item.resposta}</p>
            </motion.div>
          ))}
        </div>

        {/* Botão para voltar à página inicial */}
        <motion.div
          variants={SlideRight(1.4)}
          initial="hidden"
          animate="visible"
          className="text-center mt-12"
        >
          <a
            href="/"
            className="inline-block bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all duration-200 transform hover:scale-105"
          >
            Voltar à Página Inicial
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;