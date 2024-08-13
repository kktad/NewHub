import { ComponentProps } from 'lib/component-props';
import { useState } from 'react';

interface Fields {
  data: {
    datasource: {
      introduction: {
        field: {
          value: string;
        };
      };
      usernameLabel: {
        value: string;
      };
      passwordLabel: {
        value: string;
      };
      displayRememberMe: {
        field: {
          value: boolean;
        };
      };
      rememberMeLabel: {
        value: string;
      };
      loginButtonCaption: {
        value: string;
      };
      failureText: {
        value: string;
      };
      destinationUrl: {
        field: {
          value: {
            href: string;
          };
        };
      };
    };
  };
}

type LoginProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: LoginProps): JSX.Element => {
  //console.log(props.fields.data.datasource);

  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const loginData = props.fields.data.datasource;

  const handleSelect = (e: any) => {
    setFirstname(e.target.value);
    console.log(e.target.value);
  };

  const handlePass = (e: any) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (firstname.length === 0 || password.length === 0) {
      setErrors(true);
    } else {
      try {
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ email: firstname, password: password }),
        });

        if (response.ok) {
          window.location.href = props.fields.data.datasource.destinationUrl.field.value.href;
        } else {
          const responseText = await response.text();
          // If the response is not successful, display an error message
          const errorData = responseText ? JSON.parse(responseText) : {};
          setErrorMessage(errorData.message || 'Login failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };
  return (
    <div className="Login--view">
      <form onSubmit={handleSubmit}>
        <div className="wrapper-name">
          <div className="first--name">
            <label className="login--labels">{loginData.usernameLabel.value}</label>
            <input
              className="login--input"
              type="text"
              name="name"
              value={firstname}
              onChange={handleSelect}
            />
            <br />
          </div>
          {errors && firstname.length <= 0 ? (
            <p className="error-msg">Username cannot be empty</p>
          ) : (
            ''
          )}
        </div>
        <div className="wrapper-password">
          <div className="password">
            <label className="login--labels">{loginData.passwordLabel.value}</label>
            <input
              className="login--input"
              type="password"
              id="pwd"
              name="pwd"
              value={password}
              onChange={handlePass}
            />
          </div>
        </div>
        {errors && password.length <= 0 ? (
          <p className="error-msg">Password cannot be empty</p>
        ) : (
          ''
        )}
        <br />
        {loginData.displayRememberMe.field.value && (
          <label className="login--remember">
            <input type="checkbox" name="remember" /> {loginData.rememberMeLabel.value}
          </label>
        )}
        <br />
        <input className="submit-btn" type="submit" value={loginData.loginButtonCaption.value} />
        {errorMessage && <p className="error-msg">{errorMessage}</p>}
      </form>
    </div>
  );
};
