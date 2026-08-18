function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-[#d9e8f5] bg-white px-5 pb-5 pt-14 text-[#263238] md:px-8"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-4">

        {/* Banking Portal */}
        <div>
          <h3 className="mb-4 text-xl font-bold text-[#1976d2]">
            Banking Portal
          </h3>

          <p className="text-sm leading-relaxed text-[#607d8b]">
            Dedicated to providing simple, reliable and secure account
            management you can trust.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-xl font-bold text-[#1976d2]">
            Quick Links
          </h3>

          <ul className="space-y-2.5">
            {[
              ["Home", "#home"],
              ["Features", "#features"],
              ["Services", "#services"],
              ["Login", "/login"],
              ["Sign Up", "/signup"],
            ].map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-sm text-[#607d8b] transition hover:pl-1 hover:text-[#1976d2]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="mb-4 text-xl font-bold text-[#1976d2]">
            Contact Us
          </h3>

          <p className="mb-2 text-sm text-[#607d8b]">
            Email: support@bankingportal.com
          </p>

          <p className="mb-2 text-sm text-[#607d8b]">
            Phone: +92 300 1234567
          </p>

          <p className="mb-2 text-sm text-[#607d8b]">
            Address: Faisalabad, Pakistan
          </p>
        </div>

        {/* Send a Message */}
        <div>
          <h3 className="mb-4 text-xl font-bold text-[#1976d2]">
            Send a Message
          </h3>

          <form className="flex flex-col">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="mb-3 w-full rounded-md border border-[#d9e8f5] bg-[#f7fafe] px-3 py-2.5 text-sm outline-none focus:border-[#64b5f6]"
            />

            <input
              type="email"
              placeholder="Your Email"
              required
              className="mb-3 w-full rounded-md border border-[#d9e8f5] bg-[#f7fafe] px-3 py-2.5 text-sm outline-none focus:border-[#64b5f6]"
            />

            <textarea
              rows="3"
              placeholder="Write your message..."
              required
              className="mb-3 w-full resize-none rounded-md border border-[#d9e8f5] bg-[#f7fafe] px-3 py-2.5 text-sm outline-none focus:border-[#64b5f6]"
            />

            <button
              type="submit"
              className="rounded-md bg-[#1976d2] py-2.5 text-sm font-medium text-white transition hover:bg-[#42a5f5]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Line */}
      <hr className="mx-auto my-8 max-w-7xl border-[#d9e8f5]" />

      <p className="text-center text-xs text-[#90a4ae]">
        © 2026 Banking Portal. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;