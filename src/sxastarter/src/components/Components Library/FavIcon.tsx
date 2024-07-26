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
 return (
    <Head>
      <link rel="icon" href={`${publicUrl}`+`${props.fields.Image.value?.src}`} key="favicon"/>
    </Head>
  );
};
