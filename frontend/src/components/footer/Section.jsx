import { useNavigate } from 'react-router-dom';

// local imports
import Chip from './Chip';

const Section = ({ title, items }) => {
    const navigate = useNavigate();

    const handlePageChange = (page) => {
        navigate(page.path);
    };

    return (
        <div>
            <div className="px-3 py-2 my-5 border-l-2 border-l-inactive-text">
                <p className="mb-3 text-sm font-semibold text-inactive-text">{title}</p>
                <div className="flex flex-col gap-3 text-primary-text">
                    {items.map((item) => (
                        <div
                            key={item.text}
                            className={`flex items-center gap-4 cursor-pointer group text-inactive-light`}
                            onClick={() => handlePageChange(item)}
                        >
                            <item.icon
                                className={`w-5 h-5 fill-inactive-light group-hover:fill-primary-text`}
                            />
                            <p className="group-hover:text-primary-text group-hover:font-semibold">
                                {item.text}
                            </p>
                            {item.chip && <Chip text={item.chip} />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Section;
