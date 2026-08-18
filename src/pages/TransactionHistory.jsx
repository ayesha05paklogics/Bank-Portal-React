import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TransactionHistory() {
  const navigate = useNavigate();

  // Logged-in user
  const [currentUser, setCurrentUser] = useState(null);

  // Transactions
  const [transactions, setTransactions] = useState([]);

  // Modal
  const [showModal, setShowModal] = useState(false);

  // Form fields
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [bank, setBank] = useState("");
  const [type, setType] = useState("");



  const banks = [
    "Meezan Bank",
    "HBL",
    "UBL",
    "MCB Bank",
    "Allied Bank",
    "Bank Alfalah",
    "Bank Al Habib",
    "Faysal Bank",
    "Askari Bank",
    "Habib Metropolitan Bank",
    "Standard Chartered Pakistan",
    "National Bank of Pakistan",
  ];



  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    setCurrentUser(loggedInUser);

    const transactionKey =
      "transactions_" + loggedInUser.email;

    const savedTransactions =
      JSON.parse(
        localStorage.getItem(transactionKey)
      ) || [];

    setTransactions(savedTransactions);
  }, [navigate]);

  

  function openTransactionModal() {
    setShowModal(true);
  }



  function closeTransactionModal() {
    setShowModal(false);

    setAmount("");
    setDescription("");
    setBank("");
    setType("");
  }

  

  function handleTransactionSubmit(e) {
    e.preventDefault();

    if (!amount.trim()) {
      alert("Please enter an amount.");
      return;
    }

    const numericAmount = Number(amount);

    if (
      Number.isNaN(numericAmount) ||
      numericAmount <= 0
    ) {
      alert(
        "Please enter a valid amount greater than 0."
      );
      return;
    }

    if (!description.trim()) {
      alert("Please enter a description.");
      return;
    }

    if (!bank) {
      alert("Please select a bank.");
      return;
    }

    if (!type) {
      alert("Please select transaction type.");
      return;
    }


    let currentBalance = 0;

    transactions.forEach((transaction) => {
      const transactionAmount =
        Number(transaction.amount) || 0;

      if (transaction.type === "credit") {
        currentBalance += transactionAmount;
      }

      if (transaction.type === "debit") {
        currentBalance -= transactionAmount;
      }
    });


    if (
      type === "debit" &&
      numericAmount > currentBalance
    ) {
      alert("Balance is not sufficient.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      description:
        description.trim(),
      amount: numericAmount,
      bank: bank,
      type: type,
    };

    const updatedTransactions = [
      ...transactions,
      newTransaction,
    ];

    setTransactions(updatedTransactions);

    // Save for current user
    if (currentUser) {
      const transactionKey =
        "transactions_" + currentUser.email;

      localStorage.setItem(
        transactionKey,
        JSON.stringify(
          updatedTransactions
        )
      );
    }

    closeTransactionModal();
  }

  function handleLogout() {
    localStorage.removeItem(
      "loggedInUser"
    );

    navigate("/login");
  }



  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f9ff]">

      {/*HEADER */}

      <header className="border-b border-[#d9e8f5] bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">

          <div>

            <h1 className="text-2xl font-bold text-[#263238] sm:text-3xl">
              Transaction History
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              View and manage your debit and credit transactions.
            </p>

          </div>

        </div>

      </header>

      {/* MAIN */}

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        {/* Top Actions */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="text-xl font-bold text-[#263238]">
              All Transactions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {transactions.length} transaction
              {transactions.length !== 1
                ? "s"
                : ""}
            </p>

          </div>

          <button
            type="button"
            onClick={openTransactionModal}
            className="rounded-lg bg-[#195fd7] px-5 py-3 font-medium text-white transition hover:bg-[#0d47a1]"
          >
            + Add Transaction
          </button>

        </div>

        {/* TABLE */}

        <section className="overflow-hidden rounded-2xl border border-[#d9e8f5] bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[750px]">

              <thead className="border-b border-[#d9e8f5] bg-[#f8fbff]">

                <tr>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-[#263238]">
                    Date
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-[#263238]">
                    Description
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-[#263238]">
                    Bank
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-[#263238]">
                    Type
                  </th>

                  <th className="px-5 py-4 text-right text-sm font-semibold text-[#263238]">
                    Amount
                  </th>

                </tr>

              </thead>

              <tbody>

                {transactions.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="px-5 py-12 text-center text-gray-500"
                    >
                      No transactions found.
                    </td>

                  </tr>

                ) : (

                  transactions.map(
                    (transaction) => (

                      <tr
                        key={
                          transaction.id ||
                          `${transaction.date}-${transaction.description}-${transaction.amount}`
                        }
                        className="border-b border-[#edf3f8] last:border-b-0"
                      >

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {transaction.date}
                        </td>

                        <td className="px-5 py-4 text-sm font-medium text-[#263238]">
                          {transaction.description}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {transaction.bank ||
                            "Not specified"}
                        </td>

                        <td className="px-5 py-4">

                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              transaction.type ===
                              "credit"
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {transaction.type}
                          </span>

                        </td>

                        <td
                          className={`px-5 py-4 text-right text-sm font-semibold ${
                            transaction.type ===
                            "credit"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type ===
                          "credit"
                            ? "+"
                            : "-"}{" "}
                          Rs.{" "}
                          {Number(
                            transaction.amount
                          ).toLocaleString()}
                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* Back buttons */}

        <div className="mt-6 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard")
            }
            className="rounded-lg border border-[#d9e8f5] bg-white px-4 py-2.5 text-sm font-medium text-[#263238] hover:bg-[#eef6ff]"
          >
            Back to Dashboard
          </button>


        </div>

      </main>

      {/* ADD TRANSACTION MODAl */}

      {showModal && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
          onClick={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              closeTransactionModal();
            }
          }}
        >

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl sm:p-7">

            {/* Modal Header */}

            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold text-[#263238]">
                  Add Transaction
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Enter the details of your transaction.
                </p>

              </div>

              <button
                type="button"
                onClick={closeTransactionModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-gray-500 hover:bg-gray-100"
                aria-label="Close modal"
              >
                ×
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={
                handleTransactionSubmit
              }
              className="space-y-5"
            >

              {/* Amount */}

              <div>

                <label
                  htmlFor="amount"
                  className="mb-2 block text-sm font-medium text-[#263238]"
                >
                  Amount
                </label>

                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      e.target.value
                    )
                  }
                  placeholder="Enter Amount"
                  min="1"
                  className="w-full rounded-lg border border-[#d9e8f5] px-4 py-3 text-sm outline-none transition focus:border-[#195fd7] focus:ring-2 focus:ring-[#195fd7]/10"
                />

              </div>

              {/* Description */}

              <div>

                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-[#263238]"
                >
                  Description
                </label>

                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  placeholder="Salary, Shopping, Bills"
                  maxLength="100"
                  className="w-full rounded-lg border border-[#d9e8f5] px-4 py-3 text-sm outline-none transition focus:border-[#195fd7] focus:ring-2 focus:ring-[#195fd7]/10"
                />

              </div>

              {/* Bank */}

              <div>

                <label
                  htmlFor="bank"
                  className="mb-2 block text-sm font-medium text-[#263238]"
                >
                  Select Bank
                </label>

                <select
                  id="bank"
                  value={bank}
                  onChange={(e) =>
                    setBank(
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-[#d9e8f5] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#195fd7] focus:ring-2 focus:ring-[#195fd7]/10"
                >

                  <option value="">
                    Select Bank
                  </option>

                  {banks.map(
                    (bankName) => (
                      <option
                        key={bankName}
                        value={bankName}
                      >
                        {bankName}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* Transaction Type */}

              <fieldset>

                <legend className="mb-3 text-sm font-medium text-[#263238]">
                  Transaction Type
                </legend>

                <div className="grid grid-cols-2 gap-3">

                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#d9e8f5] p-3">

                    <input
                      type="radio"
                      name="transactionType"
                      value="credit"
                      checked={
                        type ===
                        "credit"
                      }
                      onChange={(e) =>
                        setType(
                          e.target.value
                        )
                      }
                    />

                    <span className="text-sm font-medium text-green-700">
                      Credit
                    </span>

                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#d9e8f5] p-3">

                    <input
                      type="radio"
                      name="transactionType"
                      value="debit"
                      checked={
                        type ===
                        "debit"
                      }
                      onChange={(e) =>
                        setType(
                          e.target.value
                        )
                      }
                    />

                    <span className="text-sm font-medium text-red-700">
                      Debit
                    </span>

                  </label>

                </div>

              </fieldset>

              {/* Buttons */}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={
                    closeTransactionModal
                  }
                  className="rounded-lg border border-[#d9e8f5] px-5 py-3 text-sm font-medium text-[#263238] hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#195fd7] px-5 py-3 text-sm font-medium text-white hover:bg-[#0d47a1]"
                >
                  Save Transaction
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default TransactionHistory;