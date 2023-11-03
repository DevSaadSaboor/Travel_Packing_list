import { useState } from 'react';
import { Item } from './Item';

export function PackingList({ item, handleDeleteItems, toggleItem, clearList }) {
    const [sort, setSortBy] = useState("input");

    let sorteditems;
    if (sort === "input") sorteditems = item;

    if (sort === "description") sorteditems = item.slice().sort((a, b) => a.description.localeCompare(b.description));

    if (sort === "packed") sorteditems = item.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
    return (
        <div className='list'>
            {sorteditems.map((item) => (
                <Item key={item.id} item={item} handleDeleteItems={handleDeleteItems} toggleItem={toggleItem} />
            ))}
            <select key="value" value={sort} onChange={(e) => setSortBy(e.target.value)}>
                <option value="input">SORT BY INPUT ORDER</option>
                <option value="description">SORT BY DESCCRIPTION</option>
                <option value="packed">SORT BY PACKED STATUS</option>
            </select>
            <button onClick={clearList}>Clear List</button>
        </div>

    );
}
