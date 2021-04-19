
import './Item.css'
var Item = ({id,note,changeSelected,selectedItem}) => {
    return (
        <div className="custom-div">
            <button className={selectedItem ? "btn color-r custom-btn " : "btn color-p custom-btn"  } onClick={()=>changeSelected(id)}>{note.doc}</button>
        </div>
    )
}
export default Item;
