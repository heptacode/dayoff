import { EventGroup } from '@/types';
import dayjs from 'dayjs';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { TimelineItem } from './TimelineItem';

export function Timeline({
  eventGroups,
  ...props
}: { eventGroups: EventGroup[] } & DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div {...props}>
      {eventGroups.map((eventGroup, index) => (
        <div
          className="p-5 mb-4 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
          key={index}
        >
          <h1>{eventGroup.title}</h1>
          <time className="text-lg font-semibold text-gray-900 dark:text-white">
            {dayjs(eventGroup.date).format('YYYY-DD-MM')}
          </time>

          <ol className="relative border-l border-gray-200 dark:border-gray-700">
            {eventGroup.events.map((event, index) => (
              <TimelineItem event={event} key={index} />
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
