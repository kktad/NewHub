import { ComponentProps } from "lib/component-props";

interface Fields {
    item: {
        url: string,
        text: string,
        style: string,
        target: string,
        linkType: string
    };
}
type LinkProps = ComponentProps & {
    fields: Fields;
};

export const Default = (props: LinkProps): JSX.Element => {
    console.log("-----------------------Link---------------------------")
    console.log(props.fields)
    return (
        <div className="">
            <span>
                Link Test
            </span>
        </div>
    );
}