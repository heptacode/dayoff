export function DotMarker(): HTMLElement {
  const radius: HTMLElement = document.createElement('div');
  radius.classList.add(
    'relative',
    'w-6',
    'h-6',
    'flex',
    'justify-center',
    'items-center',
    'rounded-full',
    'bg-[#4185F3]/40'
  );
  const dot: HTMLElement = document.createElement('div');
  dot.classList.add(
    'absolute',
    'w-3',
    'h-3',
    'rounded-full',
    'bg-[#4185F3]',
    'border',
    'border-white'
  );
  radius.appendChild(dot);

  return radius;
}
