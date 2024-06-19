import { RichTextField } from "@sitecore-jss/sitecore-jss-nextjs";
import { ComponentProps } from "lib/component-props";

interface Fields {
    data: {
        datasource: {
            privacyWarningContent: {
                value: RichTextField
            },
            privacyWarningButtonText: {
                value: string
            },
            whitelist: {
                targetItems: [
                    {
                        name: string,
                        link: {
                            url: string
                        }
                    }
                ]
            },
            learnMoreTarget: {
                field: {
                    value: {
                        href: string
                    }
                }
            },
            learnMoreText: {
                value: string
            },
            privacyWarningType: {
                targetItem: {
                    field: {
                        value: string
                    }
                }
            }
        }
    }

}
type PrivacyWarningProps = ComponentProps & {
    fields: Fields;
};

export const Default = (props: PrivacyWarningProps): JSX.Element => {
    console.log(props.fields.data.datasource)
    return (
        <div>
            PrivacyWarning Component
        </div>
    );
}