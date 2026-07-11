import { cn } from "../lib/utills/cn";

export default function AuthLayout({ className, ...props }) {
  return (
    <>
      <nav>
        <h1>Navbar</h1>
      </nav>
      <main className={cn("my-2", className)} {...props} />
      <footer>footer</footer>
    </>
  );
}
