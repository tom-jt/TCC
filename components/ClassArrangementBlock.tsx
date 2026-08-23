import { Calendar, Clock } from "lucide-react";

interface ClassArrangementBlockProps {
  lessonDuration: string;
  schedule: string[];
}

const ClassArrangementBlock = ({
  lessonDuration,
  schedule,
}: ClassArrangementBlockProps) => {
  return (
    <div className="relative flex flex-col *:*:inline *:*:mr-2 font-normal text-neutral-800 text-sm md:text-lg dark:text-neutral-200">
      <div>
        <Clock />
        {lessonDuration}
      </div>

      <br />

      {schedule.map((slot, index) => (
        <div key={index}>
          <Calendar />
          {slot}
        </div>
      ))}
    </div>
  );
};

export default ClassArrangementBlock;
