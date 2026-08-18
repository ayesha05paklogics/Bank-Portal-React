import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import defaultUser from "../assets/default-user.png";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const navigate = useNavigate();

  // Logged-in user
  const [currentUser, setCurrentUser] = useState(null);

  // Profile image
  const [profileImage, setProfileImage] = useState(defaultUser);

  // Transactions
  const [transactions, setTransactions] = useState([]);


  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    setCurrentUser(loggedInUser);

    // Get transactions for this user
    const transactionKey =
      "transactions_" + loggedInUser.email;

    const savedTransactions =
      JSON.parse(
        localStorage.getItem(transactionKey)
      ) || [];

    setTransactions(savedTransactions);

    // Get profile image
    const imageKey =
      "profileImage_" + loggedInUser.email;

    const savedImage =
      localStorage.getItem(imageKey);

    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, [navigate]);



  let totalCredit = 0;
  let totalDebit = 0;
  let totalBalance = 0;

  transactions.forEach((transaction) => {
    const transactionAmount =
      Number(transaction.amount) || 0;

    if (transaction.type === "credit") {
      totalCredit += transactionAmount;
      totalBalance += transactionAmount;
    }

    if (transaction.type === "debit") {
      totalDebit += transactionAmount;
      totalBalance -= transactionAmount;
    }
  });


  function handleLogout() {
    localStorage.removeItem("loggedInUser");

    navigate("/login");
  }

  

  function handleProfileImageChange(imageData) {
    setProfileImage(imageData);
  }

 

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f9ff]">

      {/* Mobile Header */}

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#d9e8f5] bg-white px-5 py-4 lg:hidden">

        <h2 className="text-xl font-bold text-[#195fd7]">
          Banking Portal
        </h2>

        <button
          type="button"
          onClick={() => {
            const menu =
              document.getElementById(
                "mobileDashboardMenu"
              );

            if (menu) {
              menu.classList.toggle("hidden");
            }
          }}
          className="rounded-lg border border-[#d9e8f5] px-3 py-2 text-xl text-[#195fd7]"
          aria-label="Open menu"
        >
          ☰
        </button>

      </header>

      

      <div
        id="mobileDashboardMenu"
        className="hidden border-b border-[#d9e8f5] bg-white p-4 lg:hidden"
      >

        <div className="mb-5 text-center">

          <img
            src={profileImage}
            alt="Profile"
            className="mx-auto h-20 w-20 rounded-full object-cover"
          />

          <h3 className="mt-3 font-semibold text-[#263238]">
            {currentUser.name}
          </h3>

          <p className="break-all text-sm text-gray-500">
            {currentUser.email}
          </p>

        </div>

        <div className="space-y-2">

          <button
            type="button"
            onClick={() =>
              document
                .getElementById("loanSection")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
            className="w-full rounded-lg px-4 py-3 text-left text-[#263238] hover:bg-[#eef6ff]"
          >
            My Loans
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/transaction-history")
            }
            className="w-full rounded-lg px-4 py-3 text-left text-[#263238] hover:bg-[#eef6ff]"
          >
            Transaction History
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/edit-profile")
            }
            className="w-full rounded-lg px-4 py-3 text-left text-[#263238] hover:bg-[#eef6ff]"
          >
            Edit Profile
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg px-4 py-3 text-left text-red-600 hover:bg-red-50"
          >
            Logout
          </button>

        </div>

      </div>

    

      <div className="flex min-h-screen">

        <Sidebar
          currentUser={currentUser}
          profileImage={profileImage}
          setProfileImage={
            handleProfileImageChange
          }
          handleLogout={handleLogout}
        />


        <main className="w-full flex-1 px-5 py-8 sm:px-8 lg:px-10">

          <div className="mx-auto max-w-7xl">


            <section className="mb-8">

              <h1 className="text-2xl font-bold text-[#263238] sm:text-3xl">
                Welcome to dashboard,{" "}
                <span className="text-[#195fd7]">
                  {currentUser.name}
                </span>
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                Manage your banking activities,
                monitor your loans, and keep track
                of your account from one place.
              </p>

            </section>


            <section className="mb-10">

              <div className="mb-5">

                <h2 className="text-xl font-bold text-[#263238]">
                  Account Summary
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Overview of your current account activity.
                </p>

              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {/* Balance */}

                <article className="rounded-2xl border border-[#d9e8f5] bg-white p-6 shadow-sm">

                  <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef6ff] text-xl">
                      Rs
                    </div>

                    <h3 className="font-semibold text-[#263238]">
                      Total Balance
                    </h3>

                  </div>

                  <p className="text-2xl font-bold text-[#195fd7] sm:text-3xl">
                    Rs.{" "}
                    {totalBalance.toLocaleString()}
                  </p>

                </article>

                {/* Credit */}

                <article className="rounded-2xl border border-[#d9e8f5] bg-white p-6 shadow-sm">

                  <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef6ff] text-xl">
                      +
                    </div>

                    <h3 className="font-semibold text-[#263238]">
                      Total Credit
                    </h3>

                  </div>

                  <p className="text-2xl font-bold text-green-600 sm:text-3xl">
                    Rs.{" "}
                    {totalCredit.toLocaleString()}
                  </p>

                </article>

                {/* Debit */}

                <article className="rounded-2xl border border-[#d9e8f5] bg-white p-6 shadow-sm">

                  <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff1f1] text-xl">
                      -
                    </div>

                    <h3 className="font-semibold text-[#263238]">
                      Total Debit
                    </h3>

                  </div>

                  <p className="text-2xl font-bold text-red-600 sm:text-3xl">
                    Rs.{" "}
                    {totalDebit.toLocaleString()}
                  </p>

                </article>

              </div>

            </section>

      

            <section
              id="loanSection"
              className="scroll-mt-24"
            >

              <div className="mb-5">

                <h2 className="text-xl font-bold text-[#263238] sm:text-2xl">
                  My Loans
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Overview of all active loans and remaining balances.
                </p>

              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                {/* Total Loan */}

                <article className="rounded-2xl border border-[#d9e8f5] bg-white p-6 shadow-sm">

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef6ff] text-lg font-bold text-[#195fd7]">
                    TL
                  </div>

                  <h3 className="font-semibold text-[#263238]">
                    Total Loan
                  </h3>

                  <h2 className="mt-3 text-2xl font-bold text-[#195fd7]">
                    Rs. 2,800,000
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Overall Remaining Loan
                  </p>

                </article>

                {/* Home Loan */}

                <article className="rounded-2xl border border-[#d9e8f5] bg-white p-6 shadow-sm">

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef6ff] text-lg font-bold text-[#195fd7]">
                    HL
                  </div>

                  <h3 className="font-semibold text-[#263238]">
                    Home Loan
                  </h3>

                  <h2 className="mt-3 text-2xl font-bold text-[#195fd7]">
                    Rs. 2,000,000
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Remaining Amount
                  </p>

                </article>

                {/* Trip Loan */}

                <article className="rounded-2xl border border-[#d9e8f5] bg-white p-6 shadow-sm">

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef6ff] text-lg font-bold text-[#195fd7]">
                    TL
                  </div>

                  <h3 className="font-semibold text-[#263238]">
                    Trip Loan
                  </h3>

                  <h2 className="mt-3 text-2xl font-bold text-[#195fd7]">
                    Rs. 300,000
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Remaining Amount
                  </p>

                </article>

                {/* Car Loan */}

                <article className="rounded-2xl border border-[#d9e8f5] bg-white p-6 shadow-sm">

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef6ff] text-lg font-bold text-[#195fd7]">
                    CL
                  </div>

                  <h3 className="font-semibold text-[#263238]">
                    Car Loan
                  </h3>

                  <h2 className="mt-3 text-2xl font-bold text-[#195fd7]">
                    Rs. 500,000
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Remaining Amount
                  </p>

                </article>

              </div>

            </section>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;