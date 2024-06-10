import { RichTextField } from "@sitecore-jss/sitecore-jss-nextjs";
import { ComponentProps } from "lib/component-props";

type AccordionItem = {
    heading: RichTextField,
    content: RichTextField

}
interface Fields {
    settings: {
        expandOnHover: boolean,
        expandedByDefault: boolean,
        speed: number,
        easing: string,
        canOpenMultiple: boolean,
        canToggle: boolean
    },
    items: AccordionItem[]
}
type AccordionProps = ComponentProps & {
    fields: Fields;
};

export const Default = (props: AccordionProps): JSX.Element => {
    console.log(props.fields)
    return (
        <div>
            Accordion Component
        </div>
    );
}