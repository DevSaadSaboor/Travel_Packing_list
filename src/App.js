import { useState } from 'react';
import './App.css';

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Laptop", quantity: 1, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

function App() {
  const [item, setItems] = useState([])

  function handleAddItems(items) {
    setItems((item) => [...item, items])
  }
  function handleDeleteItems(id) {
    setItems((item) => item.filter((item) => item.id !== id))
  }
  function toggleItem(id) {
    setItems((items) => items.map((item) => item.id === id ? { ...item, packed: !item.packed } : item))
  }
  function clearList() {
    const confirmed = window.confirm("Are you sure you want to delete all items? ")
    if (confirmed) {
      setItems([])
    } else {
      alert("Request Cancelled")
    }
  }

  return (
    <div className=''>
      <Logo></Logo>
      <Form handleAddItems={handleAddItems}></Form>
      <PackingList item={item} handleDeleteItems={handleDeleteItems} toggleItem={toggleItem} clearList={clearList} />
      <Stats item={item} />
    </div>
  );
}

function Logo() {
  return <>
    <h1>🏝 Far Away 💼 </h1>
  </>
}
function Form({ handleAddItems }) {
  const [description, setDescription] = useState("")
  const [quantity, setQunatity] = useState(1)



  function handleSubmit(e) {
    e.preventDefault()
    if (!description) return
    const newItem = { quantity, description, packed: false, id: Date.now() }
    console.log(newItem);

    handleAddItems(newItem)


    setDescription("")
    setQunatity(1)

  }
  return (
    <form className='add-form' onSubmit={handleSubmit} >
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

function PackingList({ item, handleDeleteItems, toggleItem, clearList }) {
  const [sort, setSortBy] = useState("input")

  let sorteditems;
  if (sort === "input") sorteditems = item;

  if (sort === "description") sorteditems = item.slice().sort((a, b) => a.description.localeCompare(b.description))

  if (sort === "packed") sorteditems = item.slice().sort((a, b) => Number(a.packed) - Number(b.packed))
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
function Item({ item, handleDeleteItems, toggleItem }) {
  return <li>
    <input value={item.packed} type='checkbox' onChange={() => toggleItem(item.id)} />
    <span style={item.packed ? { textDecoration: "line-through" } : {}}>
      {item.quantity} {item.description}
    </span>
    <button onClick={() => handleDeleteItems(item.id)}>❌</button>
  </li>
}

function Stats({ item }) {
  const checkItemPacked = item.length
  const numpacked = item.filter((item) => item.packed).length;
  const itemPercentage = Math.round((numpacked / checkItemPacked) * 100)
  return (
    <footer>
      {
        itemPercentage === 100 ? "You got Everything Packed Ready to Go ✈ " :
          `💼 You have ${checkItemPacked} items on your list, you already packed ${numpacked} ${itemPercentage}%  `
      }
    </footer>
  )
}



export default App;
