import Item from './Item'

const ItemList = ({items}) => {
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
                />
            ))}
        </div>
        </>
    );
};

export default ItemList ;