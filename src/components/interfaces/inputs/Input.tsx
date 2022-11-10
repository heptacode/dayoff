import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export function Input(
  props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) {
  return (
    <input
      className="py-2 px-3 w-full border rounded-lg outline-none focus:shadow-outline text-gray-700 leading-tight shadow appearance-none"
      {...props}
    />
  );
}
