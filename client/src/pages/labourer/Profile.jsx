import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.sass';

function Profile() {
  const navigate = useNavigate(); // Hook do nawigacji
  const [labourerData, setLabourerData] = useState({
    name: '',
    surname: '',
    email: '',
    isAdmin: false,
    isOwner: false
    // Hasło nie powinno być przechowywane ani wyświetlane
  });

  useEffect(() => {
    const authToken = localStorage.getItem('authToken'); // Pobierz token z localStorage

    if (!authToken) {
      // Przekierownaie na strone logowania
      navigate('/');
      return;
    }

    async function fetchLabourerData () {
      let response = await fetch('http://localhost:3000/api/read/labourer', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      response = await response.json()
      setLabourerData({
        name: response.name,
        surname: response.surname,
        email: response.email,
        isAdmin: response.isAdmin,
        isOwner: response.isOwner
      })
    }
    fetchLabourerData();
  }, [navigate]);

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2 className="profile-header">Profil Pracownika</h2>
        <div className="profile-info">
          <div className="data-card">Imię: <strong>{labourerData.name}</strong></div>
          <div className="data-card">Nazwisko: <strong>{labourerData.surname}</strong></div>
          <div className="data-card">Email: <strong>{labourerData.email}</strong></div>
          {
            labourerData.isAdmin && !labourerData.isOwner && <div className="data-card">Rola: <strong>Administrator</strong></div>
          }
          {
            labourerData.isOwner && <div className="data-card">Rola: <strong>Właściciel</strong></div>
          }
        </div>
      </div>
    </div>
  );
}

export default Profile;
