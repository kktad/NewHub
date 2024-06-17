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
        value: Date
    },
    eventEnd:{
        value: Date
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
    console.log(props.fields.data.datasource.EventLists.CalendarEvents);
    console.log(props.params.TitleHeadingLevel);
    return (
        <div>
            Event List Component
        </div>
    );
}