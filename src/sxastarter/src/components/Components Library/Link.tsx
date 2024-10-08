import { ComponentProps } from "lib/component-props";

interface Fields {
    item: {
        url: string,
        text: string,
        className: string,
        target: string,
        linkType: string
    };
}
type LinkProps = ComponentProps & {
    fields: Fields;
};

export const Default = (props: LinkProps): JSX.Element => {
    console.log("-----------------------Link---------------------------")
    console.log(props)
    return (
        <div className="">
            <a className={props.fields.item.className} href={props.fields.item.url}>{props.fields.item.text}</a>
        </div>
    );
}