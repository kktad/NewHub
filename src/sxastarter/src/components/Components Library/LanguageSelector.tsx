import { ComponentProps } from "lib/component-props";
type LanguageSelector = {
    datalanguagecode: string,
    datacountrycode: string,
    languagenativename: string,
    href: string
};

interface Fields {
    activeItem: LanguageSelector;
    items: LanguageSelector[];
}
type LanguageSelectorProps = ComponentProps & {
    fields: Fields;
};
export const Default = (props: LanguageSelectorProps): JSX.Element => {
    console.log(props.fields.items)
    const langdrop = props.fields.items
    return (
        <div className="lang--selector">
            <div className="lang--selector--head">
                Language Selector
            </div>
            <select>
         {langdrop.map(option =>(
             <option value = {option.datacountrycode}>{option.languagenativename}</option>
         ))}
        </select>
        </div>
    );
}