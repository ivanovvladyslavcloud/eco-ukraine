export default function NoData({ text }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
      <p className="text-lg font-medium">
        {text || "No data available"}
      </p>
      <p className="text-sm">
        Try selecting another station or period
      </p>
    </div>
  );
}