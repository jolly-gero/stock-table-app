"use client";

type DropdownProps = {
  readonly label: string;
  readonly options: readonly string[];
  readonly onChange: (value: string) => void;
  readonly selectedValue: string;
};

export default function Dropdown({
  label,
  options,
  onChange,
  selectedValue,
}: DropdownProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <div className="w-full max-w-xs space-y-1">
      <label className="block text-sm font-medium">{label}</label>
      <select
        value={selectedValue}
        onChange={handleChange}
        className="border rounded px-2 py-1.5 -mt-2"
      >
        <option value="" disabled>
          -- Choose an option --
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
