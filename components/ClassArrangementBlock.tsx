import { Calendar, Clock } from "lucide-react";

const ClassArrangementBlock = () => {
  return (
    <div className="relative flex flex-col *:*:inline *:*:mr-2 font-normal text-neutral-800 text-sm md:text-lg dark:text-neutral-200">
      <div>
        <Clock />
        1.5-hour lesson / week
      </div>

      <br />

      <div>
        <Calendar />
        Year X | Wednesday 4pm
      </div>
      <div>
        <Calendar />
        Year X | Saturday 9am
      </div>
      <div>
        <Calendar />
        Year X | Sunday 10am
      </div>
    </div>
  );
};

export default ClassArrangementBlock;
