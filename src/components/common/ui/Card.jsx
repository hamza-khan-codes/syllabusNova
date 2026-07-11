import { cn } from "../../../lib/utills/cn";

export const Card = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        className,
      )}
      {...props}
    />
  );
};  

export const CardHeader = ({className,...props}) => {
    return (
        <div className={cn("flex flex-col space-y-1.5 p-6",className)} {...props} />
    )
}

export const CardTitle = ({className,...props}) => {
    return (
        <div className={cn("font-semibold leading-none tracking-tight",className)} {...props} />
    )
}

export const CardDiscription = ({className,...props}) => {
      return (
        <div className={cn("text-sm text-muted-foreground",className)} {...props} />
    )
}

export const CardMain = ({className,...props}) => {
    return (
        <div className={cn("flex flex-col gap-2",className)} {...props} />
    )
}

export const CardFooter = ({className,...props}) => {
    return (
        <div className={cn("flex items-center p-6 pt-0",className)} {...props} />
    )
}
