import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between">
      <h1 className="font-bold text-xl">EcoMonitor</h1>
      <div className="space-x-4 font-bold">
        <Link href="/">Home</Link>
        <Link href="/stations?page=1">Stations</Link>
        <Link href="/pollutants">Pollutants</Link>
        <Link href="/about">About</Link>
      </div>
    </nav>
  );
}