import { Dayjs } from "dayjs";
import { FunctionComponent, useState } from "react";

import { NewBookingDialog } from "./NewBookingDialog";
import { useDisclosure } from "@/hooks/useDisclosure";

type BookingDayProps = { day: Dayjs };

const DAY_DURATION_HOURS = 10;

export const BookingDay: FunctionComponent<BookingDayProps> = ({ day }) => {
  const { onOpen, ...disclosureProps } = useDisclosure();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [height, setHeight] = useState(0);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setHeight(0);
    setDragStartY(
      event.clientY - event.currentTarget.getBoundingClientRect().top
    );
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    onOpen();
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setHeight(
        event.clientY -
          event.currentTarget.getBoundingClientRect().top -
          dragStartY
      );
    }
  };

  return (
    <div className="text-center border-r">
      <div className="h-16 border-b">
        <div className="font-semibold">{day.format("dddd")}</div>
        <div className="mt-1 mb-4">{day.format("MMM D")}</div>
      </div>
      <div
        className="relative"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {Array.from({ length: DAY_DURATION_HOURS }).map((_, index) => (
          <div key={index} className="h-16 border-b"></div>
        ))}
        {isDragging && (
          <div
            className="absolute bg-amber-400 p-x-4 w-full rounded-lg"
            style={{ top: dragStartY, height }}
          ></div>
        )}
      </div>
      <NewBookingDialog
        {...disclosureProps}
        startTime={day.add(9 + dragStartY / 64, "hour")}
        endTime={day.add(9 + (dragStartY + height) / 64, "hour")}
      />
    </div>
  );
};
