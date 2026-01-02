import { Calendar, Clock } from "lucide-react";

const ClassArrangementBlock = () => {
  return (
    <div className="relative">
      <p className="mb-4 text-sm font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
        <Clock /> 1.5-hour lesson / week
      </p>
      <Calendar />
    </div>
  );
};

export default ClassArrangementBlock;
