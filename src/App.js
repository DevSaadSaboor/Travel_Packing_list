import { useState } from 'react';
import './App.css';
import { Stats } from './Components/Stats';
import { PackingList } from './Components/PackingList';
import { Logo } from './Components/Logo';
import { Form } from './Components/Form';

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

export default App;
