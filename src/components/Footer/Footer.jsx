import React from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { Link } from "react-router-dom";
import FooterImg from "../../assets/footer.jpg";
import instituto_criativo_logo from "../../assets/instituto_criativo_logo.png";

const FooterBg = {
  backgroundImage: `url(${FooterImg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "bottom center",
};

const Footer = () => {
  return (
    <div style={FooterBg} className="rounded-t-3xl">
      <div className="bg-primary/5">
        <div className="container">
          <div className="grid md:grid-cols-4 md:gap-4 py-5 border-t-2 border-gray-300/10 text-black">
            {/* brand info section */}
            <div className="py-8 px-4 space-y-4">
              <div className="text-2xl flex items-center gap-2 font-bold">
                <img
                  src={instituto_criativo_logo}
                  alt="Instituto Criativo Logo"
                  className="w-10 h-10"
                />
                <p>Instituto Criativo</p>
              </div>
              <p>
                O Instituto Criativo é uma ONG que nasceu para transformar a vida das pessoas.
              </p>
              <div className="flex items-center justify-start gap-5 !mt-6">
                <a
                  href="https://www.google.com/maps/place/Instituto+Criativo"
                  className="hover:text-secondary duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HiLocationMarker className="text-3xl" />
                </a>
                <a
                  href="https://www.instagram.com/institutocriativo/"
                  className="hover:text-secondary duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-3xl" />
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=5511910747492&text=Quero%20falar%20sobre%20o%20Instituto%20Criativo"
                  className="hover:text-secondary duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="text-3xl" />
                </a>
                <a
                  href="https://www.linkedin.com/company/institutocriativo/"
                  className="hover:text-secondary duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="text-3xl" />
                </a>
              </div>
            </div>

            {/* Footer Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 md:ml-14">
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-5">
                  Links Úteis
                </h1>
                <ul className="flex flex-col gap-3">
                  <li>
                    <Link to="/" className="hover:text-secondary duration-200">
                      Início
                    </Link>
                  </li>
                  <li>
                    <Link to="/sobre" className="hover:text-secondary duration-200">
                      Sobre
                    </Link>
                  </li>
                  <li>
                    <Link to="/servicos" className="hover:text-secondary duration-200">
                      Serviços
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth" className="hover:text-secondary duration-200">
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-5">
                  Segmentos
                </h1>
                <ul className="flex flex-col gap-3">
                  <li>
                    <Link to="/aprendizado" className="hover:text-secondary duration-200">
                      Aprendizado
                    </Link>
                  </li>
                  <li>
                    <Link to="/primeiro-emprego" className="hover:text-secondary duration-200">
                      Primeiro Emprego
                    </Link>
                  </li>
                  <li>
                    <Link to="/recolocacao" className="hover:text-secondary duration-200">
                      Recolocação
                    </Link>
                  </li>
                  <li>
                    <Link to="/bem-estar" className="hover:text-secondary duration-200">
                      Bem-Estar
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-5">
                  Sobre a ONG
                </h1>
                <ul className="flex flex-col gap-3">
                  <li>
                    <Link to="/termsconditions" className="hover:text-secondary duration-200">
                      Termos e Condições
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacypolicy" className="hover:text-secondary duration-200">
                      Política de Privacidade
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="hover:text-secondary duration-200">
                      Contato
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="hover:text-secondary duration-200">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* copyright section */}
          <div className="mt-8">
            <div className="text-center py-6 border-t-2 border-gray-800/10">
              <span className="text-sm text-black/60">
                @copyright 2025 Instituto Criativo
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;