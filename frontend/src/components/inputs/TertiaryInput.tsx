import { twMerge } from 'tailwind-merge';

function TertiaryInput({
  placeholder,
  label = '',
  type = 'text',
  className = '',
  labelClassName = '',
  required = false,
  innerRef,
  error,
}: {
  placeholder: string;
  label?: string;
  type?: string;
  className?: string;
  labelClassName?: string;
  required?: boolean;
  innerRef: any;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1 justify-center items-start w-full">
      {label && (
        <label
          htmlFor={placeholder}
          className={twMerge(
            `text-[0.45rem] text-black font-bold uppercase ${labelClassName}`
          )}
        >
          {label}
        </label>
      )}
      <input
        {...innerRef}
        required={required}
        type={type}
        className={twMerge(
          `px-4 py-1 rounded-sm input-reset text-start text-black-900 text-xs font-bold border-2 placeholder:font-normal focus:outline-none w-full ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className}`
        )}
        placeholder={placeholder}
      />
      {error && <span className="text-red-500 text-xxs">{error}</span>}
    </div>
  );
}

export default TertiaryInput;
