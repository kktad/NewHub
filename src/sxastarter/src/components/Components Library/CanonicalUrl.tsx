import { ComponentProps } from "lib/component-props";
import Head from "next/head";

interface Fields {
    data: {
        context: {
            language: {
                name: string
            },
            itemurl: {
                url: string,
                hostname: string
            }
        }
    }
}
type BrowserTitleProps = ComponentProps & {
    fields: Fields;
};
export const Default = (props: BrowserTitleProps): JSX.Element => {
    console.log(props.fields)
    const url = props.fields.data.context.itemurl.url;
    const language = "/" + props.fields.data.context.language.name + "/";
    return (
        <Head>
            <link rel="canonical" href={url.replace(language, "/")}></link>
        </Head>
    );
}