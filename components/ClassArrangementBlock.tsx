import { Calendar, Clock } from "lucide-react";

const ClassArrangementBlock = () => {
  return (
    <div className="relative">
      <p className="mb-4 text-sm font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
        <span>
          <Clock /> 1.5-hour lesson / week
        </span>
        <span className="*:*:inline *:*:mr-4">
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
        </span>
      </p>
    </div>
  );
};

export default ClassArrangementBlock;
