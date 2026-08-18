import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hash password
  async function hashPassword(password) {
    const data = new TextEncoder().encode(password);

    const hash = await crypto.subtle.digest("SHA-256", data);

    const hashArray = Array.from(new Uint8Array(hash));

    const hashCode = hashArray
      .map((number) => number.toString(16).padStart(2, "0"))
      .join("");

    return hashCode;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const hashedPassword = await hashPassword(password);

    const user = users.find(
      (item) => item.email === email && item.password === hashedPassword
    );

    if (!user) {
      toast.error("Invalid email or password.");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    toast.success("Login successful!");

    navigate("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#eaf4ff] px-4 py-6 sm:px-5 sm:py-10">
      <div className="mb-5 flex items-center gap-2.5">
        <img
          src={logo}
          alt="Bank Logo"
          className="h-10 w-10 rounded-full object-cover sm:h-11 sm:w-11"
        />

        <h2 className="text-xl font-bold text-[#1976d2] sm:text-[23px]">
          Banking Portal
        </h2>
      </div>

      <div className="w-full max-w-[450px] rounded-xl border border-[#d9e8f5] bg-white p-5 shadow-[0_8px_25px_rgba(25,118,210,0.1)] sm:p-[35px]">
        <div className="mb-7 text-center">
          <h1 className="mb-2 text-2xl font-bold text-[#263238] sm:text-[28px]">
            Welcome Back
          </h1>

          <p className="text-sm text-[#607d8b]">
            Login to your banking account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold text-[#455a64]"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-md border border-[#d9e8f5] bg-[#f7fafe] px-3.5 py-3 text-sm text-[#263238] outline-none focus:border-[#64b5f6] focus:bg-white"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold text-[#455a64]"
            >
              Password
            </label>

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-5 flex items-center justify-between gap-3 text-xs sm:mb-[22px] sm:text-[13px]">
            <label className="flex cursor-pointer items-center gap-1.5 text-[#607d8b]">
              <input
                type="checkbox"
                className="accent-[#1976d2]"
              />
              <span>Remember me</span>
            </label>

            <a
              href="#"
              className="text-[#1976d2] hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-[#1976d2] py-3 text-[15px] font-semibold text-white transition hover:bg-[#42a5f5]"
          >
            Login
          </button>
        </form>

        <p className="mt-[22px] text-center text-sm text-[#607d8b]">
          Don't have an account?

          <Link
            to="/signup"
            className="ml-1.5 font-semibold text-[#1976d2] hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>

      <Link
        to="/"
        className="mt-5 text-sm text-[#1976d2] hover:underline"
      >
        ← Back to Home
      </Link>
    </div>
  );
}

export default Login;