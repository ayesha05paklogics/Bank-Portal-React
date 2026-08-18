import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section id="home" className="bg-[#eaf4ff] px-5 py-16 md:px-8 md:py-[90px]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row lg:gap-16">
        <div className="max-w-2xl text-center lg:text-left">
          <p className="mb-4 text-sm font-bold tracking-wider text-[#1976d2]">
            SIMPLE • SECURE • SMART BANKING
          </p>

          <h1 className="mb-5 text-4xl font-bold leading-tight text-[#263238] md:text-5xl">
            Manage Your Money
            <span className="text-[#1976d2]"> Simply &amp; Securely.</span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-[#607d8b] md:text-[17px] lg:mx-0">
            A simple and secure banking portal to manage your balance,
            transactions, payments and account all in one place.
          </p>

          <div className="flex justify-center gap-4 lg:justify-start">
            <Link
              to="/signup"
              className="rounded-md bg-[#1976d2] px-6 py-3 font-bold text-white transition hover:bg-[#42a5f5]"
            >
              Open Account
            </Link>
            <Link
              to="/login"
              className="rounded-md border border-[#1976d2] bg-white px-6 py-3 font-bold text-[#1976d2] transition hover:bg-[#dceeff]"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="w-full max-w-[370px] rounded-2xl border border-[#d9e8f5] bg-white p-7 shadow-[0_10px_30px_rgba(25,118,210,0.12)]">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-[#607d8b]">Available Balance</p>
            <span className="text-lg text-[#90caf9]">•••</span>
          </div>

          <h2 className="mb-1 text-3xl font-bold text-[#1976d2]">$12,450.00</h2>
          <p className="mb-7 text-xs text-[#90a4ae]">Account **** 4582</p>

          <div className="flex gap-4">
            <div className="flex-1 rounded-lg bg-[#f7fafe] p-4">
              <span className="mb-1 block text-xs text-[#78909c]">Credit</span>
              <strong className="text-base text-[#1976d2]">+$2,500</strong>
            </div>
            <div className="flex-1 rounded-lg bg-[#f7fafe] p-4">
              <span className="mb-1 block text-xs text-[#78909c]">Debit</span>
              <strong className="text-base text-[#1976d2]">-$850</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
