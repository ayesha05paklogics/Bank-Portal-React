function TransactionItem({ transaction }) {
  if (!transaction) return null;

  return (
    <div className="flex items-center justify-between border-b border-[#eef4f8] px-4 py-3 last:border-0">
      <div>
        <p className="font-medium text-[#263238]">{transaction.description}</p>
        <p className="text-xs text-[#90a4ae]">{transaction.date}</p>
      </div>
      <p className={`font-semibold ${transaction.type === "credit" ? "text-emerald-600" : "text-red-500"}`}>
        {transaction.type === "credit" ? "+" : "-"} Rs. {Number(transaction.amount).toLocaleString()}
      </p>
    </div>
  );
}

export default TransactionItem;
