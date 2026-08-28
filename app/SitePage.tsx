import Contact from "./contact/Contact";
import Enrol from "./enrol/Enrol";
import Home from "./home/Home";
import NavBar from "./navbar/NavBar";
import Noticeboard from "./noticeboard/Noticeboard";
import Results from "./results/Results";
import Classes from "./classes/Classes";
import Holiday from "./holiday/Holiday";
import styles from "./page.module.css";
import AmbientBackground from "@/components/ui/ambient-background";
import SectionRouting from "@/components/SectionRouting";

interface SitePageProps {
  /**
   * Section this route is the entry point for. Every route renders this same
   * page; the difference is which section it opens on and what metadata it
   * carries. See lib/sections.ts.
   */
  section?: string;
}

const SitePage = ({ section }: SitePageProps) => {
  return (
    <div className="font-sans relative w-full">
      <NavBar className="relative w-full">
        <main>
          <Home />
          <div className="relative bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center w-full">
            <div
              className={`z-10 flex flex-col items-center xl:w-2/3 w-5/6 ${styles.navbarContainer}`}
            >
              <Noticeboard />
              <Classes />
              <Holiday />
              <Results />
              <Enrol />
            </div>

            <AmbientBackground />
          </div>
        </main>

        <Contact />
      </NavBar>

      <SectionRouting initialSection={section} />
    </div>
  );
};

export default SitePage;
