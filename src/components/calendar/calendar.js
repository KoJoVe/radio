import React, { useState, useEffect } from 'react';
import './calendar.css';

const Calendar = () => {
    const [days, setDays] = useState([]);
    const [day, setDay] = useState(null);
    
    useEffect(() => {
        const vicente = { name: "João Vicente", link: "https://soundcloud.com/kojove" };
        const tadeu = { name: "Tadeu Estanislau", link: "https://soundcloud.com/tadeu-estanislau" };
        const samuel = { name: "Samuel Bastos", link: "https://soundcloud.com/sambsj" };
        const lucas = { name: "Lucas Rapini", link: "https://soundcloud.com/lucas-rapini" };
        
        const weekdays = [
            { days: [0, 7, 14, 21, 28, 35], events: []},
            { days: [1, 8, 15, 22, 29, 36], events: []},
            { days: [2, 9, 16, 23, 30, 37], events: [vicente, samuel, vicente, samuel]},
            { days: [3, 10, 17, 24, 31, 38], events: []},
            { days: [4, 11, 18, 25, 32, 39], events: [tadeu, lucas, tadeu, lucas]},
            { days: [5, 12, 19, 26, 33, 40], events: []},
            { days: [6, 13, 20, 27, 34, 41], events: []},
        ]
        
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        
        const totalDays = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const n = totalDays + firstDay;

        let days = 1;
        
        setDays(new Array(n).fill({}).map((_, i) => {
            const render = !(i < firstDay || days >= totalDays);
            days = render ? days + 1 : days;
            return {
                day: !render ? null : days - 1,
                date: !render ? null : new Date(year, month, days - 1),
                event: !render ? null : weekdays.reduce((prev, w) => w.days.includes(i) ? w.events.shift() : prev, null)
            }
        }));
    }, []);

    const click = (day, index) => {
        if (!day.event) {
            return;
        }
        setDay(index);
    }

    return (
        <div className="calendar">
            <h5 className="month"></h5>
            <div className="day pink">S</div>
            <div className="day pink">M</div>
            <div className="day pink">T</div>
            <div className="day pink">W</div>
            <div className="day pink">T</div>
            <div className="day pink">F</div>
            <div className="day pink">S</div>
            { days.map((d, i) => 
                <div key={i} onClick={() => {click(d, i)}} className={`day ${ day === i ? 'selected' : ''} ${ d.event ? 'event' : ''}`}>
                    {d.day}
                </div>
            )}
            <div className="info">
                {
                    day?
                    <span>
                        <b className="green"><a href={days[day].event.link} target="_blank">{days[day].event.name}</a></b> 
                        {days[day].date.getDate()}/{days[day].date.getMonth() + 1}/{days[day].date.getFullYear()} 21:00 (GMT)
                    </span> :
                    null
                }
            </div>
        </div>
    );
}

export default Calendar;