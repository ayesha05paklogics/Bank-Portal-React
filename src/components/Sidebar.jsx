import { useNavigate } from "react-router-dom";
import {
  FaWallet,
  FaClockRotateLeft,
  FaUserPen,
  FaRightFromBracket,
} from "react-icons/fa6";

function Sidebar({
  currentUser,
  profileImage,
  handleLogout,
}) {
  const navigate = useNavigate();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-[#cfe8f7] bg-[#eaf6ff] lg:block">
      <div className="sticky top-0 flex h-screen flex-col">

        {/* Logo */}
        <div className="border-b border-[#cfe8f7] px-6 py-6">
          <h2 className="text-xl font-bold text-[#195fd7]">
            Banking Portal
          </h2>
        </div>

        {/* Profile */}
        <section className="border-b border-[#cfe8f7] px-6 py-6 text-center">

          {/* Profile Image - Display Only */}
          <div className="mx-auto h-24 w-24">
            <img
              src={profileImage}
              alt="Profile"
              className="h-24 w-24 rounded-full border-4 border-[#eef6ff] object-cover"
            />
          </div>

          <h3 className="mt-4 truncate font-semibold text-[#263238]">
            {currentUser?.name || "User Name"}
          </h3>

          <p className="mt-1 break-all text-xs text-gray-500">
            {currentUser?.email || "user@email.com"}
          </p>

        </section>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">

            {/* My Loans */}
            <li>
              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard")
                }
                className="flex w-full items-center gap-3 rounded-lg bg-[#eef6ff] px-4 py-3 text-left font-medium text-[#195fd7]"
              >
                <FaWallet className="text-[17px]" />
                <span>My Loans</span>
              </button>
            </li>

            {/* Transaction History */}
            <li>
              <button
                type="button"
                onClick={() =>
                  navigate("/transaction-history")
                }
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium text-[#263238] transition hover:bg-[#eef6ff] hover:text-[#195fd7]"
              >
                <FaClockRotateLeft className="text-[17px]" />
                <span>Transaction History</span>
              </button>
            </li>

            {/* Edit Profile */}
            <li>
              <button
                type="button"
                onClick={() =>
                  navigate("/edit-profile")
                }
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium text-[#263238] transition hover:bg-[#eef6ff] hover:text-[#195fd7]"
              >
                <FaUserPen className="text-[17px]" />
                <span>Edit Profile</span>
              </button>
            </li>

          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-[#cfe8f7] p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-1 rounded-lg px-4 py-3 text-left font-medium text-red-600 transition hover:bg-red-50"
          >
            <FaRightFromBracket className="text-[17px]" />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </aside>
  );
}

export default Sidebar;