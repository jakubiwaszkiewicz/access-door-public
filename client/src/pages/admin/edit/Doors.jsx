import { useState, useEffect } from 'react';
import './Doors.sass';

function Doors() {
  const [doors, setDoors] = useState([]);
  const [doorName, setDoorName] = useState('');
  const [doorDescription, setDoorDescription] = useState('');

  // Funkcja do pobierania istniejących drzwi z bazy danych
  useEffect(() => {
    async function fetchData () {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch('http://localhost:3000/api/read/doors',{
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      if (!response.ok) {
        throw new Error('Problem z pobieraniem drzwi');
      }
      const data = await response.json();
      setDoors(data);
    }
    fetchData();
  }, []);

  // Funkcja do dodawania nowych drzwi
  function handleAddDoor () {
    async function addDoor () {
      await fetch('http://localhost:3000/api/create/door', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify({
          name: doorName,
          description: doorDescription
        })
      });
    }
    addDoor();
    window.location.reload(false);
  
  }



  // const addDoor = async (e) => {
  //   e.preventDefault();
  //   const authToken = localStorage.getItem("authToken");
  //   console.log(authToken)
  //   const response = await fetch('http://localhost:3000/api/create/door', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${authToken}`
  //     },
  //     body: JSON.stringify({
  //       name: doorName,
  //       description: doorDescription
  //     }),
  //   });
  //   const contentType = response.headers.get('content-type');
  //   if (!response.ok) {
  //     throw new Error('Problem z dodawaniem drzwi');
  //   } else if (contentType && contentType.includes('application/json')) {
  //     const { error } = await response.json();
  //     if (error) {
  //       throw new Error(error);
  //     }
  //   }
  //   const addedDoor = await response.json();
  //   setDoors([...doors, addedDoor]); // Dodaj nowe drzwi do stanu
  //   console.log(addedDoor)
  //   setDoorName(''); // Wyczyść pola formularza
  //   setDoorDescription('');

  // }
  


  useEffect(() => {
    console.log(doors);
    console.log(doorName)
  },[doors, doorName]);

  // Funkcja do usuwania drzwi
  const removeDoor = async (name) => {
    const authToken = localStorage.getItem("authToken");
    const response = await fetch(`http://localhost:3000/api/delete/door/`,{
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name })
    })
    if (!response.ok) {
      throw new Error('Problem z usuwaniem drzwi');
    };
    setDoors(doors.filter(door => door.name !== name));
  };

  return (
    <div className="doors-container">
      <div className="add-door-form">
        <h2>DODAJ DRZWI</h2>
        <form onSubmit={handleAddDoor}>
          <input 
            type="text" 
            placeholder="Nazwa drzwi" 
            value={doorName}
            onChange={e => setDoorName(e.target.value)} 
            required 
          />
          <input 
            type="text" 
            placeholder="Opis drzwi" 
            value={doorDescription}
            onChange={e => setDoorDescription(e.target.value)} 
            required 
          />
          <button type="submit" className="add-button">Dodaj</button>
        </form>
      </div>
      <div className="existing-doors">
        <h2>OBECNIE ISTNIEJĄCE DRZWI</h2>
        <div className="doors-list">
          {doors.map((door) => (
            <DoorItem key={door.id} name={door.name} id={door.id} removeDoor={removeDoor} />
          ))}
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function DoorItem({ id, name, removeDoor }) {
  return (
    <div className="door-card">
      <div className="door-name">Nazwa: {name}</div>
      <button onClick={() => removeDoor(name)} className="remove-button">Usuń</button>
    </div>
  );
}

export default Doors;
