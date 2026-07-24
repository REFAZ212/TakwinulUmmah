import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && <label className="block text-sm font-medium text-deep">{label}</label>}
        <input
          ref={ref}
          className={`w-full rounded-xl border border-sand bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft outline-none transition focus:border-gold focus:ring-1 focus:ring-gold/20 ${error ? "border-red-400" : ""} ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";

export default Input;
