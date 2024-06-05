import { ComponentProps } from "lib/component-props";

type CarouselSlide = {
    slideImage: string,
    slideText: string,
    slideLink: string

}
interface Fields {
    settings: {
        timeout: number,
        isPauseEnabled: boolean,
        transition: string
    },
    items: CarouselSlide[]
}
type CarouselProps = ComponentProps & {
    fields: Fields;
};
export const Default = (props: CarouselProps): JSX.Element => {
    console.log(props)
    console.log(props.fields.items)
    return (
        <div>
            Carousel Component
        </div>
    );
}