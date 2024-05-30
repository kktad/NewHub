import { ComponentProps } from "lib/component-props";

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
    return (
        <div>
            Video Component
        </div>
    );
}