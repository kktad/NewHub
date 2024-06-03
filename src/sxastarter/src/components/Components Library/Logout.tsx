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
    // const logoutData = props.fields.data.datasource
    // console.log(logoutData , "meenal")
    const logout = (e: any)=>{
        e.preventDefault();
        window.location.href ="https://www.sxastarter.localhost/Components/login"
        
    }
    return (
        <form onSubmit={logout}>
            <div className="Logout--view">
                    <input className="submit-btn" type="submit"  value={props.fields.data.datasource.logoutLinkCaption.value} /> 
            </div>
        </form>
    );
}