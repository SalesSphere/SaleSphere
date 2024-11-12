import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className={cn(`relative w-full`)}>
        {!!leftIcon && (
          <div className="absolute left-1.5 top-[50%] -translate-y-[50%]">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            `flex h-[46px] w-full items-center justify-center gap-3 rounded-md border border-neutral-300 bg-white px-3 py-2 ${
              !!leftIcon ? "!pl-8" : ""
            } ${
              !!rightIcon ? "!pr-14" : ""
            } text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-sm placeholder:font-light placeholder:text-neutral-400 focus-visible:border-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300`,
            className
          )}
          ref={ref}
          {...props}
        />
        {!!rightIcon && (
          <div className="absolute right-3 top-[50%] -translate-y-[50%]">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
