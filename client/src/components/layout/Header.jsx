import { useEffect, useState } from 'react';
import './Header.sass';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false); // [TODO
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userInfo = JSON.parse(localStorage.getItem('user'));

    async function fetchData () {
      let response = await fetch('http://localhost:3000/api/read/labourer', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      response = await response.json()
      setUserData(response);
    }

    if (userInfo || userData) {
      setUserData(userInfo);
    } else {
      fetchData();
    }
  },[])

  useEffect(() => {
    if (userData.isAdmin) {
      setIsAdmin(true);
    }
    if (userData.isOwner) {
      setIsOwner(true);
    }

  }, [userData])

  function logOutButton() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/');
  }

  function toggleHamburgerMenu() {
    setIsHamburgerOpen(!isHamburgerOpen);

  } 

  return (
    <div className="header">
      <button className="hamburger-button" onClick={toggleHamburgerMenu}>
        PANEL STEROWANIA
      </button>
      <div className={isHamburgerOpen ? "menu open" : "menu"}>
        {
          (isAdmin || isOwner) && (
            <>
              <Link to="/admin/edit/accesses"><button className="header-button">EDYTUJ DOSTĘPY</button></Link>
              <Link to="/admin/edit/doors"><button className="header-button">EDYTUJ DRZWI</button></Link>
              <Link to="/admin/edit/labourers"><button className="header-button">EDYTUJ PRACOWNIKÓW</button></Link>
            </>
          )
        }
        {
          isOwner && (
            <>
              <Link to="/owner/privileges/add"><button className="header-button">DODAJ PRZYWILEJE</button></Link>
              <Link to="/owner/privileges/delete"><button className="header-button">USUŃ PRZYWILEJE</button></Link>
            </>
          )
        }
        {
          (!isAdmin && !isOwner) && <Link to="/labourer/accesses"><button className="header-button">DOSTĘPY</button></Link>
        }
        <Link to="/labourer/profile"><button className="header-button">PROFIL</button></Link>
        <button className="header-button" onClick={logOutButton}>WYLOGUJ SIĘ</button>
      </div>
    </div>
  );
}

export default Header;
