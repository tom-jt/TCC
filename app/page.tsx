import Contact from "./contact/Contact";
import Enrol from "./enrol/Enrol";
import Home from "./home/Home";
import NavBar from "./navbar/NavBar";
import Noticeboard from "./noticeboard/Noticeboard";
import Pricing from "./pricing/Pricing";
import Results from "./results/Results";
import Classes from "./classes/Classes";
import Timetable from "./timetable/Timetable";
import Holiday from "./holiday/Holiday";
import styles from "./page.module.css";

const App = () => {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black relative w-screen h-full">
      {/* A top padding is applied instead of gap for onClick navigation */}
      <Home />
      <NavBar className={`flex flex-col ${styles.navbar}`}>
        <Noticeboard />
        <Classes />
        <Holiday />
        <Results />
        <Pricing />
        <Timetable />
        <Contact />
        <Enrol />
      </NavBar>
    </div>
  );
};

export default App;
