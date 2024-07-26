import { useEffect, useState } from 'react';

// local imports
import { GameCard, Slide } from '../../components';
import { ICONS } from '../../constants';

const slides = [0, 1, 2];

const HomePage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <div className="z-10 flex flex-col flex-grow w-11/12 gap-8 mx-auto my-10">
            <div className="relative h-[320px] overflow-x-clip">
                <div
                    className="relative flex w-full h-full transition-transform duration-1000 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {slides.map((item) => (
                        <Slide key={item} show={item === currentIndex} />
                    ))}
                </div>
                <div className="absolute flex items-center justify-center w-full gap-2 bottom-3">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`${currentIndex === index ? 'w-4' : 'w-1'} h-1 bg-white rounded-full transition-all duration-500 ease-in-out`}
                        ></div>
                    ))}
                </div>
            </div>
            <div className="">
                <p className="text-sm uppercase tracking-subtitle">Trending</p>
                <div className="flex items-end justify-between mt-1 mb-5">
                    <h2 className="text-2xl font-semibold">{`Upcoming Match's`}</h2>
                    <div className="flex gap-5">
                        <div className="group">
                            <ICONS.LeftArrow className="cursor-pointer w-7 h-7 fill-inactive-text group-hover:fill-secondary" />
                        </div>
                        <div className="group">
                            <ICONS.RightArrow className="cursor-pointer w-7 h-7 fill-inactive-text group-hover:fill-secondary" />
                        </div>
                    </div>
                </div>
                <div className="flex gap-5">
                    <GameCard />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
