import { ComponentProps } from "lib/component-props";

interface Fields {
    data: {
        datasource: {
            introduction: {
                field: {
                    value: string
                }
            },
            displayUsername: {
                field: {
                    value: boolean
                }
            },
            logoutLinkCaption: {
                value: string
            },
            destinationUrl: {
                field: {
                    value: {
                        href: string
                    }
                }
            }
        }
    }
}
type LogoutProps = ComponentProps & {
    fields: Fields;
};
export const Default = (props: LogoutProps): JSX.Element => {
    console.log(props.fields.data.datasource)
    return (
        <div className="">
            Logout Component
        </div>
    );
}