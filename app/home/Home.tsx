import { AuroraBackground } from "@/components/ui/aurora-background";
import content from "@/data/general.json";
import type { GeneralContent } from "@/data/types";

const general: GeneralContent = content;

const Home = () => {
  return (
    <div className="relative w-full h-screen" id="home">
      <AuroraBackground>
        <div className="flex flex-col text-center gap-4">
          <h1 className="text-2xl/tight lg:text-7xl/tight">
            Target Coaching College
            <br />
            高老师补习学校
          </h1>
          <p className="text-md lg:text-3xl text-neutral-800 dark:text-neutral-200">
            {general.heroTagline}
          </p>
        </div>
      </AuroraBackground>
    </div>
  );
};

export default Home;
