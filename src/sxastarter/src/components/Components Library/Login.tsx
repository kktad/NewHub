import { ComponentProps } from "lib/component-props";
import { useState } from "react";

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

    const [Firstname, SetName] = useState('');
    const [password, SetPass] = useState('');
    const [errors, setErros]= useState(false);
    const loginData = props.fields.data.datasource
    const handleSelect = (e: any) => {
        SetName(e.target.value);
        console.log(e.target.value)
      };
    const handlePass = (e: any) => {
        SetPass(e.target.value);
        console.log(e.target.value)
    };
    const handleSubmit = (e: any)=>{
        e.preventDefault();
        if (Firstname.length === 0 || password.length === 0){
            setErros(true);
        }else{
            window.location.href = props.fields.data.datasource.destinationUrl.field.value.href;
        }
    }
    return (
        <div className="Login--view">
           <form onSubmit={handleSubmit}>
            <div className="wrapper-name">
                <div className="first--name">
                    <label className="login--labels">
                    {loginData.usernameLabel.value}
                    </label>
                    <input className="login--input" type="text" name="name" value={Firstname} onChange={handleSelect}/><br/>
                </div>
            {errors && Firstname.length <=0 ?<p className="error-msg">Username cannot be empty</p>: ''}
            </div>
            <div className="wrapper-password">
                <div className="password">
                    <label className="login--labels">{loginData.passwordLabel.value}
                    </label>
                    <input className="login--input" type="password" id="pwd" name="pwd" value={password} onChange={handlePass} />
                </div>
            </div>
            {errors && password.length <=0 ?<p className="error-msg">Password cannot be empty</p>: ''}<br/>

                <label className="login--remember">
                <input  type="checkbox" name="remember"/> {loginData.rememberMeLabel.value}
                </label><br/>
                <input className="submit-btn" type="submit"  value={loginData.loginButtonCaption.value} />
            </form>
        </div>
    );
}