import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Rating } from 'primereact/rating';
import type { Nullable } from 'primereact/ts-helpers';

function App() {
  const navigate = useNavigate();
  const [value, setValue] = useState<number | null>(0);
  const [rated, setRated] = useState(false);

    const handleRating = (val: Nullable<number>) => {
    if (!rated && val !== null) {
      setValue(val ?? null);
      setRated(true);
    }
  };

  return (
    <div className="app-container">
      <h1>Bienvenido a la Plataforma de E-commerce</h1>
      <p>¡Tenemos lo que tú necesitas!</p>
      <div className="button-group">
        <Button label="Login" icon="pi pi-sign-in" onClick={() => navigate('/login')} className="p-button-primary" />
        <Button label="SignUp" icon="pi pi-user-plus" onClick={() => navigate('/signup')} className="p-button-secondary" />
      </div>

      <div className="rating-container">
        <span>Valóranos:</span>
        <Rating value={value ?? 0} onChange={(e) => handleRating(e.value)} cancel={false} readOnly={rated} />
      </div>
    </div>
  );
}

export default App;