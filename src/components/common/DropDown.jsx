import { cn } from "@/lib/utils";
import React from "react";

export default function DropDown({ arrayOfobj ,OpClassName,seClassName}) {
  return (
    <>
      <select className={cn("w-full bg-background",seClassName)}>
        {arrayOfobj.map((e, i) => (
          <option key={i} className={cn("bg-muted text-muted-foreground",OpClassName)}>
            {e.type}
          </option>
        ))}
      </select>
    </>
  );
}
