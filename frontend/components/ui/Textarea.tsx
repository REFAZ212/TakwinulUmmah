import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && <label className="block text-sm font-medium text-deep">{label}</label>}
        <textarea
          ref={ref}
          className={`w-full rounded-xl border border-sand bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft outline-none transition resize-y focus:border-gold focus:ring-1 focus:ring-gold/20 ${error ? "border-red-400" : ""} ${className}`}
          rows={4}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export default Textarea;
