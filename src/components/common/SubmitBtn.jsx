import { cn } from "@/lib/utills/cn";
import Loading from "./Loading";

export default function SubmitBtn({
  isSubmitting = false,
  type = "Registering",
  disabled
}) {
  return (
    <>
      <button
        
        type="submit"
        className={cn(`${isSubmitting ? "bg-primary/10 cursor-progress" : "bg-primary cursor-pointer active:scale-95"}   w-full h-14 bg-primary text-primary-foreground rounded-2xl  text-md font-bold shadow-lg shadow-primary/20 hover:bg-primary/70 cursor-pointer active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-primary/30 disabled:scale-none transition-all duration-150`)}
        disabled={isSubmitting || disabled}
      >
        <div className="">
          <span className="mr-2">
            {isSubmitting ? (
              <Loading>
                <p className="inline ml-2">{type}</p>
              </Loading>
            ) : type.endsWith("ing") ? (
              type.replace("ing", "")
            ) : (
              type
            )}
          </span>
        </div>
      </button>
    </>
  );
}
