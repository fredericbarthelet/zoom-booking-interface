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

      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: 7 }, (_, i) =>
          dayjs().startOf("isoWeek").add(i, "day")
        ).map((day) => (
          <div key={day.toString()} className="border rounded-lg p-4">
            <div className="text-center">
              {/* Display day name */}
              <div className="font-semibold">{day.format("dddd")}</div>
              {/* Display date */}
              <div className="mt-1">{day.format("MMM D")}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
