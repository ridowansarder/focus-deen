import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4 text-center">
      <h1 className="text-6xl font-extrabold sm:text-7xl">404</h1>
      <h2 className="mt-4 text-2xl sm:text-3xl font-semibold">
        Oops! Page not found
      </h2>
      <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
