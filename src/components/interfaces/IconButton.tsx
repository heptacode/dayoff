import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export function IconButton(
  props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) {
  return (
    <button
      className={`px-2 py-2 rounded-full hover:bg-black/10 active:bg-black/20 text-gray-800 shadow hover:shadow-md duration-200`}
      {...props}
    >
      {props.children}
    </button>
  );
}
