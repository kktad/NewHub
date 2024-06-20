import { ComponentProps } from "lib/component-props";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
type CalendarTypeItem = {
    name: string
}

interface Fields {
    settings: {
        showPrevNext: boolean,
        showMonthCaptions: boolean,
        compactView: boolean
    },
    items: CalendarTypeItem[]   
}

type EventCProps = ComponentProps & {
    fields: Fields;
};

export const Default = (props: EventCProps): JSX.Element => {    
    console.log(props, 'meenal');
    console.log(props.params.TitleHeadingLevel);
    return (
        <div className="calender-compo">
            <p className="example-calender">Example Calendar</p>
            <Calendar
            localizer={localizer}
          
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
        />
        </div>
    );
}