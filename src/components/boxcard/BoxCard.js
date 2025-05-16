import "./BoxCard.css";


function BoxCard({ width, children }) {

    return (
        <>
            <div className={`card-section ${width}`}>
                {children}
            </div>
        </>
    )

}


export default BoxCard;