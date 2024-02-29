import { useEffect, useState } from 'react';
import './Add.sass';

function Add() {
  const [labourers, setLabourers] = useState([]);
  const [user, setUser] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedLabourerEmail, setSelectedLabourerEmail] = useState(null);

  useEffect(() => {
    const fetchLabourers = async () => {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3000/api/read/labourers', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const data = await response.json();
      // Filtrowanie tylko administratorów
      setLabourers(data);
    };
    const fetchUser = async () => {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3000/api/read/labourer', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
    fetchLabourers();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  // http://localhost:3000/api/update/privileges/add
  // Add this function inside your Add component
  const handleAddAdmin = async (labourerEmail) => {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch('http://localhost:3000/api/update/privileges/add', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ email: labourerEmail })
    });

    if (response.ok) {
      // Update state to reflect the new admin status
      setLabourers(labourers.map(labourer =>
        labourer.email === labourerEmail ? { ...labourer, isAdmin: true } : labourer
      ));
    } else {
      // Handle errors
      console.error('Failed to add admin privileges');
    }
  };

  const handleSetOwner = (labourerEmail) => {
    setSelectedLabourerEmail(labourerEmail);
    setShowConfirm(true);
  };

  const confirmNewOwner = async () => {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch('http://localhost:3000/api/update/privileges/transfer', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ email: selectedLabourerEmail })
    });

    if (response.ok) {
      setShowConfirm(false);
      // Zaktualizuj stan, aby odzwierciedlić zmianę właściciela
      setLabourers(labourers.map(labourer =>
        labourer.email === selectedLabourerEmail ? { ...labourer, isOwner: true } :
        { ...labourer, isOwner: false }
      ));
    } else {
      // Obsługa błędów
      console.error('Nie udało się zmienić właściciela');
    }
  };

  return (
    <>
      {showConfirm && (
        <ConfirmDialog
          onConfirm={confirmNewOwner}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <div className="add-container">
        <div className="add-header">Zmiana właściciela</div>
        <div className="add-subtext">Na tej podstronie z uprawnieniami Właściciela możesz przekazać swoje uprawienia innemu administratorowi. Właścicielem może zostać tylko administator, dlatego również istnieje funckja dodania uprawnień administratora.</div>
        <div className="labourers-list">
          {labourers.map((labourer) => (
            <LabourerCard 
              key={labourer.id} 
              labourer={labourer} 
              onSetOwner={() => handleSetOwner(labourer.email)}
              handleAddAdmin={handleAddAdmin}
              isOwner={labourer.isOwner}
            />
          ))}
        </div>
      </div>
    </>
  )
}
// eslint-disable-next-line react/prop-types
function LabourerCard({ labourer, onSetOwner, isOwner, handleAddAdmin }) {
  return (
    <div className={`labourer-card ${isOwner ? 'owner' : ''}`}>
      <div className="labourer-info">
        <div className="labourer-email">{labourer.email}</div>
        <div className="labourer-status">
          {labourer.isAdmin && <span>Admin</span>}
          {isOwner && <span>Owner</span>}
        </div>
      </div>
      <div className="labourer-actions">
        {!isOwner && (
          <button onClick={() => onSetOwner(labourer.email)} className="set-owner">
            Ustaw jako Ownera
          </button>
        )
        }
        {!labourer.isAdmin && (
          <button onClick={() => handleAddAdmin(labourer.email)} className="add-admin">
            Dodaj jako Admina
          </button>
        )}
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function ConfirmDialog({ onConfirm, onCancel }) {
  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <p>Czy na pewno chcesz zmienić właściciela?</p>
        <button onClick={onConfirm} className="confirm-yes">Tak</button>
        <button onClick={onCancel} className="confirm-no">Nie</button>
      </div>
    </div>
  );
}

export default Add;
