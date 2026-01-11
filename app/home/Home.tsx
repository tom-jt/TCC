import ColorBends from "@/components/ColorBends";
import Orb from "@/components/Orb";
import Prism from "@/components/Prism";
import { AuroraBackground } from "@/components/ui/aurora-background";

const Home = () => {
  return (
    <div className="relative w-full h-screen" id="home">
      {/* <Prism
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
      /> */}

      {/* <ColorBends
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
      /> */}

      {/* <Orb
        hoverIntensity={5}
        rotateOnHover={false}
        hue={0}
        forceHoverState={true}
      /> */}

      <AuroraBackground>
        <div className="flex flex-col text-center gap-4 text-black dark:text-zinc-50">
          <h1 className="text-7xl/tight">
            Target Coaching College
            <br />
            高老师补习学校
          </h1>
          <h2 className="text-3xl">
            High School Mathematics Specialists @<em> Epping</em>
          </h2>
        </div>
      </AuroraBackground>
    </div>
  );
};

export default Home;
