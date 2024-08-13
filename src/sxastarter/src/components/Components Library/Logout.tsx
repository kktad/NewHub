import { ComponentProps } from 'lib/component-props';

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
      logoutLinkCaption: {
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
  console.log(props.fields.data.datasource);

  const logout = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies (e.g., JWT token) in the request
        headers: {
          'Content-Type': 'application/json',
        },
        // No body required
      });

      if (response.ok) {
        // Successfully logged out
        window.location.href = props.fields.data.datasource.destinationUrl.field.value.href;
        console.log('Logout successful');
        // Optionally, you can redirect the user or perform other actions
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <form onSubmit={logout}>
      <div className="Logout--view">
        <input
          className="submit-btn"
          type="submit"
          value={props.fields.data.datasource.logoutLinkCaption.value}
        />
      </div>
    </form>
  );
};
