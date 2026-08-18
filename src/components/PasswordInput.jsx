import { useState } from "react";

function PasswordInput({ value, onChange, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full rounded-md border border-[#d9e8f5] bg-[#f7fafe] px-3.5 py-3 pr-[70px] text-sm text-[#263238] outline-none focus:border-[#64b5f6] focus:bg-white"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer bg-transparent p-1 text-xs font-semibold text-[#1976d2] hover:text-[#42a5f5]"
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  );
}

export default PasswordInput;
