import React from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  ({ className, icon, iconPosition = "left", ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{icon}</div>
        )}
        <Input
          ref={ref}
          className={cn(
            iconPosition === "left" ? "pl-10" : iconPosition === "right" ? "pr-10" : "",
            className
          )}
          {...props}
        />
        {icon && iconPosition === "right" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">{icon}</div>
        )}
      </div>
    );
  }
);

IconInput.displayName = "IconInput";

export { IconInput }; 