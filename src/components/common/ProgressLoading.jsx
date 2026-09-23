import { useState } from "react";
import { Dialog } from "../ui/dialog";
import { DialogContent } from "../ui/dialog";
import { RocketIcon, Sparkles } from "lucide-react";

export default function ProgressLoading({
  Description = {
    title: "Title",
    message: "Message",
  },
  progressLoad = 0,
  Loading = true,
  setLoading,
  cross
}) {
  const cx = 48;
  const cy = 48;
  const r = 44;

  const circumference = 2 * Math.PI * r;

  const variablecircumference = 276.48 * ((100 - progressLoad) / 100);


  return (
    <>
      <Dialog open={Loading} onOpenChange={setLoading} >
        <DialogContent
          showCloseButton={cross}
          className={`flex justify-center p-6 max-w-[90%] sm:max-w-[50%] py-8`}
        >
          <div className="relative flex flex-col items-center text-center">
            {/* Circular Progress with Rocket */}
            <div
              className="relative w-24 h-24 mb-8"
              data-purpose="circular-loader"
            >
              {/* Outer Circle Track */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx={cx}
                  cy={cy}
                  fill="transparent"
                  r={r}
                  stroke="#1e293b"
                  strokeWidth={6}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  fill="transparent"
                  id="circularProgress"
                  r={r}
                  stroke={`${progressLoad === 100 ? "var(--success)" : "var(--primary)"}`}
                  strokeDasharray={circumference}
                  strokeDashoffset={variablecircumference}
                  strokeLinecap="round"
                  strokeWidth={6}
                  style={{ transition: "stroke-dashoffset 0.3s ease-in-out" }}
                />
              </svg>
              {/* Rocket Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <RocketIcon
                  size={30}
                  className={`${progressLoad === 100 ? "text-success" : "text-primary "} animate-pulse`}
                />
              </div>
            </div>
            <h2
              className="text-3xl font-bold mb-3 tracking-tight"
              id="modalHeading"
            >
              {Description?.title}
            </h2>
            <p
              className="text-muted-foreground text-base mb-10"
              id="modalSubtext"
            >
              {Description?.message}
            </p>
            {/* Linear Progress Bar */}
            <div
              className="w-full max-w-xs mb-4"
              data-purpose="progress-bar-container"
            >
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${progressLoad === 100 ? "bg-success" : "bg-primary"} rounded-full  transition-all`}
                  id="linearProgressBar"
                  style={{ width: `${progressLoad}%` }}
                />
              </div>
              <p
                className={`${progressLoad === 100 ? "text-success" : "text-primary"} font-bold text-xl mt-4`}
              >
                {Math.floor(progressLoad)}%
              </p>
            </div>
            {/* Status Hint */}
            <div className="flex items-center gap-2 text-muted text-sm mt-4">
              <Sparkles
                size={15}
                className={`${progressLoad === 100 ? "text-success" : "text-primary"}   fill-primary animate-pulse`}
              />
              <span className="text-muted-foreground ">
                This may take a few seconds
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
