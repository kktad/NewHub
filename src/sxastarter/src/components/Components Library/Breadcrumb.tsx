import { ComponentProps } from "lib/component-props";

type Breadcrumb = {
    name: string,
    url: string,
    children: Breadcrumb[]
};

interface Fields {
    seperator: {
        value: string
    };
    items: Breadcrumb[];
}
type BreadcrumbProps = ComponentProps & {
    fields: Fields;
};

const BreadcrumbLink = (props: Breadcrumb) => {
    return <a href={`${props.url}`}>{props.name}</a> ;
};  
  
export const Default = (props: BreadcrumbProps): JSX.Element => {
    const breadcrumbList = props.fields.items.map((element: Breadcrumb) => (                
        <li>
            <BreadcrumbLink url={element.url} name={element.name} children={element.children} />
            <span>{props.fields.seperator.value}</span>            
            <ol>
                {element.children.map((child) => (
                    <li>
                        <a href={`${child.url}`}>{child.name}</a>                    
                    </li>
                ))}
            </ol>
        </li>    
      ));

    return (
        <ul className={props.params.styles}>
                {breadcrumbList}
        </ul>
    );
}


