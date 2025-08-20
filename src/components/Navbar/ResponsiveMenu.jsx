import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom"; // Adicionado useLocation
import { NavbarMenu } from "../../mockData/data.js";

const ResponsiveMenu = ({ isOpen, setIsOpen }) => {
  const [userName, setUserName] = useState("");
  const menuRef = useRef(null);
  const location = useLocation(); // Para fechar ao navegar

  // Detecta clique fora do menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  // Fecha menu ao navegar para outra página
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-full h-screen z-20 bg-primary lg:hidden"
        >
          <div className="text-xl font-semibold uppercase py-10 m-6 rounded-3xl">
            <ul className="flex flex-col justify-center items-center gap-6">
              {NavbarMenu.map((item) => (
                <li key={item.id}>
                  {item.link === "#" ? (
                    <span className="text-gray-400 opacity-50 cursor-not-allowed">
                      {item.title}
                    </span>
                  ) : (
                    <Link
                      to={item.link}
                      className="hover:text-orange-500 transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}

              {userName ? (
                <>
                  <li className="text-orange-500">Olá, {userName}!</li>
                  <li>
                    <button
                      onClick={() => {
                        localStorage.removeItem("userName");
                        setUserName("");
                      }}
                      className="text-white bg-red-500 font-semibold rounded-full px-4 py-2"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/auth" className="hover:text-orange-500 transition-colors duration-200">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth?mode=signup" className="hover:text-orange-500 transition-colors duration-200">
                      Inscreva-se
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
