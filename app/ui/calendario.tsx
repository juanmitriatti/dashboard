'use client';
import React, { useCallback, useState, useMemo } from 'react'
import { Calendar, Views, DateLocalizer,momentLocalizer } from 'react-big-calendar'
import PropTypes from 'prop-types'
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale('es');
const Calendario = ( { events }) => {
  const localizer = momentLocalizer(moment);
  const [myEvents, setEvents] = useState(events)
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const handleSelectSlot = useCallback(
    async ({ start, end }) => {
      const title = window.prompt('New Event Name');
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);

        try {
          // Adjust start, end, and shiftDate to the required format for your function
          const startTime = moment(start).format('HH:mm:ss');
          const endTime = moment(end).format('HH:mm:ss');
          const shiftDate = moment(start).format('YYYY-MM-DD');

          //const insertarturno = await insertTurno(title, startTime, endTime, shiftDate);
          const insertarturno = fetch('/api/turnos', {method: 'POST', body: JSON.stringify({ title, startTime, endTime, shiftDate })})
        } catch (error) {
          console.error('Error inserting shift:', error);
        }
      }
    },
    [setEvents]
  );

  const dayLayoutAlgorithm = 'no-overlap';
    const handleSelectEvent = useCallback(
      (event) => window.alert(event.title),
      []
    )
  
    const { defaultDate, scrollToTime } = useMemo(
      () => ({
        defaultDate: new Date(2024, 4, 26),
        scrollToTime: new Date(1970, 1, 1, 6),
      }),
      []
    )
  
    return (
        
            <Calendar
              dayLayoutAlgorithm={dayLayoutAlgorithm}
              defaultDate={defaultDate}
              defaultView={Views.WEEK}
              events={myEvents}
              localizer={localizer}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              scrollToTime={scrollToTime}
              style={{ height: "100vh" }}
              onView={setView}
              view={view}
              onNavigate={setDate}
              date={date}
            />
      );
  };
  
  export default Calendario;

  Calendario.propTypes = {
    localizer: PropTypes.instanceOf(DateLocalizer),
    dayLayoutAlgorithm: PropTypes.string,
  }