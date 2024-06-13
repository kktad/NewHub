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
    const data = props.fields.data.datasource
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!
    })
    const containerStyles = {
        width: parseFloat(data.width.value)+'%',
        height: parseFloat(data.height.value)
        }
    const center = {
        lat: parseFloat(data.centralPointLatidiute.value),
        lng: parseFloat(data.centralPointLongitude.value)
    }    
    const zoom = Number(data.zoom.value)    
    const mode = data.mode.value.toLowerCase() 
    console.log(data.mode.value.toLowerCase()) 
    
    return isLoaded ? (
        <div>
            <GoogleMap mapContainerStyle={containerStyles}
                center={center}
                zoom={zoom}
                mapTypeId={mode}>
            </GoogleMap>
        </div>
    ): <></>;
}