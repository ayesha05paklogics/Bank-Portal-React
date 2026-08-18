function BankingServices() {
  const services = [
    "Check your account balance",
    "Add money to your account",
    "Cash out money",
    "View transaction history",
    "Manage your profile",
    "Apply for a loan",
  ];

  return (
    <section id="services" className="bg-[#eaf4ff] px-5 py-16 md:px-8 md:py-[75px]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-12 lg:flex-row lg:gap-16">
        <div className="max-w-xl text-center lg:text-left">
          <p className="mb-2 text-xs font-bold tracking-wider text-[#1976d2]">EVERYTHING YOU NEED</p>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#263238] md:text-[35px]">
            Manage Your Banking <span className="text-[#1976d2]">In One Place</span>
          </h2>
          <p className="text-base text-[#607d8b]">
            Our banking portal gives you simple tools to manage your everyday banking activities from one convenient place.
          </p>
        </div>

        <div className="grid w-full max-w-[450px] grid-cols-1 gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <div key={service} className="flex items-center gap-2.5 rounded-lg border border-[#d9e8f5] bg-white p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#dceeff] font-bold text-[#1976d2]">✓</span>
              <p className="text-sm text-[#455a64]">{service}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BankingServices;
