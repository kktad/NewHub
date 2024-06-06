import { ComponentProps } from "lib/component-props";
import video from 'next-video';
interface Fields {
    data: {
        datasource: {
            youtubeMovie: {
                value: string
            },
            posterImage: {
                field: {
                    value: {
                        href: string
                    }
                }
            },
            mP4Movie: {
                field: {
                    value: {
                        href: string
                    }
                }
            },
            oggMovie: {
                field: {
                    value: {
                        href: string
                    }
                }
            },
            webMMovie: {
                field: {
                    value: {
                        href: string
                    }
                }
            },
            movieCaption: {
                value: string
            },
            movieDescription: {
                value: string
            },
            movieThumbnail: {
                field: {
                    value: {
                        href: string
                    }
                }
            },
            autoplay: {
                boolValue: boolean
            },
            movieLabel: {
                value: string
            },
            movieLength: {
                intValue: number
            },
            videoNotAvailableImage: {
                field: {
                    value: {
                        href: string
                    }
                }
            },
            videoNotAvailableText: {
                value: string
            }
        }
    }
}
type VideoProps = ComponentProps & {
    fields: Fields;
};
export const Default = (props: VideoProps): JSX.Element => {
    console.log(props.fields.data.datasource)
    props.fields.data.datasource.youtubeMovie.value = "https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4"
    return (
        <video 
        controls 
        autoPlay
        src={props.fields.data.datasource.youtubeMovie.value}  />
                );
}