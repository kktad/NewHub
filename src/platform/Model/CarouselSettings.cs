namespace ComponentsLibrary.Model
{
    public class CarouselSettings
    {
        public CarouselNavigation NavigationType { get; set; }

        public int Timeout { get; set; }

        public bool PauseEnabled { get; set; }

        public string Transition { get; set; }
    }
}