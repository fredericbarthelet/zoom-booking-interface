import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";
import { BookingDay } from "@/components/BookingDay";

// Initialize plugins
dayjs.extend(weekday);
dayjs.extend(isoWeek);

export const BookingPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book a zoom call</h1>

      <div className="grid grid-cols-8">
        <div className="text-center border-r">
          <div className="h-16 border-b"></div>
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={`time-${i}`}
              className="text-start justify-start h-16 border-b"
            >
              {dayjs().hour(9).minute(0).add(i, "hour").format("hh:mm A")}
            </div>
          ))}
        </div>
        {Array.from({ length: 7 }, (_, i) =>
          dayjs().startOf("isoWeek").add(i, "day")
        ).map((day) => (
          <BookingDay key={day.toString()} day={day} />
        ))}
      </div>
    </div>
  );
};
