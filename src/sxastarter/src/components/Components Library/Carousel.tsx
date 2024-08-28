import { ComponentProps } from "lib/component-props";
import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

type CarouselSlide = {
    slideImage: string,
    slideText: string,
    slideLink: string

}
interface Fields {
    settings: {
        timeout: number,
        isPauseEnabled: boolean,
        transition: string,
        navigationType: string
    },
    items: CarouselSlide[]
}
type CarouselProps = ComponentProps & {
    fields: Fields;
};

export const Default = (props: CarouselProps): JSX.Element => {    
    const transitionVal = props.fields.settings.transition
    var transitionFade = (transitionVal == 'BasicTransition') ? true : false
    var transitionVerticalSlide = (transitionVal == 'SlideVerticallyTransition') ? true : false
    const navType = props.fields.settings.navigationType
    var customBullet = (navType == 'Bullets' || 'BulletsWithPreviousNext') ? true : false
    var customArrow = (navType == 'PreviousNext' || 'NumbersWithPreviousNext' || 'BulletsWithPreviousNext') ? true : false
    if(navType == 'None' || navType == 'PreviousNext'){
        customBullet = false
    }
    if(navType == 'None' || navType == 'Bullets'){
        customArrow = false
    }

    var settings = {
        autoplay:true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: customBullet,
        arrows: customArrow,        
        adaptiveHeight: true,
        fade: transitionFade,
        vertical: transitionVerticalSlide
      };

    const CarouselContent = props.fields.items.map((element: CarouselSlide) => ( 
        <div key={element.slideImage}>
            <img src={element.slideImage} alt="" />           
            <div className="slide-info">
                <div className="field-slidetext">
                    <h2>{element.slideText}</h2>
                </div>
            </div>
        </div>
    ))
    
    return(
        <div>                            
            <Slider {...settings} > 
                {CarouselContent}
            </Slider>    
        </div>
    );
}   