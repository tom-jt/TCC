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
    <div className="bg-zinc-50 font-sans dark:bg-black relative w-screen">
      <NavBar className="relative flex flex-col w-full items-center">
        <Home />
        <div className="relative bg-zinc-50 dark:bg-black flex justify-center w-full">
          {/* <Particles className="w-1/6" refresh /> */}
          <div
            className={`z-10 flex flex-col items-center w-2/3 ${styles.navbarContainer}`}
          >
            <Noticeboard />
            <Classes />
            <Holiday />
            <Results />
            <Contact />
            <Enrol />
          </div>
          {/* <Particles className="w-1/6" refresh /> */}
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
