import React from "react";

const TermsConditions = () => {
    return (
        <div className="container min-h-[650px] relative py-14">
            {/* Texto de fundo */}
            <div className="absolute inset-0 flex justify-center items-center">
                <h1 className="text-[100px] md:text-[150px] lg:text-[150px] font-bold text-gray-300 opacity-20 text-center -z-10">
                    Termos e Condições
                </h1>
            </div>

            {/* Conteúdo principal */}
            <div className="relative z-10">
                <h1 className="text-5xl font-semibold lg:text-6xl !leading-tight text-center md:text-left">
                    Termos e <span className="text-primary">Condições</span>
                </h1>

                {/* Texto dos Termos e Condições */}
                <div className="mt-12 space-y-6 max-w-2xl mx-auto">
                    <p className="text-gray-700">
                        Bem-vindo ao Instituto Criativo! Ao acessar e utilizar nossos serviços, você concorda com os seguintes termos e condições:
                    </p>
                    <ul className="list-disc list-inside space-y-4">
                        <li>Você concorda em usar nossos serviços apenas para fins legais.</li>
                        <li>Não é permitido copiar, distribuir ou modificar qualquer conteúdo sem autorização.</li>
                        <li>Reservamo-nos o direito de encerrar contas que violem nossos termos.</li>
                    </ul>
                    <p className="text-gray-700">
                        Para mais informações, entre em contato conosco através do e-mail suporte@institutocriativo.com.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsConditions;
