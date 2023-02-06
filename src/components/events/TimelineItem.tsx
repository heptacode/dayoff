import { AccordionPanel, Flex, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { IEvent } from '@/types';

interface DragItem {
  index: number;
  id: string;
  type: string;
}

// https://react-dnd.github.io/react-dnd
// https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_ts/04-sortable/simple?from-embed=&file=/src/Card.tsx
export function TimelineItem({
  event,
  index,
  handleMove,
  ...props
}: {
  event: IEvent;
  index: number;
  handleMove(dragIndex: number, hoverIndex: number): void;
}) {
  const ref = useRef<any>(null);

  const [, dropRef] = useDrop({
    accept: 'TimelineItem',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      // console.log('hover', item);
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      handleMove(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [, dragRef] = useDrag({
    type: 'TimelineItem',
    item: () => {
      return { index };
    },
    end(item) {
      console.log('end', item);
    },
  });

  dragRef(dropRef(ref));
  return (
    <AccordionPanel ref={ref} as="li" ml="3" mb="3" {...props}>
      <Flex
        position="absolute"
        w="6"
        h="6"
        bgColor="blue.200"
        borderRadius="full"
        ring="8"
        ringColor="white"
        left={-3}
        justifyContent="center"
        alignItems="center"
        _dark={{ ringColor: 'gray.900', bgColor: 'blue.800' }}
      ></Flex>

      <Text fontSize="md" mb="1" fontWeight="semibold">
        {event.title}
      </Text>
      <Text as="time" display="block" fontSize="xs">
        {event.date
          ? new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeStyle: 'short' }).format(
              new Date(event.date)
            )
          : null}
      </Text>
      <Text fontSize="sm">{event.subtitle}</Text>
    </AccordionPanel>
  );
}
