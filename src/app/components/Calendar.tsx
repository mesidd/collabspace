import {format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, getDate, getWeeksInMonth, differenceInCalendarDays}  from 'date-fns';

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar(){
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  
  const daysInMonth = eachDayOfInterval({start: monthStart, end: monthEnd});
  const weekInMonth = getWeeksInMonth(today);
  const currentDay = getDate(today);
  const daysLeft = differenceInCalendarDays(monthEnd, today);
  const firstDayOfMonth = getDay(startOfMonth(today));
  const currentWeekOfMonth = Math.ceil((currentDay + firstDayOfMonth) / 7);

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md'>

      <div className='text-2xl font-semibold mb-4 text-center text-yellow-500 bg-gray-100'>
        {format(today , "dd MMMM yyyy")} | Week {currentWeekOfMonth} of {weekInMonth} | {daysLeft} days left
      </div>

      <div className='grid grid-cols-7 text-center font-medium mb-2'
      >{weekdays.map(day => (<div key={day}>{day}</div>))}
      </div>

      <div className='grid grid-cols-7 gap-2 text-center'>
        {Array.from({length: firstDayOfMonth}).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {daysInMonth.map(date => {
          const dayNum = getDate(date);
          const isToday = dayNum === currentDay;
          return(
            <div
            key={dayNum}
            className={`p-2 rotate-lg ${
              isToday ? "bg-blue-600 text-white font-bold" : "text-gray-900 bg-gray-100"
            }`}
            >
              {dayNum}
            </div>
          )
        })}
      </div>
    </div>
  )
}