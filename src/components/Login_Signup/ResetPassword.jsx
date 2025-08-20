import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem("");

    if (novaSenha !== confirmarSenha) {
      setMensagem("As senhas não coincidem!");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: novaSenha
      });

      if (error) throw error;

      setMensagem("Senha redefinida com sucesso! Redirecionando...");
      setTimeout(() => navigate("/Auth"), 2000);
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
        <h2 className="text-2xl font-bold text-center">Redefinir Senha</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Nova Senha</label>
            <input
              type="password"
              placeholder="Nova senha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              required
              minLength="6"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Confirmar Senha</label>
            <input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              required
              minLength="6"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-orange-500 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-orange-600'
            }`}
          >
            {loading ? 'Processando...' : 'Redefinir Senha'}
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

export default ResetPassword;