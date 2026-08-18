function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-[10px] border border-[#d9e8f5] bg-[#f7fafe] p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-[#90caf9] hover:bg-[#eaf4ff] hover:shadow-[0_8px_20px_rgba(25,118,210,0.1)]">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#dceeff] text-2xl">
        {icon || "✓"}
      </div>
      <h3 className="mb-2 text-lg font-bold text-[#1976d2]">{title}</h3>
      <p className="text-sm text-[#607d8b]">{description}</p>
    </div>
  );
}

export default FeatureCard;
