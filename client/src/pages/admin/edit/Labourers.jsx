import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Labourers.sass';

function Labourers() {
  const navigate = useNavigate();
  const [labourers, setLabourers] = useState([]);
  const [newLabourer, setNewLabourer] = useState({ email: '', name: '', surname: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      console.log('Brak tokenu autoryzacyjnego');
      navigate('/');
    }

    async function fetchLabourersData () {
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
    fetchLabourersData();
  }, [navigate]);

  const handleInputChange = (e) => {
    setNewLabourer({ ...newLabourer, [e.target.name]: e.target.value });
  };

  const addLabourer = (e) => {
    e.preventDefault();

    async function fetchData () {
      let response = await fetch('http://localhost:3000/api/create/labourer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(newLabourer)
      });
      if (!response.ok) {
        throw new Error('Błąd podczas dodawania pracownika');
      }
      setLabourers([...labourers, newLabourer]);
      setNewLabourer({ email: '', name: '', surname: '', password: '' }); // Reset formularza

    }
    fetchData();
  };
  const removeLabourer = (labourerEmail) => {
    async function deleteLabourer(email) {
      try {
        const response = await fetch(`http://localhost:3000/api/delete/labourer`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({ email: email })
        });

        if (!response.ok) {
          throw new Error('Failed to delete the labourer');
        }

        // Update the state only if deletion was successful
        setLabourers(currentLabourers => 
          currentLabourers.filter(labourer => labourer.email !== email)
        );

      } catch (error) {
        console.error('Error during deletion:', error);
        // Handle the error (e.g., show an alert or a notification)
      }
    }

    deleteLabourer(labourerEmail);
};
  // const removeLabourer = (labourerEmail) => {
  //    console.log(labourerEmail)
  //   async function deleteLabourer (email) {
  //     console.log(email)
  //     await fetch(`http://localhost:3000/api/delete/labourer`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  //       },
  //       body: JSON.stringify({ email: email })
  //     });
  //   }
  //   deleteLabourer(labourerEmail);
  //   setLabourers(labourers.filter(labourer => labourer.email !== labourerEmail));
  // };






  const confirmRemoveLabourer = (labourerEmail) => {
    
    const confirm = window.confirm("Czy na pewno chcesz usunąć pracownika?");
    if (confirm) {
      console.log(labourerEmail)
      removeLabourer(labourerEmail);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="labourers-container">
      <h1>EDYTUJ PRACOWNIKÓW</h1>
      <p>Na tej podstronie z uprawnieniami Administratora lub Właściciela, możesz usuwać lub dodawać istniejące konta Pracowników.</p>
      <h2>DODAJ PRACOWNIKA</h2>
      <form onSubmit={addLabourer} className="labourer-form">
        <input
          type="text"
          name="email"
          placeholder="E-mail"
          value={newLabourer.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Imię"
          value={newLabourer.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="surname"
          placeholder="Nazwisko"
          value={newLabourer.surname}
          onChange={handleInputChange}
        />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Hasło"
          value={newLabourer.password}
          onChange={handleInputChange}
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? "Ukryj hasło" : "Pokaż hasło"}
        </button>
        <button type="submit">Dodaj pracownika</button>
      </form>
      <div className="existing-labourers">
        <h2>USUŃ PRACOWNIKA</h2>
        <div className="labourers-list">
          {labourers.map((labourer) => (
            <div key={labourer.id} className="labourer-card">
              <div className="labourer-info">
                <div className="labourer-id">id: {labourer.id}</div>
                <p><strong>E-mail:</strong> {labourer.email}</p>
                <p><strong>Imię:</strong> {labourer.name}</p>
                <p><strong>Nazwisko: </strong>{labourer.surname}</p>
              </div>
              <button onClick={() => confirmRemoveLabourer(labourer.email)} className="remove-button">Usuń</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Labourers;
