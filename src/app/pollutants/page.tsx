export const dynamic = "force-static";

const pollutants = [
  { name: "PM2.5", description: "Fine particulate matter under 2.5 μm." },
  { name: "PM10", description: "Particulate matter under 10 μm." },
  { name: "NO₂", description: "Nitrogen dioxide, a harmful gas from combustion." },
  { name: "SO₂", description: "Sulfur dioxide, causes respiratory problems." },
  { name: "CO", description: "Carbon monoxide, poisonous gas." },
  { name: "O₃", description: "Ozone, can be harmful at ground level." },
];

export default function PollutantsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Air Pollutants Guide</h1>
      <ul className="space-y-4">
        {pollutants.map((p) => (
          <li key={p.name} className="p-4 bg-white shadow rounded">
            <h2 className="font-semibold text-xl">{p.name}</h2>
            <p className="text-gray-700">{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}