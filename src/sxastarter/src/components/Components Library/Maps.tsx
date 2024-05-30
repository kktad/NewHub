import { ComponentProps } from "lib/component-props";

type POI = {
    title: {
        value: string
    },
    type: {
        value: string
    },
    description: {
        value: string
    },
    image: {
        field: {
            href: string
        }
    },
    pOIPage: {
        value: string
    }
};
interface Fields {
    data: {
        datasource: {
            mode: {
                value: string
            },
            centralPointMode: {
                value: string
            },
            centralPointLatidiute: {
                value: string
            },
            centralPointLongitude: {
                value: string
            },
            zoom: {
                value: number
            },
            pOI: {
                targetItems: POI[]
            },
            width: {
                value: string
            },
            height: {
                value: string
            }
        }
    }
}
type MapProps = ComponentProps & {
    fields: Fields;
};
export const Default = (props: MapProps): JSX.Element => {
    console.log(props.fields.data.datasource)
    return (
        <div>
            Map Component
        </div>
    );
}