import { useEffect } from "react"

const Calendar = () => {
    const [days, setDays] = useState([]);
    const [day, setDay] = useState(null);
    
    useEffect(() => {
        const vicente = { name: "João Vicente" };
        const tadeu = { name: "Tadeu Estanislau" };
        const samuel = { name: "Samuel Bastos" };
        const lucas = { name: "Lucas Rapini" };
        
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
        
        setDays(new Array(n).fill({}).map((_, i) => i < firstDay ? null : weekdays.reduce((prev, w) => w.days.includes(i) ? w.events.shift() : prev, null)));
    }, []);

    return (
        <div className="calendar">
            { days.map((d, i) => <div key={i} className="day">{ d && d.name }</div>) }
        </div>
    );
}