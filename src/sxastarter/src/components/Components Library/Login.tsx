import { ComponentProps } from "lib/component-props";

interface Fields {
    data: {
        datasource: {
            introduction: {
                field: {
                    value: string
                }
            },
            usernameLabel: {
                value: string
            },
            passwordLabel: {
                value: string
            },
            displayRememberMe: {
                field: {
                    value: boolean
                }
            },
            rememberMeLabel: {
                value: string
            },
            loginButtonCaption: {
                value: string
            },
            failureText: {
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
type LoginProps = ComponentProps & {
    fields: Fields;
};
export const Default = (props: LoginProps): JSX.Element => {
    console.log(props.fields.data.datasource)
    return (
        <div className="">
            Login Component
        </div>
    );
}