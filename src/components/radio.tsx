"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
  error?: string;
  helperText?: string;
};

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            ref={ref}
            type="radio"
            className={cn(
              "w-5 h-5 border-cream-300 text-cocoa-600",
              "focus:ring-2 focus:ring-cocoa-200 focus:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-red-300",
              className
            )}
            {...props}
          />
          {label && (
            <span className="text-sm font-medium text-cocoa-700">
              {label}
              {props.required && <span className="text-red-500 ml-1">*</span>}
            </span>
          )}
        </label>
        {error && (
          <p className="text-xs text-red-600 ml-7">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-xs text-cocoa-500 ml-7">{helperText}</p>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";

export default Radio;

