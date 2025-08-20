import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavbarMenu } from "../../mockData/data.js";
import { MdMenu } from "react-icons/md";
import { motion } from "framer-motion";
import ResponsiveMenu from "./ResponsiveMenu.jsx";
import instituto_criativo_logo from "../../assets/instituto_criativo_logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");

  // Verifica se há um nome de usuário no localStorage ao carregar o componente
  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="container flex justify-between items-center py-6">
          {/* Logo section */}
          <div className="text-2xl flex items-center gap-2 font-bold">
            <Link to="/">
              <img
                src={instituto_criativo_logo}
                alt="Instituto Criativo Logo"
                className="w-10 h-10"
              />
            </Link>
            <Link to="/">
              <p>Instituto Criativo</p>
            </Link>
          </div>

          {/* Menu section */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {NavbarMenu.map((item) => (
                <li key={item.id}>
                  {item.link === "#" ? (
                    <span className="inline-block text-gray-400 text-sm xl:text-base py-1 px-2 xl:px-3 font-semibold cursor-not-allowed opacity-50">
                      {item.title}
                    </span>
                  ) : (
                    <Link
                      to={item.link}
                      className="inline-block text-gray-600 text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-secondary transition-all duration-300 font-semibold"
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button section */}
          <div className="hidden lg:block space-x-6">
            {userName ? (
              <div className="flex items-center gap-4">
                <span className="text-secondary font-semibold">
                  Olá, {userName}!
                </span>
                <button
                  onClick={() => {
                    localStorage.removeItem("userName");
                    setUserName(""); // Limpa o estado
                    window.location.reload(); // Recarrega a página (opcional)
                  }}
                  className="text-white bg-red-500 font-semibold rounded-full px-4 py-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/auth">
                  <button className="font-semibold">Login</button>
                </Link>
                <Link to="/auth?mode=signup">
                  <button className="text-white bg-secondary font-semibold rounded-full px-6 py-2">
                    Inscreva-se
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            <MdMenu className="text-4xl" />
          </div>
        </div>
      </motion.div>

      {/* Mobile Sidebar section */}
      <ResponsiveMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;
