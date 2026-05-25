const Results = () => {
  return (
    <div className="relative" id="results">
      <div className="flex flex-col justify-between gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg md:text-4xl max-w-4xl">
            Our Students' Results
          </h2>
          <h3 className="text-md md:text-lg italic">
            HSC results of our students for ????
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg md:text-2xl max-w-4xl">State Ranks</h3>
          <div className="grid grid-cols-3 gap-x-48 gap-y-4">
            <Result name="John D" result="14th for 2U Maths" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg md:text-2xl max-w-4xl">ATAR</h3>
          <div className="grid grid-cols-3 gap-x-48 gap-y-4">
            <Result name="John D" result="10" />
            <Result name="John D" result="10" />
            <Result name="John D" result="10" />
            <Result name="John D" result="10" />
            <Result name="John D" result="10" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg md:text-2xl max-w-4xl">
            Extension 2 Maths (4U) Results
          </h3>
          <div className="grid grid-cols-3 gap-x-48 gap-y-4">
            <Result name="John D" result="10" />
            <Result name="John D" result="10" />
            <Result name="John D" result="10" />
            <Result name="John D" result="10" />
            <Result name="John D" result="10" />
            <Result name="John D" result="10" />
            <Result name="John D" result="10" />
            <Result name="John D" result="10" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg md:text-2xl max-w-4xl">
            Extension 1 Maths (3U) Results
          </h3>
          <div className="grid grid-cols-3 gap-x-48 gap-y-4">
            <Result name="John D" result="10" />
            <Result name="John D" result="10" />
            <Result name="John D" result="10" />
            <Result name="John D" result="10" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg md:text-2xl max-w-4xl">
            Advanced Maths (2U) Results
          </h3>
          <div className="grid grid-cols-3 gap-x-48 gap-y-4">
            <Result name="John D" result="10" />
            <Result name="John D" result="10" />
            <Result name="John D" result="10" />
            <Result name="John D" result="10" />
            <Result name="John D" result="10" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Result = ({ name, result }: { name: string; result: string }) => {
  return (
    <div className="flex justify-between">
      <p>{name}</p>
      <p>{result}</p>
    </div>
  );
};

export default Results;
