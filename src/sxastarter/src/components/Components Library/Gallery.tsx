import { LinkField } from "@sitecore-jss/sitecore-jss-nextjs";
import { ComponentProps } from "lib/component-props";
type GalleryImage = {
    image: {
        field: {
            value: {
                src: string,
                alt: string
            }
        }
    },
    imageTitle: {
        value: string
    },
    imageDescription: {
        value: string
    }
}
type GalleryVideo = {
    videoProvider: {
        field: {
            name: string
        }
    },
    videoID: {
        value: string
    },
    videoTitle: {
        value: string
    },
    videoDescription: {
        value: string
    },
    videoThumbnail: LinkField
}
interface Fields {
    data: {
        datasource: {
            galleriaTheme: LinkField,
            galleryImages: {
                results: GalleryImage[]
            },
            galleryVideos: {
                results: GalleryVideo[]
            }
        }
    }
}
type GalleryProps = ComponentProps & {
    fields: Fields;
};

export const Default = (props: GalleryProps): JSX.Element => {
    console.log(props.fields.data.datasource);
    return (
        <div>
            Gallery Component
        </div>
    );
}