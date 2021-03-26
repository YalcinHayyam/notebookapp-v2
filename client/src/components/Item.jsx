

import './Item.css'
var Item = ({id,note,changeSelected}) => {

    return (
        <div className="custom-div">
            {/* Seçili notu değiştirme metodu çağırrma ve not adı  */}
            <button className="btn color-p custom-btn"  onClick={(e)=>changeSelected(e,id)}>{note.doc}</button>
        </div>
    )
}
export default Item;
