import { ComponentProps } from "lib/component-props";
type SiteSelector = {
    text: string,
    value: string,
    selected: boolean
};

interface Fields {
    items: SiteSelector[];
}
type SiteSelectorProps = ComponentProps & {
    fields: Fields;
};
export const Default = (props: SiteSelectorProps): JSX.Element => {
    console.log(props.fields)
    return (
        <div className="">
            <span>
                Site Selector
            </span>
        </div>
    );
}