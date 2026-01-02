import ColorBends from "@/components/ColorBends";
import Prism from "@/components/Prism";

const Home = () => {
  return (
    <div className="relative h-screen" id="home">
      <Prism
        animationType="rotate"
        timeScale={0.5}
        height={3.5}
        baseWidth={5.5}
        scale={3.6}
        hueShift={0}
        colorFrequency={1}
        noise={0}
        glow={1}
        suspendWhenOffscreen={true}
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
