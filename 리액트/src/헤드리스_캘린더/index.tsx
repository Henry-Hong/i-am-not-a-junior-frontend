import { useCalendar } from "@h6s/calendar";
import { format } from "date-fns";

export default function 헤드리스_캘린더() {
  const { cursorDate, headers, body, navigation, view } = useCalendar();

  return (
    <table>
      <caption>
        <nav>
          <div>
            <button
              type="button"
              onClick={view.showMonthView}
              aria-label="button for changing view type to month"
            >
              M
            </button>
            <button
              type="button"
              onClick={view.showWeekView}
              aria-label="button for changing view type to week"
            >
              W
            </button>
            <button
              type="button"
              onClick={view.showDayView}
              aria-label="button for changing view type to day"
            >
              D
            </button>
          </div>
          <p data-testid="cursor-date">{format(cursorDate, "yyyy. MM")}</p>
          <div>
            <button
              type="button"
              aria-label="button for navigating to prev calendar"
              onClick={navigation.toPrev}
            >
              {"<"}
            </button>
            <button
              type="button"
              aria-label="button for navigating to today calendar"
              onClick={navigation.setToday}
            >
              TODAY
            </button>
            <button
              type="button"
              aria-label="button for navigating to next calendar"
              onClick={navigation.toNext}
            >
              {">"}
            </button>
          </div>
        </nav>
      </caption>
      <thead>
        <tr>
          {headers.weekDays.map(({ key, value }) => {
            return (
              <th key={key} data-testid="calendar-weekdays">
                {format(value, "EE")}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {body.value.map((week) => {
          const { key, value: days } = week;

          return (
            <tr key={key} data-testid="calendar-weeks">
              {days.map((day) => {
                const { key, date, isCurrentDate, isCurrentMonth } = day;

                return (
                  <td style={{ opacity: isCurrentMonth ? 1 : 0.2 }} key={key}>
                    <p
                      style={{ color: isCurrentDate ? "blue" : "black" }}
                      data-testid={
                        isCurrentDate ? "calendar-cell--today" : "calendar-cell"
                      }
                    >
                      {date}
                    </p>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
