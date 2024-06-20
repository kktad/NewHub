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
    const { youtubeMovie, mP4Movie, oggMovie, webMMovie } = props.fields.data.datasource;

    // Check if youtubeMovie is provided
    if (youtubeMovie && youtubeMovie.value) {
        return (
            <video 
                controls 
                autoPlay
                src={youtubeMovie.value}  
            />
        );
    } else {
        // Render video element with other formats
        return (
            <video 
                controls 
                autoPlay
            >
                {/* Provide multiple sources for different formats */}
                {mP4Movie && <source src={mP4Movie.field.value.href} type="video/mp4" />}
                {oggMovie && <source src={oggMovie.field.value.href} type="video/ogg" />}
                {webMMovie && <source src={webMMovie.field.value.href} type="video/webm" />}

                {/* Fallback content for unsupported browsers */}
                Your browser does not support the video tag.
            </video>
        );
    }
}