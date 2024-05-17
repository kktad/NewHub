import { ComponentProps } from "lib/component-props";
import Head from "next/head";

interface Fields {
    data: {
        context: {
            browserTitle: {
                value: string
            }
        }
    }
}
type BrowserTitleProps = ComponentProps & {
    fields: Fields;
};
export const Default = (props: BrowserTitleProps): JSX.Element => {
    return (
        <Head>
            <title>
                {props.fields.data.context.browserTitle.value || 'Page'}
            </title>
        </Head>
    );
}