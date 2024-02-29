import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Accesses.sass';

function Accesses() {
  const navigate = useNavigate();
  const [accesses, setAccesses] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
  
    if (!authToken) {
      console.log('Brak tokenu autoryzacyjnego');
      navigate('/login');
      return;
    }

    async function fetchAccesses() {
      try {
        const response = await fetch('http://localhost:3000/api/read/access', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        let data = await response.json();
    
        // Upewniamy się, że każdy dostęp ma powiązany obiekt door
        const filteredAccesses = data
          .filter(access => access.door) // Sprawdza czy istnieje obiekt door
          .map(access => {
            return {
              doorName: access.door.name, // Nazwa drzwi
              doorID: access.door.id, // ID drzwi
              
            };
          });
    
        setAccesses(filteredAccesses);
    
      } catch (error) {
        console.error("Fetching error:", error);
      }
    }
    
    fetchAccesses();
  }, [navigate]);

  return (
    <div className="accesses-container">
      <h1>Dostępy do Drzwi</h1>
      {accesses.length > 0 ? (
        <ul className="access-list">
          {accesses.map((access, index) => (
            <li key={index} className="access-item">
              {access.doorName}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-access-message">Brak dostępów.</p>
      )}
    </div>
  );
  
}

export default Accesses;
