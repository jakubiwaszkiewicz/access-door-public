import React, { useEffect, useState } from 'react';
import './Delete.sass';
import { useNavigate } from 'react-router-dom';

function Delete() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/'); // Przekieruj na stronę logowania, jeśli brak tokenu
    }

    async function fetchAdmins() {
      const response = await fetch('http://localhost:3000/api/read/labourers', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (!response.ok) {
        console.error('Problem z pobraniem listy administratorów');
        return;
      }

      const data = await response.json();
      const adminList = data.filter(user => user.isAdmin);
      setAdmins(adminList);
    }

    fetchAdmins();
  }, [navigate]);

  const removeAdminRights = async (email) => {
    const confirm = window.confirm("Czy na pewno chcesz usunąć przywileje administratora?");
    if (confirm) {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3000/api/privileges/delete', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setAdmins(prevAdmins => prevAdmins.filter(admin => admin.email !== email));
      } else {
        alert('Wystąpił błąd podczas usuwania uprawnień administratora.');
      }
    }
  };

  return (
    <div className="delete-container">
      <div className="delete-header">Usuwanie administratorów</div>
      <div className="delete-subtext">
        Na tej podstronie z uprawnieniami Właściciela, możesz usuwać innych administratorów.
      </div>
      <ul className="admins-list">
        {admins.map((admin) => (
          <li key={admin.id} className="admin-item">
            <span>{admin.email}</span>
            <button onClick={() => removeAdminRights(admin.email)} className="revoke-btn">
              Odbierz uprawnienia
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Delete;
