import { ImageField, TextField, Image as JssImage, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Image: ImageField;
  ImageCaption: TextField;
}
type FavIconProps = ComponentProps & {
  fields: Fields;
};

const imageLabel = 'Fav Icon Image: ';
const imageCaptionLabel = 'Fav Icon Image Caption: ';

export const Default = (props: FavIconProps): JSX.Element => {
  console.log('Props: ', props);

  return (
    <div>
      <hr />
      Fav Icon Component
      <br />
      <br />
      <div>{imageLabel}</div>
      <JssImage field={props.fields.Image} />
      <br />
      <br />
      <div>{imageCaptionLabel}</div>
      <Text field={props.fields.ImageCaption} />
    </div>
  );
};
