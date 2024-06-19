import { ComponentProps } from "lib/component-props";
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
    console.log(props.fields);
    console.log(props.params.TitleHeadingLevel);
    return (
        <div>
            Event Calendar Component
        </div>
    );
}