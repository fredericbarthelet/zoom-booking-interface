import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";

// Initialize plugins
dayjs.extend(weekday);
dayjs.extend(isoWeek);

const BookingPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book a zoom call</h1>

      <div className="grid grid-cols-8">
        <div className="text-center  border-r">
          <div className="h-16"></div>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={`time-${i}`} className="p-4">
              <div className="text-center">
                {dayjs().hour(9).minute(0).add(i, "hour").format("hh:mm A")}
              </div>
            </div>
          ))}
        </div>
        {Array.from({ length: 7 }, (_, i) =>
          dayjs().startOf("isoWeek").add(i, "day")
        ).map((day) => (
          <div key={day.toString()} className="p-4 text-center border-r">
            <div className="h-16">
              <div className="font-semibold">{day.format("dddd")}</div>
              <div className="mt-1">{day.format("MMM D")}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
