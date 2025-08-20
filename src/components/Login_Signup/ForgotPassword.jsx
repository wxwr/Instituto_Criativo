import React, { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;

      setMensagem("Link de redefinição enviado para seu e-mail!");
    } catch (error) {
      setMensagem(error.message || "Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 to-orange-600 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-8"
      >
        <h2 className="text-2xl font-bold text-center">Esqueci a Senha</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-orange-500 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-orange-600'
            }`}
          >
            {loading ? 'Enviando...' : 'Enviar Link de Redefinição'}
          </button>
        </form>
        {mensagem && (
          <p className={`text-center text-sm ${
            mensagem.includes('sucesso') ? 'text-green-600' : 'text-red-600'
          }`}>
            {mensagem}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;