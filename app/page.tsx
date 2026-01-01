import Enrol from "./enrol/enrol";
import Home from "./home/Home";
import NavBar from "./navbar/NavBar";
import Noticeboard from "./noticeboard/Noticeboard";
import Pricing from "./pricing/Pricing";
import Results from "./results/Results";
import Term from "./term/Term";
import Timetable from "./timetable/Timetable";

const App = () => {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black relative w-screen h-full">
      <NavBar>
        <Home />
        <Term />
        <Results />
        <Pricing />
        <Timetable />
        <Noticeboard />
        <Enrol />
      </NavBar>
    </div>
  );
};

export default App;
