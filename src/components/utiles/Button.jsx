import ButtonLoader from "./ButtonLoader";

const Button = ({ isLoading, onClick, text, className }) => {
    return (
        <button
            onClick={(e) => { e.preventDefault(); onClick(); }} type='submit'
            className={`
            bg-buttonColour text-bgColour uppercase
             font-extrabold p-[13px] text-center rounded
              cursor-pointer font-buttonFont hover:bg-buttonHoverColour
               hover:text-textColour 
               transition duration-300 ease-linear ${className}
                flex justify-center items-center`}
            style={{ minWidth: '100px', height: '45px' }}>
            {isLoading
                ? <ButtonLoader />
                : <span>{text}</span>}
        </button>
    );
};
export default Button