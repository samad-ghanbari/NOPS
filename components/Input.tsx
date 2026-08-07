import {
  User,
  KeyRound,
  Mail,
  Phone,
  Smartphone,
  CalendarDays,
  DollarSign,
  Tag,
  Pencil,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  name: User,
  gender: User,
  password: KeyRound,
  key: KeyRound,
  email: Mail,
  phone: Phone,
  mobile: Smartphone,
  date: CalendarDays,
  account: DollarSign,
  tag: Tag,
  update: Pencil,
};

type InputProps = {
  label: string;
  name: string;

  value?: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  icon: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  placeholder?: string;
  dir?: "rtl" | "ltr";
  inputClass?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label,
  name,
  value,
  onChange,
  icon,
  disabled = false,
  required = true,
  type = "text",
  placeholder,
  dir = "rtl",
  inputClass = "",
  ...rest
}: InputProps) {
  const Icon = iconMap[icon];

  return (
    <div className="mb-6 bg-transparent" dir={dir}>
      <label
        htmlFor={name}
        className="mb-2 block text-right text-sm text-gray-500"
      >
        {label}
      </label>

      <div className="relative w-full h-12 bg-transparent p-0 m-0">
        <div className="pointer-events-none absolute inset-s-0 h-12 w-12 p-4 text-gray-500">
          <Icon className="h-full w-full" />
        </div>
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={cn("block w-full h-12 input_class", inputClass)}
          {...rest}
        />
      </div>
    </div>
  );
}
