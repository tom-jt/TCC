import { GridFieldBackground } from "@/components/ui/grid-field-background";
import HeroActions from "@/components/HeroActions";
import HoloText from "@/components/HoloText";
import ScrollCue from "@/components/ScrollCue";
import content from "@/data/general.json";
import type { GeneralContent } from "@/data/types";

const general: GeneralContent = content;

const Home = () => {
  return (
    // 100dvh rather than 100vh: on mobile browsers the URL bar collapses as you
    // scroll, and vh doesn't account for it, so the hero jumped and clipped.
    <section
      className="relative w-full min-h-dvh flex"
      id="home"
      data-section
      tabIndex={-1}
      aria-label="Target Coaching College"
    >
      <GridFieldBackground>
        <div className="relative flex flex-col text-center items-center gap-6 px-6">
          <h1 className="text-4xl/tight sm:text-5xl/tight lg:text-7xl/tight text-balance">
            <HoloText
              lines={[
                { text: "Target Coaching College" },
                { text: "高老师补习学校", lang: "zh" },
              ]}
            />
          </h1>
          <p className="text-lg sm:text-xl lg:text-3xl text-neutral-800 dark:text-neutral-200 text-balance">
            {general.heroTagline}
          </p>

          <HeroActions />
        </div>

        {/* Outside the copy's column so it positions against the hero itself,
            and after it so it paints on top. */}
        <ScrollCue />
      </GridFieldBackground>
    </section>
  );
};

export default Home;
