function LoanSection() {
  const loans = [
    ["💵", "Total Loan", "Rs. 2,800,000", "Overall Remaining Loan"],
    ["🏠", "Home Loan", "Rs. 2,000,000", "Remaining Amount"],
    ["✈️", "Trip Loan", "Rs. 300,000", "Remaining Amount"],
    ["🚗", "Car Loan", "Rs. 500,000", "Remaining Amount"],
  ];

  return (
    <section className="py-2" id="loanSection">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#263238]">My Loans</h2>
        <p className="mt-1 text-sm text-[#607d8b]">Overview of all active loans and remaining balances.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {loans.map(([icon, title, amount, text]) => (
          <article key={title} className="rounded-xl border border-[#d9e8f5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#eaf4ff] text-2xl">{icon}</div>
            <h3 className="font-semibold text-[#455a64]">{title}</h3>
            <h2 className="mt-2 text-2xl font-bold text-[#1976d2]">{amount}</h2>
            <p className="mt-1 text-sm text-[#607d8b]">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default LoanSection;
