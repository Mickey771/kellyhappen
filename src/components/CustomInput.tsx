import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ReactNode } from "react";

interface Props {
  label: string;
  value?: string;
  kind: "input" | "select";
  name: string;
  data?: { label: string; value: string }[];
  className?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  required?: boolean;
  placeholder?: string;
  type?: string;
  step?: string;
  leftIcon?: ReactNode;
}

const CustomInput = ({
  label,
  value,
  kind,
  data,
  name,
  className,
  register,
  errors,
  required = false,
  placeholder,
  type = "text",
  step,
  leftIcon,
}: Props) => {
  const error = errors[name]?.message as string | undefined;

  return (
    <div className={`${className} flex flex-col gap-1`}>
      <label className="text-sm text-[#191B1C]" htmlFor={name}>
        {label}
      </label>

      {kind === "select" ? (
        <select
          id={name}
          {...register(name, { required })}
          className={`block w-full rounded border px-3 py-2 focus:outline-none focus:ring-1 ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-[#E5E7E8] focus:ring-blue-400"
          }`}
          defaultValue=""
        >
          <option value="" disabled>
            {placeholder || `Select ${label}`}
          </option>
          {data?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <div
          className={`flex items-center gap-2 w-full shadow rounded border px-3 py-2 ${
            error ? "border-red-500" : "border-[#E5E7E8]"
          } focus-within:ring-2 ${
            error ? "focus-within:ring-red-500" : "focus-within:ring-[#A69F93]"
          }`}
        >
          {leftIcon && <span className="text-gray-400">{leftIcon}</span>}
          <input
            type={type}
            step={step}
            id={name}
            {...register(name, { required })}
            className="w-full border-none outline-none bg-transparent placeholder:text-sm"
            placeholder={placeholder || label}
            defaultValue={value}
          />
        </div>
      )}

      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
};

export default CustomInput;
