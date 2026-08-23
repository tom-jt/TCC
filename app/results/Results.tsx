import content from "@/data/results.json";
import type { ResultsContent, StudentResult } from "@/data/types";

const results: ResultsContent = content;

const Results = () => {
  const categories = [
    { heading: "State Ranks", entries: results.stateRanks, columns: 2 },
    { heading: "ATAR", entries: results.atar, columns: 3 },
    {
      heading: "Extension 2 Maths (4U) Results",
      entries: results.extension2,
      columns: 3,
    },
    {
      heading: "Extension 1 Maths (3U) Results",
      entries: results.extension1,
      columns: 3,
    },
    {
      heading: "Advanced Maths (2U) Results",
      entries: results.advanced2,
      columns: 3,
    },
  ];

  return (
    <div className="relative" id="results">
      <div className="flex flex-col justify-between gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg md:text-4xl max-w-4xl">
            Our Students&apos; Results
          </h2>
          <h3 className="text-md md:text-lg italic">{results.subheading}</h3>
        </div>

        {categories
          .filter((category) => category.entries.length > 0)
          .map((category) => (
            <div key={category.heading} className="flex flex-col gap-4">
              <h3 className="text-lg md:text-2xl max-w-4xl">
                {category.heading}
              </h3>
              <div
                className={
                  category.columns === 2
                    ? "grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-12 lg:gap-x-16 gap-y-3"
                    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 sm:gap-x-12 lg:gap-x-16 gap-y-3"
                }
              >
                {category.entries.map((entry, index) => (
                  <Result key={index} {...entry} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const Result = ({ name, result }: StudentResult) => {
  return (
    <div className="flex items-baseline gap-2">
      <p className="shrink-0">{name}</p>
      {/* Dotted leader ties the name to its mark across the column. */}
      <span
        aria-hidden
        className="flex-1 border-b border-dotted border-neutral-300 dark:border-neutral-700"
      />
      <p className="shrink-0">{result}</p>
    </div>
  );
};

export default Results;
