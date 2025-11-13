import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


// Type definition for input items
type InputFieldProps = {
      label: string;
      type: string;
      placeholder: string;
      value: string;
      onChange: (value: string) => void;
      showPasswordToggle?: boolean;
      togglePassword?: () => void;
      showPassword?: boolean;
};

// Reusable InputField component
export function InputField({
      label,
      type,
      placeholder,
      value,
      onChange,
      showPasswordToggle = false,
      togglePassword,
      showPassword,
}: InputFieldProps) {
      return (
            <div className="flex flex-col gap-2">
                  <label className="text-xs sm:text-sm font-bold text-neutral-700">{label}</label>
                  <div className="flex items-center border border-neutral-400 rounded-lg">
                        <input
                              type={showPasswordToggle && showPassword ? "text" : type}
                              placeholder={placeholder}
                              value={value}
                              onChange={(e) => onChange(e.target.value)}
                              className="py-[10px] px-3 rounded-lg text-neutral-700 text-sm w-full focus:outline-none"
                              required
                        />
                        {showPasswordToggle && togglePassword && (
                              <button
                                    type="button"
                                    onClick={togglePassword}
                                    className="px-3"
                              >
                                    {showPassword ? <FaRegEye color="#191717" /> : <FaRegEyeSlash color="#191717" />}
                              </button>
                        )}
                  </div>
            </div>
      );
}

