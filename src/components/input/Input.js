import "./Input.css"

function Input({ type, nameInput, updateInput, phInput, label, value, min }) {
    return (
        <div className="input-box">
            <label>{label}</label>
            {(type == "number") ?
                <input type={type} name={nameInput} onChange={updateInput} placeholder={phInput} value={value} min={min} />
                : <input type={type} name={nameInput} onChange={updateInput} placeholder={phInput} value={value} />
            }
        </div>
    );
}

export default Input;