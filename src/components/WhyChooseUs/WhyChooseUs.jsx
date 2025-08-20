import React from "react";
import { GrBook } from "react-icons/gr";
import { GrBriefcase } from "react-icons/gr";
import { GrMemory } from "react-icons/gr";
import { CiHeart } from "react-icons/ci";
import { motion } from "framer-motion";
import { SlideLeft } from "../../utility/animation";

const WhyChooseData = [
  {
    id: 1,
    title: "Aprendizado",
    desc: "Desenvolvimento de pensamento crítico, empreendedorismo, matemática e computação.",
    icon: <GrBook />,
    bgColor: "#0063ff",
    delay: 0.3,
  },
  {
    id: 2,
    title: "Primeiro emprego",
    desc: "Competências e habilidades para jovens ingressarem no mercado de trabalho.",
    link: "/",
    icon: <GrBriefcase />,
    bgColor: "#73bc00",
    delay: 0.6,
  },
  {
    id: 3,
    title: "Recolocação",
    desc: "Desenvolvimento de pensamento crítico, empreendedorismo, matemática e computação.",
    link: "/",
    icon: <GrMemory />,
    bgColor: "#fa6400",
    delay: 0.9,
  },
  {
    id: 4,
    title: "Bem-Estar",
    desc: "Assistência social por meio de atividades, terapias, doação de alimentos e palestras.",
    link: "/",
    icon: <CiHeart />,
    bgColor: "#fe6baa",
    delay: 0.9,
  },
];
const WhyChooseUs = () => {
  return (
    <div className="bg-[#f9fafc]">
      <div className="container py-24">
        <div className="space-y-4 p-6 text-center max-w-[500px] mx-auto mb-5">
          <h1 className="uppercase font-semibold text-orange-600">
            Conheça Nossos Segmentos
          </h1>
          <p className="font-semibold text-3xl">
            Vantagens dos Nossos Segmentos
          </p>
        </div>
        {/* cards section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {WhyChooseData.map((item) => {
            return (
              <motion.div
                variants={SlideLeft(item.delay)}
                initial="hidden"
                whileInView={"visible"}
                className="space-y-4 p-6 rounded-xl shadow-[0_0_22px_rgba(0,0,0,0.15)]"
              >
                {/* icon section */}
                <div
                  style={{ backgroundColor: item.bgColor }}
                  className="w-10 h-10 rounded-lg flex justify-center items-center text-white"
                >
                  <div className="text-2xl">{item.icon}</div>
                </div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
