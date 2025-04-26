import React from "react";
import { IconInput } from "./icon-input";
import { cn } from "@/lib/utils";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { useBoolean } from "ahooks";

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ value, placeholder, onChange, className, ...props }, ref) => {
    const [visible, { setTrue, setFalse }] = useBoolean(false);
    const [passStrength, setPassStrength] = React.useState(0);

    const passwordStrengthCheck = (password: string) => {
      if (password.length < 6 && password.length > 0) {
        setPassStrength(1);
        return;
      }
      if (password.length < 10 && password.length >= 6) {
        setPassStrength(2);
        return;
      }
      if (password.length >= 10) {
        setPassStrength(3);
        return;
      }
      setPassStrength(0);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      passwordStrengthCheck(e.target.value);
      onChange?.(e.target.value);
    };

    const renderIcon = () => {
      return visible ? (
        <RiEyeLine className="text-lg cursor-pointer" onClick={setFalse} />
      ) : (
        <RiEyeCloseLine className="text-lg cursor-pointer" onClick={setTrue} />
      );
    };

    return (
      <div className={cn("space-y-1", className)}>
        <IconInput
          ref={ref}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={handlePasswordChange}
          icon={renderIcon()}
          iconPosition="right"
          {...props}
        />
        <div className="flex justify-between items-center px-3">
          {passStrength === 0 && <p className="text-sm font-bold text-white"></p>}
          {passStrength === 1 && <p className="text-sm font-bold text-red-600">弱</p>}
          {passStrength === 2 && <p className="text-sm font-bold text-yellow-600">中</p>}
          {passStrength === 3 && <p className="text-sm font-bold text-green-600">强</p>}
          <div className="flex space-x-1">
            {Array.from({ length: 3 - passStrength }).map((_, index) => (
              <div key={`empty-${index}`} className="w-10 h-1 rounded-full bg-gray-300" />
            ))}
            {Array.from({ length: passStrength }).map((_, index) => (
              <div
                key={`filled-${index}`}
                className={cn(
                  "w-10 h-1 rounded-full",
                  passStrength === 1 && "bg-red-600",
                  passStrength === 2 && "bg-yellow-600",
                  passStrength === 3 && "bg-green-600"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput"; 