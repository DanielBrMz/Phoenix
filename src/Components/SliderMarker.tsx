interface MarksProps {
  min: number;
  max: number;
  step: number;
}

const SliderMarker = ({ min, max, step }: MarksProps) => {
  const marks = [];
  for (let i = min; i < max; i += step) {
    marks.push(<div key={i} className="mark w-[1px] h-[1rem] bg-white" />);
  }
  return <div className="flex flex-row justify-between h-[0.5rem] w-full mt-[0.1rem]">{marks}</div>;
};

export default SliderMarker;