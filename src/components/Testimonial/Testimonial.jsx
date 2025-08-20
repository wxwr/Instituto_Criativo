import React from "react";
import Slider from "react-slick";

const TestimonialsData = [
  {
    id: 1,
    name: "João Silva",
    text: "A plataforma é incrível! Aprendi muito e recomendo para todos que querem evoluir profissionalmente.",
    img: "https://picsum.photos/101/101",
    delay: 0.2,
  },
  {
    id: 2,
    name: "Carlos Souza",
    text: "Os cursos são bem estruturados e os professores são muito experientes. Vale cada minuto investido!",
    img: "https://picsum.photos/102/102",
    delay: 0.5,
  },
  {
    id: 3,
    name: "Cristina",
    text: "Adorei a flexibilidade de poder estudar no meu próprio ritmo. A plataforma é muito intuitiva.",
    img: "https://picsum.photos/104/104",
    delay: 0.8,
  },
  {
    id: 4,
    name: "Ariana",
    text: "A experiência foi transformadora. Consegui aplicar os conhecimentos no meu trabalho imediatamente.",
    img: "https://picsum.photos/103/103",
    delay: 1.1,
  },
];

const Testimonial = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-14 mb-10">
      <div className="container">
        {/* Seção do cabeçalho */}
        <div className="space-y-4 p-6 text-center max-w-[600px] mx-auto mb-6">
          <h1 className="uppercase font-semibold text-orange-600">
            NOSSOS DEPOIMENTOS
          </h1>
          <p className="font-semibold text-3xl text-wrap">
            O Que Nossos Alunos Dizem Sobre Nós
          </p>
        </div>

        {/* Seção dos cards de depoimentos */}
        <div>
          <Slider {...settings}>
            {TestimonialsData.map((testimonial) => (
              <div key={testimonial.id}>
                <div className="flex flex-col gap-4 p-8 shadow-lg mx-4 rounded-xl bg-secondary/10">
                  {/* Seção superior */}
                  <div className="flex justify-start items-center gap-5">
                    <img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <p className="text-xl font-bold text-black/80">
                        {testimonial.name}
                      </p>
                      <p>{testimonial.name}</p>
                    </div>
                  </div>

                  {/* Seção inferior */}
                  <div className="py-6 space-y-4">
                    <p className="text-sm text-gray-500">{testimonial.text}</p>
                    <p>⭐⭐⭐⭐⭐</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;