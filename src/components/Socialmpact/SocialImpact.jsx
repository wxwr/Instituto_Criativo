import React from "react";
import { motion } from "framer-motion";
import { SlideRight, FadeIn } from "../../utility/animation"; // Importe as animações
import { FaHeart, FaUsers, FaLightbulb, FaHandsHelping } from "react-icons/fa";
import Footer from "../Footer/Footer"; // Importe o Footer


const SocialImpact = () => {
  return (
    <>
    {/* Bloueia a rolagem lateral no body */}
    <div className="overflow-x-hidden">
      {/* Seção Hero */}
      <div className="container grid grid-cols-1 min-h-[650px] relative ">
        {/* Texto de fundo */}
        <div className="absolute inset-0 flex justify-center items-center">
          <h1 className="text-[100px] md:text-[150px] lg:text-[150px] font-bold text-gray-300 opacity-20 text-center -z-10">
            Impacto Social <br /> e Transformação
          </h1>
        </div>

        {/* Informações do Impacto Social */}
        <div className="flex flex-col justify-center py-14 md:pr-16 xl:pr-40 md:py-0 relative z-10">
          <div className="text-center md:text-left space-y-6">
            <motion.p
              variants={SlideRight(0.4)}
              initial="hidden"
              animate="visible"
              className="text-orange-600 uppercase font-semibold"
            >
              Transformando Vidas
            </motion.p>
            <motion.h1
              variants={SlideRight(0.6)}
              initial="hidden"
              animate="visible"
              className="text-5xl font-semibold lg:text-6xl !leading-tight"
            >
              Nosso Impacto <span className="text-primary"> na Sociedade</span>
            </motion.h1>
            <motion.p
              variants={SlideRight(0.8)}
              initial="hidden"
              animate="visible"
            >
              No Instituto Criativo, acreditamos no poder da educação e da criatividade para transformar comunidades e construir um futuro melhor.
            </motion.p>
            <motion.p
              variants={SlideRight(1.0)}
              initial="hidden"
              animate="visible"
              className="text-gray-600"
            >
              A educação é a base de qualquer sociedade próspera. Ela abre portas, quebra barreiras e capacita indivíduos a alcançarem seu potencial máximo. No entanto, acreditamos que a educação tradicional, por si só, não é suficiente. É preciso ir além, integrando a <strong>criatividade</strong> como um pilar fundamental para o desenvolvimento humano e social.
            </motion.p>
            <motion.p
              variants={SlideRight(1.2)}
              initial="hidden"
              animate="visible"
              className="text-gray-600"
            >
              A criatividade não se limita às artes ou à inovação tecnológica. Ela está presente na maneira como resolvemos problemas, como nos relacionamos com os outros e como enxergamos o mundo ao nosso redor. Quando combinamos educação com criatividade, criamos um ambiente onde as pessoas podem pensar fora da caixa, encontrar soluções inovadoras e transformar desafios em oportunidades.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Seção de Métricas */}
      <div className="bg-gray-50 py-20">
        <div className="container">
          <motion.h2
            variants={FadeIn(0.4)}
            initial="hidden"
            animate="visible"
            className="text-4xl font-semibold text-center mb-12"
          >
            Nossos Números
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Métrica 1 */}
            <motion.div
              variants={SlideRight(0.6)}
              initial="hidden"
              animate="visible"
              className="text-center p-6 bg-white rounded-lg shadow-md"
            >
              <FaHeart className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-3xl font-bold">100+</h3>
              <p className="text-gray-600">Projetos Criativos</p>
            </motion.div>

            {/* Métrica 2 */}
            <motion.div
              variants={SlideRight(0.8)}
              initial="hidden"
              animate="visible"
              className="text-center p-6 bg-white rounded-lg shadow-md"
            >
              <FaUsers className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-3xl font-bold">2,500+</h3>
              <p className="text-gray-600">Educadores e Pais desenvolvidos</p>
            </motion.div>

            {/* Métrica 3 */}
            <motion.div
              variants={SlideRight(1.0)}
              initial="hidden"
              animate="visible"
              className="text-center p-6 bg-white rounded-lg shadow-md"
            >
              <FaLightbulb className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-3xl font-bold">20,000</h3>
              <p className="text-gray-600">Estudantes impactados</p>
            </motion.div>

            {/* Métrica 4 */}
            <motion.div
              variants={SlideRight(1.2)}
              initial="hidden"
              animate="visible"
              className="text-center p-6 bg-white rounded-lg shadow-md"
            >
              <FaHandsHelping className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-3xl font-bold">30,000+</h3>
              <p className="text-gray-600">Pessoas Alcançadas</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Seção de Depoimentos */}
      <div className="container py-20">
        <motion.h2
          variants={FadeIn(0.4)}
          initial="hidden"
          animate="visible"
          className="text-4xl font-semibold text-center mb-12"
        >
          Depoimentos
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Depoimento 1 */}
          <motion.div
            variants={SlideRight(0.6)}
            initial="hidden"
            animate="visible"
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <p className="text-gray-600 italic">
              "O Instituto Criativo mudou a vida da minha comunidade. Agora temos acesso a ferramentas e conhecimentos que antes pareciam distantes."
            </p>
            <span className="block mt-4 font-semibold text-primary">- Maria, Líder Comunitária</span>
          </motion.div>

          {/* Depoimento 2 */}
          <motion.div
            variants={SlideRight(0.8)}
            initial="hidden"
            animate="visible"
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <p className="text-gray-600 italic">
              "Participar dos projetos do Instituto foi transformador. Aprendi habilidades que me ajudaram a conseguir meu primeiro emprego."
            </p>
            <span className="block mt-4 font-semibold text-primary">- João, Beneficiário</span>
          </motion.div>
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
    </div>
    </>
  );
};

export default SocialImpact;