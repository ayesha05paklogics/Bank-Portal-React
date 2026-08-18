import FeatureCard from "./FeatureCard";

function FeatureSection() {
  return (
    <section id="features" className="bg-white px-5 py-16 md:px-8 md:py-[75px]">
      <div className="mx-auto mb-11 max-w-2xl text-center">
        <p className="mb-2 text-xs font-bold tracking-wider text-[#1976d2]">WHY CHOOSE US</p>
        <h2 className="mb-2 text-3xl font-bold text-[#263238] md:text-[34px]">Banking Made Simple</h2>
        <span className="text-base text-[#607d8b]">Everything you need to manage your money with ease.</span>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureCard title="Secure Banking" description="Keep your account and personal information protected with secure banking features." />
        <FeatureCard title="Fast Transactions" description="Make transactions quickly and easily whenever you need to move your money." />
        <FeatureCard title="Balance Tracking" description="Check your available balance and keep track of your account activity." />
        <FeatureCard title="Transaction History" description="View your previous transactions and keep your financial activity organized." />
      </div>
    </section>
  );
}

export default FeatureSection;
