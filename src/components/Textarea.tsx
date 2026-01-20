import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "../utils/functions";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full px-4 py-2.5 rounded-lg",
            "bg-white/5 border border-white/10",
            "text-white placeholder-gray-500",
            "focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-transparent",
            "transition-all duration-200",
            "hover:bg-white/10",
            "resize-vertical min-h-[100px]",
            error && "border-red-500 focus:ring-red-500",
            className,
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-400">{helperText}</p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
