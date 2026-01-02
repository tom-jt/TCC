import ColorBends from "@/components/ColorBends";

const Home = () => {
  return (
    <div className="relative h-screen" id="home">
      <ColorBends
        colors={["#147A00", "#00517A", "#66007A", "#7A2900"]}
        rotation={0}
        speed={0.2}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        parallax={0.5}
        noise={0.1}
        transparent
      />

      <div className="absolute top-0 w-full h-full flex items-center justify-center pointer-events-none">
        <div className="flex flex-col text-center gap-4">
          <h1 className="text-7xl/tight">
            Target Coaching College
            <br />
            高老师补习学校
          </h1>
          <h2 className="text-3xl">
            High School Mathematics Specialists @<em> Epping</em>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
