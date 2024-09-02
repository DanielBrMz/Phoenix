import React from "react";
import { cn } from "./utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Wrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "mx-auto h-full w-full max-w-screen-xl px-4 md:px-20",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Wrapper;
