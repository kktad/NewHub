import { LinkField } from "@sitecore-jss/sitecore-jss-nextjs";
import { ComponentProps } from "lib/component-props";
import React, {  useState } from 'react';

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
    const imgs=[
        {id:0,value:"https://styleguide.sitecoredemo.com/styleguide/-/media/Project/Sitecore/Styleguide/Components/Gallery/city.jpg"},
        {id:1,value:"https://styleguide.sitecoredemo.com/styleguide/-/media/Project/Sitecore/Styleguide/Components/Gallery/bike.jpg"},
        {id:2,value:"https://styleguide.sitecoredemo.com/styleguide/-/media/Project/Sitecore/Styleguide/Components/Gallery/mountains.jpg"},
      ]
     const videoRep =  props.fields.data.datasource.galleryVideos.results[1].videoID.value
    // console.log(videoRep, "meenal")
    const [wordData,setWordData]=useState(imgs[0])
    const [val,setVal] = useState(0)
    const handleClick=(index: number)=>{
      console.log(index)
      setVal(index)
      const wordSlider=imgs[index];
      setWordData(wordSlider)
    }
    const handleNext = ()=>{
      let index = val < imgs.length -1 ? val +1 : 0;
      setVal(index)
      const wordSlider=imgs[index];
      setWordData(wordSlider)
    }
    const handlePrevious = ()=>{
      let index = val <= imgs.length -1 && val > 0? val - 1 : 0;
      setVal(index)
      const wordSlider=imgs[index];
      setWordData(wordSlider)
    }
    return (
        <div className="main">
            <div className ="carousel-image-wrapper">
                <div className='arrows prev' onClick={handlePrevious}></div>
                <img className="main-carousel-image" src={wordData.value} height="300" width="500" /> 
                <div className='arrows next' onClick={handleNext}></div>
            </div>
            <div className='flex_row thumbnail-images'>
                {imgs.map((data,index)=>
                <div className="thumbnail" key={index} >
                    <img className={wordData.id==index?"clicked":""} src={data.value} onClick={()=>handleClick(index)} height="70" width="100" />
                    {/* <video  controls autoPlay src={videoRep}/> */}
                </div>
                )}
            </div>         
      </div>
    );
}