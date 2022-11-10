import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export function Button(
  props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) {
  return (
    <button
      className={`px-3 py-1 rounded-full bg-primary hover:bg-primary/80 active:bg-primary/60 text-slate-50 shadow hover:shadow-md duration-200`}
      {...props}
    >
      {props.children}
    </button>
  );
}
