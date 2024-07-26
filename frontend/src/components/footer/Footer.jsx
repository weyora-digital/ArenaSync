// local imports
import { ICONS, DATA } from '../../constants';
import Section from './Section';

const Footer = () => {
    return (
        <footer className="grid grid-cols-2 bg-gradient-to-b from-dark-secondary">
            <div className="flex flex-col items-start justify-center gap-5 px-10">
                <img src={ICONS.logo} alt="" className="inline" />
                <p className="text-sm italic text-inactive-light">
                    Halo 2 is a 2004 first-person shooter game developed by Bungie and published by
                    Microsoft Game Studios for the Xbox console. Halo 2 is the second installment in
                    the Halo franchise and the sequel to 2001S critically acclaimed Halo. Combat
                    Evolved
                </p>
            </div>
            <div className="grid grid-cols-3">
                {DATA.footerSections.map((section) => (
                    <Section key={section.title} {...section} />
                ))}
            </div>
        </footer>
    );
};

export default Footer;
