import React from "react";
import NavbarBanner from "./components/Navbar/NavbarBanner";
import Hero from "./components/Hero/Hero";
import NumberCounter from "./components/NumberCounter/NumberCounter";
import WhyChooseUs from "./components/WhyChooseUs/WhyChooseUs";
import Img1 from "./assets/banner1.png";
import Img2 from "./assets/banner2.png";
import Banner from "./components/Banner/Banner";
import SubjectCard from "./components/SubjectCard/SubjectCard";
import Testimonial from "./components/Testimonial/Testimonial";
import Footer from "./components/Footer/Footer";

const BannerData = {
  image: Img1,
  tag: "EDUCAÇÃO QUE TRANSFORMA",
  title: "Aprendizado Personalizado no Seu Ritmo",
  subtitle:
    "Oferecemos um sistema de ensino flexível, adaptado ao seu tempo e necessidades. Com professores qualificados e uma metodologia inovadora, garantimos que você nunca perca uma aula e consiga acompanhar seu progresso de forma eficiente.",
  link: "#",
};

const BannerData2 = {
  image: Img2,
  tag: "PROFESSORES QUALIFICADOS",
  title: "Educadores Comprometidos com o Seu Sucesso",
  subtitle:
    "Nossa equipe de professores é formada por profissionais experientes e dedicados, prontos para oferecer o suporte que você precisa.",
  link: "#",
};

const Home = () => {
  return (
    <main className="overflow-x-hidden">
      <NavbarBanner />
      <Hero />
      <NumberCounter />
      <WhyChooseUs />
      <Banner {...BannerData} />
      <Banner {...BannerData2} reverse={true} />
      <SubjectCard />
      <Testimonial />
      <Footer />
    </main>
  );
};

export default Home;
