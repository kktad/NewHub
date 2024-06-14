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
            logoutLinkCaption: {
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
    
    const logout = (e: any)=>{
        e.preventDefault();
        window.location.href = props.fields.data.datasource.destinationUrl.field.value.href;
        
    }
    return (
        <form onSubmit={logout}>
            <div className="Logout--view">
                    <input className="submit-btn" type="submit"  value={props.fields.data.datasource.logoutLinkCaption.value} /> 
            </div>
        </form>
    );
}