import React from "react";
import CountUp from "react-countup";

const NumberCounter = () => {
  return (
    <div className="bg-secondary text-white py-12">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { end: 100, text: "Projetos Criativos" },
          { end: 2500, text: "Educadores e <br/> Pais desenvolvidos", suffix: "+" },
          { end: 20000, text: "Estudantes impactados" },
          { end: 30000, text: "Pessoas alcançadas", suffix: "+" }
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center text-center">
            <p className="text-3xl font-semibold">
              <CountUp
                start={0}
                end={item.end}
                duration={3}
                enableScrollSpy={true}
                scrollSpyOnce={true}
                separator={item.separator}
                suffix={item.suffix}
              />
            </p>
            <p dangerouslySetInnerHTML={{ __html: item.text }}></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumberCounter;
