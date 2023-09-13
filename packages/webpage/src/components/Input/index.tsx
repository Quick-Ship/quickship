export interface InputProps {
  type: React.HTMLInputTypeAttribute | undefined;
  name?: string | undefined;
  value?: string | number | readonly string[];
  placeholder?: string | undefined;
  readOnly?: boolean | undefined;
  onInput?: React.FormEventHandler<HTMLInputElement> | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
}

export const Input: React.FC<InputProps> = ({
  type,
  name,
  value,
  placeholder,
  readOnly,
  onInput,
  onChange,
  onFocus,
  onBlur,
}) => {
  return (
    <div className="flex flex-row md:w-96 w-72 border bg-white border-4 border-[#9cccc3] py-2 justify-center p-1 rounded">
      <input
        type={type}
        className="h-full w-full border-0 text-lg focus:ring-transparent outline-none focus:outline-none resize-none"
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onInput={onInput}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};
