import { Medicine } from "../models/Medicine";

interface Props {
    medicine: Medicine
    onAddToCart: (item: Medicine) => void;
    isAdded: boolean;
}

function MedicineCard(props: Props) {
    return (
        <div className="medicine-card">
            <img src={props.medicine.imageUrl} alt={props.medicine.name} className="medicine-image" />
            <div className="medicine-details">
                <h2 className="medicine-name">{props.medicine.name}</h2>
                <p className="medicine-description">{props.medicine.description}</p>
                <p className="medicine-price">Price: ${props.medicine.price}</p>
                <p className="medicine-stock">Stock: {props.medicine.stock}</p>
            </div>
            <button disabled={props.isAdded} onClick={() => props.onAddToCart(props.medicine)}>{props.isAdded ? "Already added" : "Add to cart"}</button>
        </div>
    );
}

export default MedicineCard;