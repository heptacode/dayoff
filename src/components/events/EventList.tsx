import { EventListItem } from '@/components/events/EventListItem';

interface Props {
  items: any[];
}
export function EventList({ items }: Props) {
  return (
    <div className="divide-y divide-gray">
      {items.map((item: any, index: number) => (
        <EventListItem key={index} />
      ))}
    </div>
  );
}
