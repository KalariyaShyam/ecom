import "./Button.css"

function Button({ buttonText, buttonClick, buttonClass }) {

    let btnClass = (buttonClass) ? buttonClass : "primary";

    return (
        <>
            <button onClick={buttonClick} className={`btn ${btnClass}`}>{buttonText}</button>
        </>
    );
}

export default Button;