// local imports
import { ICONS } from '../../constants';

const Slide = ({ slide, show }) => {
    return (
        <div
            className={`flex w-full h-full rounded-lg bg-hero-back flex-shrink-0 transition-opacity duration-700 ease-in-out ${show ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="flex flex-col w-3/4 h-full pl-16 py-11 text-primary-text">
                <p className="text-xl italic font-semibold">{slide.title}</p>
                <p className="text-xl italic font-semibold">{slide.subtitle}</p>
                <p className="flex items-center flex-grow italic">{slide.description}</p>
                <div
                    onClick={slide.onClick}
                    className="flex items-center justify-center w-40 h-10 gap-2 px-3 py-2 rounded-lg cursor-pointer bg-secondary hover:ring-1 hover:ring-primary-text"
                >
                    <ICONS.Plus className="w-4 h-4 stroke-primary-text" />
                    <p className="font-semibold">Register Now</p>
                </div>
            </div>
            <div className="relative w-1/4">
                <img
                    src={slide.image}
                    alt="slide-image"
                    className="absolute object-cover -top-10 h-[calc(100%+38px)]"
                />
            </div>
        </div>
    );
};

export default Slide;
