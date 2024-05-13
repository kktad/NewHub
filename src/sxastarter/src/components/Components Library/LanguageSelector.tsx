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
    console.log(props)
    return (
        <div className="">
            <span>
                Language Selector
            </span>
        </div>
    );
}