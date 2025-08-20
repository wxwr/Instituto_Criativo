import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // Adicionado useNavigate


const NavbarBanner = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/contact");
  };

  return (
    isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="bg-primary text-sm text-center font-semibold p-1 hidden lg:block relative"
      >
        Você é um estudante universitário ou escola em busca de uma ong parceira?
        <Link to="/contact" className="text-secondary ml-2" onClick={handleNavigation}>
          Fale conosco
        </Link>
        <div
          className="absolute top-1/2 right-10 cursor-pointer -translate-y-1/2"
          onClick={() => setIsOpen(false)}
        >
          X
        </div>
      </motion.div>
    )
  );
};

export default NavbarBanner;