import { ICONS, IMAGES } from '../../constants';

const GameCard = () => {
    return (
        <div className="flex flex-col w-[280px] align-center p-3 rounded-lg ring-1 ring-inactive-text bg-secondary-dark">
            <img src={IMAGES.callOfDutyBanner} alt="game-banner" className="rounded-md" />
            <div className="relative">
                <div className="absolute flex items-center gap-2 py-1 pl-3 pr-4 bg-black rounded-full -top-3 left-5 ring-1 ring-inactive-text">
                    <img src={IMAGES.callOfDutyLogo} alt="game-logo" className="w-3 h-3" />
                    <p className="text-xs text-primary-text">Call of Duty</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 px-3 mt-6 mb-1">
                <p className="text-sm">21 fab-6 Mar, 08:00 PM</p>
                <p className="font-semibold">Call Of Duty Warzone Mobile</p>
                <p className="text-sm text-primary-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor...
                </p>
                <div className="flex justify-between mt-1">
                    <div className="">
                        <p className="mb-1 text-sm text-inactive-text">Win Price</p>
                        <div className="flex gap-2">
                            <img src={IMAGES.trophy} alt="trophy" className="w-6 h-6" />
                            <p className="font-semibold text-primary-text">28k LKR</p>
                        </div>
                    </div>
                    <div className="">
                        <p className="mb-1 text-sm text-inactive-text">Player Slot</p>
                        <div className="flex gap-2">
                            <img src={IMAGES.users} alt="players" className="w-6 h-6" />
                            <p className="font-semibold text-primary-text">4v4</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="p-2 rounded-full cursor-pointer bg-secondary group hover:ring-1 hover:ring-inactive-text">
                            <ICONS.NextArrow className="w-5 h-5 fill-primary-text group-hover:stroke-2 group-hover:stroke-primary-text" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
