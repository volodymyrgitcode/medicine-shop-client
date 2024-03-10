import { Medicine } from "../../models/Medicine";
import "./MedicineCard.css"

interface Props {
    medicine: Medicine
    onAddToCart: (item: Medicine) => void;
    isAdded: boolean;
}

function MedicineCard(props: Props) {
    return (
        <>
            <div className='medicine-card' key={props.medicine.id}>
                <div className='img-container'>
                    <img src={props.medicine.imageUrl} alt={props.medicine.name} className="" />
                </div>

                <h2 className="medicine-name">{props.medicine.name}</h2>
                <p className="medicine-description">{props.medicine.description}</p>
                <div className='price-button-container'>
                    <p className="medicine-price">${(Number(props.medicine.price) || 0).toFixed(2)}</p>
                    <button disabled={props.isAdded || props.medicine.stock <= 0} className='button-primary' onClick={() => { props.onAddToCart(props.medicine) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-basket3-fill" viewBox="0 0 16 16">
                            <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}

export default MedicineCard;

