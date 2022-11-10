import { Event } from '@/types';
import { DetailedHTMLProps, LiHTMLAttributes } from 'react';

export function TimelineItem({
  event,
  ...props
}: { event: Event } & DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>) {
  return (
    <li className="mb-10 ml-6" {...props}>
      <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
        {/* <svg
          aria-hidden="true"
          className="w-3 h-3 text-blue-600 dark:text-blue-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        ></svg> */}
      </span>
      <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
        {event.title}
      </h3>
      {/* <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {event.date?.toLocaleString()}
      </time> */}
      <div className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {event.subtitle}
      </div>
      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        {event.description}
      </p>
    </li>
  );
}
