import Contact from "./contact/Contact";
import Enrol from "./enrol/Enrol";
import Home from "./home/Home";
import NavBar from "./navbar/NavBar";
import Noticeboard from "./noticeboard/Noticeboard";
import Results from "./results/Results";
import Classes from "./classes/Classes";
import Holiday from "./holiday/Holiday";
import styles from "./page.module.css";
import { Particles } from "@/components/ui/particles";

const App = () => {
  return (
    <div className="font-sans relative w-full">
      <NavBar className="relative w-full">
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

          {/* Footer */}
          <Contact />

          {/* Particles */}
          <Particles
            className="absolute inset-0"
            quantity={500}
            color="#ffffff"
            vx={0.1}
            vy={0.2}
            refresh
          />
          <Particles
            className="absolute inset-0"
            quantity={500}
            color="#000000"
            vx={0.1}
            vy={0.2}
            refresh
          />
        </div>
      </NavBar>
    </div>
  );
};

export default App;
