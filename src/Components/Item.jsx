
export function Item({ item, handleDeleteItems, toggleItem }) {
    return <li>
        <input value={item.packed} type='checkbox' onChange={() => toggleItem(item.id)} />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
            {item.quantity} {item.description}
        </span>
        <button onClick={() => handleDeleteItems(item.id)}>❌</button>
    </li>;
}
