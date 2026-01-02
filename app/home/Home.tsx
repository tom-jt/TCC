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
        <h1>Target Coaching College</h1>
      </div>
    </div>
  );
};

export default Home;
