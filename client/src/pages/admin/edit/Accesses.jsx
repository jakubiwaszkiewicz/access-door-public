import { useEffect, useState } from 'react';
import './Accesses.sass';

function Accesses() {
  const [labourers, setLabourers] = useState([]);
  const [doors, setDoors] = useState([]);
  const [accesses, setAccesses] = useState([]);
  const [newAccess, setNewAccess] = useState({ labourerEmail: '', doorName: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const authToken = localStorage.getItem('authToken');

    async function fetchUsersData () {
      let response = await fetch('http://localhost:3000/api/read/labourers', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      if (!response.ok) {
        throw new Error('Błąd podczas pobierania danych o pracownikach');
      }
      response = await response.json()
      setLabourers(response);
    }

    async function fetchDoorsData () {
      let response = await fetch('http://localhost:3000/api/read/doors', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      if (!response.ok) {
        throw new Error('Błąd podczas pobierania danych o drzwiach');
      }
      response = await response.json()
      setDoors(response);
    }
    async function fetchAccessesData () {
      let response = await fetch('http://localhost:3000/api/read/accesses', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      if (!response.ok) {
        throw new Error('Błąd podczas pobierania danych o przydzielonych dostępach');
      }
      response = await response.json()
      setAccesses(response);
    }

    async function fetchData() {
      try {
        await fetchUsersData();
        await fetchDoorsData();
        await fetchAccessesData();
      } catch {
        console.log('Błąd podczas pobierania danych');
      } finally {
        setIsLoading(false);
      }
      
    }
    fetchData();
  },[])

  function handleDeleteAccess (email, name, labourerID, doorID) {
    setAccesses(accesses.filter((access) => access.labourerID !== labourerID && access.doorID !== doorID))
    async function deleteAccess (email, name) {
      await fetch(`http://localhost:3000/api/delete/access`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({email: email, name: name})
      });
    }
    deleteAccess(email, name);
    window.location.reload(false);
  }

  const handleNewAccessChange = (event) => {
    setNewAccess({
      ...newAccess,
      [event.target.name]: event.target.value
    });
  }
  function handleAddAccess () {
    async function addAccess () {
      await fetch('http://localhost:3000/api/create/access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({email: newAccess.labourerEmail, name: newAccess.doorName})
      });
    }
    addAccess();
    window.location.reload(false);
  }
 
  return (
    <div className="access-container">
      <h1>EDYTUJ DOSTEPY</h1>
      <h2>PRZYDZIEL DOSTĘP</h2>
      <form onSubmit={handleAddAccess} className='add-access-form'>
        <select
          name="labourerEmail"
          value={newAccess.labourerEmail}
          onChange={handleNewAccessChange}
        >
          <option value="">Wybierz pracownika</option>
          {labourers.filter(
            (labourer) => labourer.isAdmin === false
          ).map((labourer) => (
            <option key={labourer.id} value={labourer.email}>
              {labourer.name} {labourer.surname}
            </option>
          ))}
        </select>
        <select
          name="doorName"
          value={newAccess.doorName}
          onChange={handleNewAccessChange}
        >
           <option value="">Wybierz drzwi</option>
          {doors.map((door) => (
            <option key={door.id} value={door.name}>
              {door.name}
            </option>
          ))}
        </select>

        <button
          className={
            newAccess.labourerEmail === '' || newAccess.doorName === '' ?
            'add-access-button disabled' :
            'add-access-button'}
          type='submit'
        >Przydziel dostęp</button>
      </form>


      
      <h2>USUŃ DOSTĘP</h2>
      <div className='delete-access-container'>
        {accesses.map((access) => {
          return (
            <div className="delete-access__labourer" key={access.id}>
              <p>Pracownik: {labourers.filter((labourer) => labourer.id === access.labourerID)[0].name} {labourers.filter((labourer) => labourer.id === access.labourerID)[0].surname}</p>
              <p>Drzwi: {doors.filter((door) => door.id === access.doorID)[0].name}</p>
              <button
                className="remove-button"
                onClick={() => {
                  handleDeleteAccess(
                    labourers.filter((labourer) => labourer.id === access.labourerID)[0].email,
                    doors.filter((door) => door.id === access.doorID)[0].name),
                    access.labourerID,
                    access.doorID
                  }}>
                  Usuń
              </button>
            </div>
          )
      })}
      </div>
    </div>
  );
}

export default Accesses;