import React, { useState } from "react";
import { motion } from "framer-motion";
import { SlideRight, SlideLeft } from "../../utility/animation";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Configurações do EmailJS
    const serviceID = 'service_d2x6ak5';
    const templateID = 'template_ovorxtd';
    const userID = '-XVHrm05L0c_nPLHI'; // Sua Public Key do EmailJS

    // Envia o email usando EmailJS
    emailjs.send(serviceID, templateID, formData, userID)
      .then((response) => {
        console.log('Email enviado com sucesso!', response.status, response.text);
        alert("Mensagem enviada com sucesso!");
        setFormData({ nome: "", email: "", mensagem: "" });
      })
      .catch((error) => {
        console.error('Erro ao enviar o email:', error);
        alert("Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.");
      });
  };

  return (
    <div className="container min-h-[650px] relative py-14">
      {/* Texto de fundo */}
      <div className="absolute inset-0 flex justify-center items-center">
        <h1 className="text-[100px] md:text-[150px] lg:text-[150px] font-bold text-gray-300 opacity-20 text-center -z-10">
          Fale Conosco
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
          Entre em <span className="text-primary">Contato</span>
        </motion.h1>

        {/* Formulário */}
        <motion.form
          variants={SlideRight(0.6)}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="mt-12 space-y-6 max-w-2xl mx-auto"
        >
          <div className="space-y-2">
            <label className="text-gray-700 font-semibold">Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-gray-700 font-semibold">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-gray-700 font-semibold">Mensagem</label>
            <textarea
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows="5"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-all duration-200 transform hover:scale-105"
          >
            Enviar Mensagem
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;