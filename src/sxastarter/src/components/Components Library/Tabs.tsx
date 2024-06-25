import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { RichTextField } from "@sitecore-jss/sitecore-jss-nextjs";
import { ComponentProps } from "lib/component-props";

type TabItem = {
    heading: {
        value: string;
    };
    content: {
        value: string;
    };
};

interface Fields {
    data: {
        datasource: {
            TabChild: {
                TabItems: TabItem[];
            };
        };
    };
}

type TabsProps = ComponentProps & {
    fields: Fields;
    params: {
        style?: string; // Optional style parameter
    };
};

export const Default = ({ fields, params }: TabsProps): JSX.Element => {
    const { TabItems } = fields.data.datasource.TabChild;
    console.log(params)

    // Check if "indent-bottom" exists in params.style
    const isIndentBottom = params.Styles && params.Styles.includes('indent-bottom');
    const isIndentLeft = params.Styles && params.Styles.includes('position-left');
    const isIndentRight = params.Styles && params.Styles.includes('position-right');



    // Conditionally apply a class based on the check
    const customClass = isIndentBottom ? 'custom-indent-bottom' : '';
    const customLeft = isIndentLeft ? 'custom-indent-left' : '';
    const customRight = isIndentRight ? 'custom-indent-right' : '';



    return (
        <div>
            <Tabs className={customClass || customLeft || customRight} >
                <TabList>
                    {TabItems.map((item, index) => (
                        <Tab key={index}>{item.heading.value}</Tab>
                    ))}
                </TabList>

                {TabItems.map((item, index) => (
                    <TabPanel key={index}>
                        <p className='tab-content'>{item.content.value}</p>
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    );
};

export default Default;