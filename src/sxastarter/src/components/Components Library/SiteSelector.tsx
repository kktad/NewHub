import { ComponentProps } from "lib/component-props";
import { useState } from "react";
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
    const datadropdown = props.fields.items;
    const [select, setSelect] = useState('1');
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelect(event.target.value);
        window.location.href = event.target.value;
      };
    console.log(props.fields)
    return (
        <div className="site--selector">
        <select className="site-selector-select" value = {select} onChange={handleSelect}>
           
         {datadropdown.map(option =>(
             <option  value = {option.value}>{option.text}</option>
         ))}
          <option value ="https://www.google.com/">google</option>
        </select>
        </div> 
    );

}