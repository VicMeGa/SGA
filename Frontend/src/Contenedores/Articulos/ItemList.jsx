import Item from './Item'

const ItemList = ({items, onSelect}) => {

    return(
        <>
        <div className='listaArticulos'>
            {items.map((item) => (
                <Item 
                    key = {item.id}
                    image = {item.image}
                    name = {item.name}
                    description = {item.description}
                    status = {item.status}
                    onClick={() => onSelect(item.id)}
                />
            ))}
        </div>
        </>
    );
};

export default ItemList ;