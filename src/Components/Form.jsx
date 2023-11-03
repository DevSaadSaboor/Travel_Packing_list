import { useState } from 'react';

export function Form({ handleAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQunatity] = useState(1);



    function handleSubmit(e) {
        e.preventDefault();
        if (!description) return;
        const newItem = { quantity, description, packed: false, id: Date.now() };
        console.log(newItem);

        handleAddItems(newItem);


        setDescription("");
        setQunatity(1);

    }
    return (
        <form className='add-form' onSubmit={handleSubmit}>
            <h3>What do you need for your 😉 trips</h3>
            <select value={quantity} onChange={(event) => setQunatity(Number(event.target.value))}>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input type='text' placeholder='item....' value={description} onChange={(event) => setDescription(event.target.value)} />
            <button>Add</button>
        </form>
    );
}
