import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Head from "next/head";
import { publicUrl } from 'temp/config';

interface Fields {
  Image: ImageField;
}
type FavIconProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: FavIconProps): JSX.Element => {
 var favIconUrl=props.fields.Image.value?.src? props.fields.Image.value?.src : `${publicUrl}/favicon.ico`
  return (
    <Head>
      <link rel="icon" href={`${publicUrl}`+`${favIconUrl}`} />
    </Head>
  );
};
