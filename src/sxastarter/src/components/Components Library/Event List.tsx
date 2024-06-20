import { RichTextField } from "@sitecore-jss/sitecore-jss-nextjs";
import { ComponentProps } from "lib/component-props";

type CalendarItem = {
    eventName:{
        value: string
    },
    eventType: {
        value: RichTextField
    },
    eventStart:{
        value: string
    },
    eventEnd:{
        value: string
    },
    eventPlace:{
        value: string
    },
    eventDescription: {
        value: RichTextField
    },
    eventLink:{
        value: string
    },
    startLabel:{
        value: string
    },
    endLabel:{
        value: string
    }
}
interface Fields {
    "data": {
        "datasource": {
          "EventLists": {
            "CalendarEvents": CalendarItem[]
          }
        }
    }
}
type EventProps = ComponentProps & {
    fields: Fields;
};

export const Default = (props: EventProps): JSX.Element => {
    const EventList = props.fields.data.datasource.EventLists.CalendarEvents;
    console.log(EventList)
    // Function to convert date string to formatted date
    const convertDateTime = (dateTimeStr: string): string => {
        const year = dateTimeStr.substr(0, 4);
        const month = dateTimeStr.substr(4, 2);
        const day = dateTimeStr.substr(6, 2);
        const hour = dateTimeStr.substr(9, 2);
        const minute = dateTimeStr.substr(11, 2);
        const formattedDateTime = `${month}/${day}/${year} ${hour}:${minute} AM`;
        return formattedDateTime;
    };

    return (
        <div>
            {EventList.map((item, index) => (
                <div className= "event-listing" key={index}>
                    <p className="from-date">
                    <span>{item.startLabel.value}</span>
                    {convertDateTime(item.eventStart.value)}
                    </p>
                    <p className="to-date">
                    <span>{item.endLabel.value}</span>
                    {convertDateTime(item.eventEnd.value)}
                    <a href ={item.eventLink.value} className="event-name">{item.eventName.value}</a>
                    </p>
                    <p className="location">
                    {item.eventPlace.value}
                    </p>
                </div>
            ))}
        </div>
    );
}