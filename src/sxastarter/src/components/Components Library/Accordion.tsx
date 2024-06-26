import { RichTextField } from "@sitecore-jss/sitecore-jss-nextjs";
import { ComponentProps } from "lib/component-props";
import Collapsible from 'react-collapsible';
import { useState } from 'react';

type AccordionItem = {
    heading: RichTextField,
    content: RichTextField
}

interface Fields {
    settings: {
        expandOnHover: boolean,
        expandedByDefault: boolean,
        speed: number,
        easing: string,
        canOpenMultiple: boolean,
        canToggle: boolean
    },
    items: AccordionItem[]
}

type AccordionProps = ComponentProps & {
    fields: Fields;
};

const Default: React.FC<AccordionProps> = ({ fields, params }) => {
    console.log(params, 'mee')
    const [isOpenIndexes, setIsOpenIndexes] = useState<number[]>([]);

    const canOpenMultipleCustom = fields.settings.canOpenMultiple;
    const canToggleCustom = fields.settings.canToggle;
    const expandOnHoverCustom = fields.settings.expandOnHover;
    const expandedByDefaultCustom = fields.settings.expandedByDefault;
    const speedCustom = fields.settings.speed;

    const settings = {
        canOpenMultiple: canOpenMultipleCustom,
        canToggle: canToggleCustom,
        expandOnHover: expandOnHoverCustom,
        expandedByDefault: expandedByDefaultCustom,
        speed: speedCustom,
    };

    const handleToggle = (index: number) => {
        setIsOpenIndexes(prevIndexes => {
            if (prevIndexes.includes(index)) {
                return prevIndexes.filter(i => i !== index);
            } else {
                return [...prevIndexes, index];
            }
        });
    };

    return (
        <div>
            {fields.items.map((item, index) => {
                const triggerText = item.heading ? item.heading.toString() : '';
                const displayText = item.content ? item.content.toString() : '';

                const isOpen = isOpenIndexes.includes(index);
                const accordionClass = params.Styles === 'accordion-horizontal' ? 'horizontal' : '';
                const customClass = params.Styles === 'accordion-horizontal' ? 'custom-class-for-horizontal' : '';

                return (
                    <Collapsible  
                        key={`collapsible-${index}`}
                        trigger={triggerText}
                        transitionTime = {speedCustom}
                        open ={expandedByDefaultCustom}
                        className={`Collapsible ${accordionClass} ${isOpen ? 'is-open' : ''} ${customClass}`}
                        {...settings}
                        openedClassName={`Collapsible ${accordionClass} ${customClass} is-open`} // Specify openedClassName to maintain classes when opened
                        onOpening={() => handleToggle(index)}
                        onClosing={() => handleToggle(index)}
                    >
                        <div>{displayText}</div>
                    </Collapsible>
                );
            })}
        </div>
    );
};

export default Default;
