function StatCard({ title, amount, icon, type = "balance" }) {
  const styles = {
    balance: "bg-[#eaf4ff] text-[#1976d2]",
    credit: "bg-emerald-50 text-emerald-600",
    debit: "bg-red-50 text-red-500",
  };

  return (
    <article className="rounded-xl border border-[#d9e8f5] bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-full text-xl ${styles[type] || styles.balance}`}>
          {icon}
        </div>
        <h4 className="font-semibold text-[#455a64]">{title}</h4>
      </div>
      <div className="mt-5">
        <h2 className="text-2xl font-bold text-[#263238]">Rs. {amount}</h2>
      </div>
    </article>
  );
}

export default StatCard;
