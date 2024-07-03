import { ComponentProps } from "lib/component-props";

type SnippetItems = {
    heading:{
        value:string
    },
    image: {
        field: {
          value: {
            src: string
            alt:string
          }
        }
    },
    description:{
        value:string
    }    
}

interface Fields {
    data: {
        datasource: {
            mainHeading: string,
            children: {
                results: SnippetItems[]
            },            
        }
    }
}
type TabsProps = ComponentProps & {
    fields: Fields;
};

export const Default = (props: TabsProps): JSX.Element => {
    console.log('main heading',props.fields.data.datasource.mainHeading);

    console.log('childrens',props.fields.data.datasource.children.results);
    return (
        <div>
            Snippet Component
        </div>
    );
}