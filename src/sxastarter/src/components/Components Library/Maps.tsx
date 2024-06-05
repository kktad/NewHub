import { ComponentProps } from "lib/component-props";
import React from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


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
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        //googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
        googleMapsApiKey: "AIzaSyB0yaPcysmf-LVdUvoNgF2bkWzHmqgD6jE"
      })
    
    console.log(props.fields.data.datasource.mode)
    return isLoaded ? (
        <div>
            <GoogleMap mapContainerStyle={{
                margin: "auto",
                width: "100%",
                height: "300px"
                }}
                center={{
                    lat: 37.792950,
                    lng: -122.398102
                }}
                zoom={17}
                mapTypeId={google.maps.MapTypeId.ROADMAP}>
            </GoogleMap>
        </div>
    ): <></>;
}