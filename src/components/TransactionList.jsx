function TransactionList({ transactions = [] }) {
  return (
    <section id="historySection" className="py-2">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#263238]">Transaction History</h2>
        <p className="mt-1 text-sm text-[#607d8b]">View all your debit and credit transactions.</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#d9e8f5] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#eaf4ff] text-[#455a64]">
              <tr>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Description</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-5 py-10 text-center text-[#90a4ae]">No Transactions Found</td>
                </tr>
              ) : (
                transactions.map((transaction, index) => (
                  <tr key={index} className="border-t border-[#eef4f8]">
                    <td className="px-5 py-4">{transaction.date}</td>
                    <td className="px-5 py-4">{transaction.description}</td>
                    <td className={`px-5 py-4 font-semibold ${transaction.type === "credit" ? "text-emerald-600" : "text-red-500"}`}>{transaction.type}</td>
                    <td className="px-5 py-4">Rs. {Number(transaction.amount).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default TransactionList;
