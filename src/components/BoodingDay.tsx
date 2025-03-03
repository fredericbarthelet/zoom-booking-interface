import { Dayjs } from "dayjs";
import { FunctionComponent } from "react";

type BookingDayProps = { day: Dayjs };

export const BookingDay: FunctionComponent<BookingDayProps> = ({ day }) => {
  const onClick = () => {
    console.log(day.format("YYYY-MM-DD"));
  };

  return (
    <div className="p-4 text-center border-r" onClick={onClick}>
      <div className="h-16">
        <div className="font-semibold">{day.format("dddd")}</div>
        <div className="mt-1">{day.format("MMM D")}</div>
      </div>
    </div>
  );
};
