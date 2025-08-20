import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SlideRight } from "../../utility/animation";
import validator from "validator";
import { supabase } from "../../../lib/supabaseClient";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get("mode") === "signup";
  const [isLogin, setIsLogin] = useState(!isSignUp);
  const navigate = useNavigate();

  // Estados para os campos do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [tipo, setTipo] = useState("pessoa_fisica");
  const [erro, setErro] = useState("");
  const [tentativasLogin, setTentativasLogin] = useState(0);
  const [loading, setLoading] = useState(false);

  // Funções de validação
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarSenha = (senha) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(senha);
  };

  const validarNome = (nome) => {
    const regex = /^[A-Za-zÀ-ú\s]+$/;
    return regex.test(nome);
  };

  // Função de Cadastro com Supabase - Corrigida
  const handleSignUp = async () => {
    try {
      setLoading(true);
      setErro("");

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: validator.normalizeEmail(email),
        password: senha,
        options: {
          data: {
            full_name: nome,
            user_type: tipo,
            avatar_url: ''
          }
        }
      });

      if (authError) throw authError;

      // Criar perfil automaticamente após cadastro
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            full_name: nome,
            user_type: tipo,
            avatar_url: '',
            updated_at: new Date().toISOString()
          });

        if (profileError) {
          console.warn('Erro ao criar perfil:', profileError);
        }
      }

      alert('Cadastro realizado com sucesso! Verifique seu email para confirmação.');
      setIsLogin(true);
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setErro(error.message || 'Erro ao cadastrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Função de Login com Supabase - CORRIGIDA
  const handleLogin = async () => {
    try {
      setLoading(true);
      setErro("");

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: validator.normalizeEmail(email),
        password: senha
      });

      if (authError) throw authError;

      let userType = tipo;
      let userName = authData.user.user_metadata?.full_name || '';

      // Tentar obter perfil com tratamento de erro melhorado
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('full_name, user_type')
          .eq('id', authData.user.id)
          .maybeSingle(); // Use maybeSingle em vez de single

        if (profileError) {
          console.warn('Erro ao buscar perfil:', profileError);
          // Se não encontrar perfil, criar um
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: authData.user.id,
              full_name: userName,
              user_type: tipo,
              avatar_url: '',
              updated_at: new Date().toISOString()
            });

          if (insertError) {
            console.warn('Erro ao criar perfil:', insertError);
          }
        } else if (profileData) {
          userType = profileData.user_type || tipo;
          userName = profileData.full_name || userName;
        }
      } catch (profileError) {
        console.warn('Erro no acesso ao perfil:', profileError);
      }

      // Armazenar informações do usuário
      localStorage.setItem('userName', userName);
      localStorage.setItem('userType', userType);
      localStorage.setItem('userId', authData.user.id);
      localStorage.setItem('token', authData.session.access_token);
      
      navigate('/');
    } catch (error) {
      console.error('Erro no login:', error);
      setErro(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
      setTentativasLogin(tentativasLogin + 1);
      
      if (tentativasLogin >= 2) {
        setErro('Muitas tentativas falhas. Esqueceu sua senha?');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações
    if (!isLogin && senha !== confirmarSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    if (!validarEmail(email)) {
      setErro("E-mail inválido.");
      return;
    }

    if (!validarSenha(senha)) {
      setErro("A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.");
      return;
    }

    if (!isLogin && !validarNome(nome)) {
      setErro("O nome não pode conter números ou caracteres especiais.");
      return;
    }

    try {
      if (isLogin) {
        await handleLogin();
      } else {
        await handleSignUp();
      }
    } catch (error) {
      console.error('Erro:', error);
      setErro(error.message || 'Ocorreu um erro. Tente novamente.');
    }
  };

  return (
    <div className="container min-h-[650px] relative py-14">
      {/* Conteúdo principal */}
      <div className="relative z-10">
        <motion.h1
          variants={SlideRight(0.4)}
          initial="hidden"
          animate="visible"
          className="text-5xl font-semibold lg:text-6xl !leading-tight text-center md:text-left"
        >
          {isLogin ? "Faça Login" : "Crie sua Conta"}
        </motion.h1>

        {/* Formulário */}
        <motion.form
          variants={SlideRight(1.0)}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 max-w-md mx-auto"
        >
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Nome Completo</label>
              <input
                type="text"
                placeholder="Seu Nome Completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Senha</label>
            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {mostrarSenha ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Confirme a Senha</label>
              <div className="relative">
                <input
                  type={mostrarConfirmarSenha ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {mostrarConfirmarSenha ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Tipo de Usuário</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option value="pessoa_fisica">Pessoa Física</option>
              <option value="colaborador">Colaborador</option>
              <option value="voluntario">Voluntário</option>
              <option value="desenvolvedor">Desenvolvedor</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-yellow-400 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-yellow-300'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando...
                </span>
              ) : isLogin ? (
                "Entrar"
              ) : (
                "Criar Conta"
              )}
            </button>
          </div>
          
          {erro && (
            <div className="text-center text-red-600 text-sm mt-4 p-3 bg-red-50 rounded-lg">
              {erro}
            </div>
          )}
          
          <div className="text-center text-sm text-gray-600">
            {isLogin ? (
              <>
                <p className="mb-2">
                  Não tem uma conta?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-yellow-600 font-medium hover:underline"
                  >
                    Cadastre-se
                  </button>
                </p>
                <p>
                  Esqueceu a senha?{' '}
                  <a 
                    href="/forgotpassword" 
                    className="text-yellow-600 font-medium hover:underline"
                  >
                    Redefinir senha
                  </a>
                </p>
              </>
            ) : (
              <p>
                Já tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-yellow-600 font-medium hover:underline"
                >
                  Faça login
                </button>
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Auth;