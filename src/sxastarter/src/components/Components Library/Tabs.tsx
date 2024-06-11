import { RichTextField } from "@sitecore-jss/sitecore-jss-nextjs";
import { ComponentProps } from "lib/component-props";

type TabItem = {
    heading:{
        value: RichTextField
    },
    content: {
        value: RichTextField
    },

}
interface Fields {
    "data": {
        "datasource": {
          "TabChild": {
            "TabItems":TabItem[]
          }
        }
    }
}
type TabsProps = ComponentProps & {
    fields: Fields;
};

export const Default = (props: TabsProps): JSX.Element => {
    console.log(props.fields.data.datasource.TabChild.TabItems);
    return (
        <div>
            Tabs Component
        </div>
    );
}