import React, { useState } from 'react';

import './error401.sass';

function Error401() {
  return (
    <div className="error-container">
      <div className="error-box">
        <h2 className="error-header">ERROR 401</h2>
        <p className="error-message">ZŁE DANE LOGOWANIA</p>
        <button className="retry-button">ZALOGUJ SIĘ PONOWNIE</button>
      </div>
    </div>
  );
}

export default Error401;
