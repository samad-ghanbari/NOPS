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
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  icon: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  dir?: "rtl" | "ltr";
  inputClass?: string;
  rows?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Input({
  label,
  name,
  value,
  onChange,
  icon,
  disabled = false,
  required = true,
  placeholder,
  dir = "rtl",
  inputClass = "",
  rows = 3,
  ...rest
}: InputProps) {
  const Icon = iconMap[icon];

  return (
    <div className="mb-6" dir={dir}>
      <label
        htmlFor={name}
        className="mb-2 block text-right text-sm text-gray-500"
      >
        {label}
      </label>

      <div className="relative w-full rounded-lg">
        <div className="pointer-events-none absolute inset-y-0 inset-s-0 flex p-2 text-gray-500">
          <Icon className="h-5 w-5" />
        </div>

        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={cn(
            "block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-80 ltr:pl-10 rtl:pr-10 rtl:text-right",
            inputClass,
          )}
          {...rest}
        />
      </div>
    </div>
  );
}
