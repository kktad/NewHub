import { ImageField, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Image: ImageField;
  ImageCaption: TextField;
}
type FavIconProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: FavIconProps): JSX.Element => {
  console.log('Props: ', props);

  return (
    <div>
      <hr />
      Fav Icon Component
      <br />
    </div>
  );
};
