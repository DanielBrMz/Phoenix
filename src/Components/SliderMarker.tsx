interface MarksProps {
  min: number;
  max: number;
  step: number;
}

const SliderMarker = ({ min, max, step }: MarksProps) => {
  const marks = [];
  for (let i = min; i < max; i += step) {
    marks.push(<div key={i} className="mark h-[1rem] w-[1px] bg-white" />);
  }
  return (
    <div className="mt-[0.1rem] flex h-[0.5rem] w-full flex-row justify-between">
      {marks}
    </div>
  );
};

export default SliderMarker;
