export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <h1 className="text-3xl font-bold mb-4">404</h1>

      <p className="text-gray-600 mb-4">
        Page was not found
      </p>

      <a
        href="/"
        className="text-emerald-600 underline"
      >
        Return to the main page
      </a>
    </div>
  );
}