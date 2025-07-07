const FormInput = ({
  label,
  name,
  value,
  errors,
  onChange,
  type,
  isTextarea,
}) => {
  let input;

  input = isTextarea ? (
    <textarea
      id={name}
      name={name}
      className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm p-2"
      value={value}
      onChange={onChange}
    />
  ) : (
    <input
      id={name}
      type={type}
      name={name}
      className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm p-2"
      value={value}
      onChange={onChange}
    />
  );

  return (
    <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      {input}
      {errors && errors.map((error) => <p>{error}</p>)}
    </label>
  );
};

export default FormInput;
