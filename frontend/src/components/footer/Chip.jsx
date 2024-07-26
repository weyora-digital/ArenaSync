const Chip = ({ text }) => {
    return (
        <div className="px-1.5 py-0.5 text-xs font-semibold rounded-full bg-chip-back text-secondary-dark">
            {text}
        </div>
    );
};

export default Chip;
