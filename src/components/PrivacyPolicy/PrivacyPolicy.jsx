import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container min-h-[650px] relative py-14">
      {/* Texto de fundo */}
      <div className="absolute inset-0 flex justify-center items-center">
        <h1 className="text-[100px] md:text-[150px] lg:text-[150px] font-bold text-gray-300 opacity-20 text-center -z-10">
          Política de Privacidade
        </h1>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10">
        <h1 className="text-5xl font-semibold lg:text-6xl !leading-tight text-center md:text-left">
          Política de <span className="text-primary">Privacidade</span>
        </h1>

        {/* Texto da Política de Privacidade */}
        <div className="mt-12 space-y-6 max-w-2xl mx-auto">
          <p className="text-gray-700">
            No Instituto Criativo, levamos a privacidade dos nossos usuários muito a sério. Esta política descreve como coletamos, usamos e protegemos suas informações:
          </p>
          <ul className="list-disc list-inside space-y-4">
            <li>Coletamos informações como nome, e-mail e dados de uso para melhorar nossos serviços.</li>
            <li>Não compartilhamos suas informações com terceiros sem sua autorização.</li>
            <li>Utilizamos medidas de segurança para proteger seus dados contra acesso não autorizado.</li>
          </ul>
          <p className="text-gray-700">
            Para mais detalhes, entre em contato conosco através do e-mail suporte@institutocriativo.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
