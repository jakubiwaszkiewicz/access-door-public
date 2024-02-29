import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.sass';

function Login() {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook do nawigacji

  // this useeffect 
  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)?@[a-zA-Z0-9]+\.[A-Za-z]+$/;
      
    if (email.match(emailRegex) || email === '') {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
    console.log(email);
  }, [email]);

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/labourer/profile');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Zatrzymaj domyślne działanie formularza

    try {
      // Tutaj dokonujemy wywołania API do serwera
      const resLogin = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!resLogin.ok) {
        throw new Error('Błąd logowania'); // Jeśli odpowiedź nie jest ok, rzuć błędem
      }

      const loginData = await resLogin.json();
      localStorage.setItem('authToken', loginData.accessToken); // Zapisz token w localStorage

      ///////
      
      let resUser = await fetch('http://localhost:3000/api/read/labourer', {
        method: 'GET',
        headers: {
          "authorization" : `Bearer ${loginData.accessToken}`
        }
      })

      if (!resUser.ok) {
        throw new Error('Błąd logowania'); // Jeśli odpowiedź nie jest ok, rzuć błędem
      }
      
      resUser = await resUser.json();
      localStorage.setItem('user', JSON.stringify(resUser)); // Zapisz token w localStorage

      ///////
      navigate('/labourer/profile'); // Przekieruj na profil pracownika
    } catch (error) {
      console.error('Error:', error);
      alert('Nie udało się zalogować: ' + error.message); // Wyświetl alert z błędem
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">DOSTĘP DO DRZWI</div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          { !isValidEmail &&
          <div className='email-alert'>
            <p className='email-alert-text'>Podany email jest nieprawidłowy</p>
          </div>}
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Zaloguj się</button>
        </form>
      </div>
    </div>
  );
}

export default Login;






// import React, { useState } from 'react';
// import './Login.sass'; 

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const authToken = JSON.parse(localStorage.getItem("authToken"));

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const authorize = async () => {
//       const response = await fetch('/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(
//           {
//             email: email,
//             password: password
//           }
//         ),
//       });
//       const data = await response.json();
//       localStorage.setItem("authToken", JSON.stringify(data));
//       window.location.href = "/home";
//     }
    
//   }

  
//   useEffect(() => {
//     if (authToken) {
//       window.location.href = "/home";
//     }

//     //email validation
    

//   }, [email, password]);

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <div className="login-header">
//           DOSTĘP DO DRZWI
//         </div>
//         <form className="login-form">
//           <input 
//           type="email" 
//           placeholder="Email" 
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required 
//           />
//           <input type="password"
//            placeholder="Hasło"
//            value={password}
//            onChange={(e) => setPassword(e.target.value)}
//            required
//           />
//           <button type="submit" onClick={handleSubmit}>Zaloguj się</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;