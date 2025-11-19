import "../Styles/TarjetaMaster.css";
import logo from "../assets/logo.png";
import chip from "../assets/chip.png";
import { useState, useMemo } from "react";

export default function TarjetaPago() {
  const [numero, setNumero] = useState("");
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [cvv, setCvv] = useState("");

  const [mostrarReverso, setMostrarReverso] = useState(false);

  const [errorNumero, setErrorNumero] = useState("");
  const [errorNombre, setErrorNombre] = useState("");
  const [errorFecha, setErrorFecha] = useState("");
  const [errorCvv, setErrorCvv] = useState("");

  const displayNumero = useMemo(() => {
    if (!numero) return "XXXX XXXX XXXX XXXX";
    const dig = numero.replace(/\D/g, "").padEnd(16, "X").slice(0, 16);
    return dig.replace(/(.{4})/g, "$1 ").trim();
  }, [numero]);

  const displayNombre = nombre ? nombre.toUpperCase() : "NOMBRE DEL TITULAR";
  const displayFecha = fecha ? fecha : "MM/YY";

  function validarNumero(value: string) {
    const dig = value.replace(/\s+/g, "").replace(/\D/g, "");
    if (dig.length === 0) return setErrorNumero("El número es obligatorio"), false;
    if (dig.length !== 16) return setErrorNumero("Debe tener 16 dígitos"), false;
    setErrorNumero("");
    return true;
  }

  function validarNombre(value: string) {
    if (!value.trim()) return setErrorNombre("El nombre no puede estar vacío"), false;
    setErrorNombre("");
    return true;
  }

  function validarFecha(value: string) {
    if (!value.trim()) return setErrorFecha("La fecha debe ser MM/YY"), false;
    const m = value.match(/^(\d{1,2})\/?(\d{2})$/);
    if (!m) return setErrorFecha("Formato inválido (MM/YY)"), false;

    const mes = parseInt(m[1], 10);
    const yy = parseInt(m[2], 10);
    if (mes < 1 || mes > 12) return setErrorFecha("Mes 1-12"), false;

    const fechaExp = new Date(2000 + yy, mes);
    if (fechaExp < new Date()) return setErrorFecha("Tarjeta expirada"), false;

    setErrorFecha("");
    return true;
  }

  function validarCvv(value: string) {
    if (!value.trim()) return setErrorCvv("El CVV es obligatorio"), false;
    if (value.length !== 3) return setErrorCvv("Debe tener 3 dígitos"), false;
    setErrorCvv("");
    return true;
  }

  const onNumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/[^\d\s]/g, "");
    v = v.replace(/\s+/g, " ");
    const dig = v.replace(/\s/g, "").slice(0, 16);
    const formatted = dig.replace(/(.{4})/g, "$1 ").trim();
    setNumero(formatted);
    validarNumero(formatted);
  };

  const onNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value);
    validarNombre(e.target.value);
  };

  const onFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/[^\d]/g, "").slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
    setFecha(v);
    validarFecha(v);
  };

  const onCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvv(v);
    validarCvv(v);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const okNum = validarNumero(numero);
    const okNom = validarNombre(nombre);
    const okFec = validarFecha(fecha);
    const okCvv = validarCvv(cvv);

    if (!okNum || !okNom || !okFec || !okCvv) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/tarjeta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          numero: numero.replace(/\s/g, ""),
          nombre,
          fecha,
          cvv,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Tarjeta registrada / pago procesado correctamente");
      } else {
        alert("Error: " + data.message);
      }

    } catch (error) {
      console.error(error);
      alert("Error en el servidor");
    }
  };

  return (
    <div className="tarjeta-wrapper">
      <div className="tarjeta-animada">
        <div className={`tarjeta-inner ${mostrarReverso ? "girar" : ""}`}>

          <div className="tarjeta-front">
            <header>
              <span className="logo">
                <img src={logo} alt="logo" />
                <h5>Master Card</h5>
              </span>
              <img src={chip} alt="chip" className="chip" />
            </header>

            <div className="card-details">
              <div className="name-number">
                <h6>Card Number</h6>
                <h5 className="number">{displayNumero}</h5>
                <h5 className="name">{displayNombre}</h5>
              </div>

              <div className="valid-date">
                <h6>Valid Date</h6>
                <h5>{displayFecha}</h5>
              </div>
            </div>
          </div>

          <div className="tarjeta-back">
            <div className="banda-magnetica"></div>

            <div className="cvv-box">
              <span>CVV</span>
              <div className="cvv-value">{cvv || "***"}</div>
            </div>
          </div>

        </div>
      </div>

      <form className="tarjeta-form" onSubmit={handleSubmit} style={{ flex: "0 0 340px"}}>
        <h3>Datos de la Tarjeta</h3>

        <label>Número de Tarjeta</label>
        <input type="text" value={numero} onChange={onNumeroChange} placeholder="XXXX XXXX XXXX XXXX" />
        {errorNumero && <p className="error">{errorNumero}</p>}

        <label>Nombre Completo</label>
        <input type="text" value={nombre} onChange={onNombreChange} placeholder="Nombre del titular" />
        {errorNombre && <p className="error">{errorNombre}</p>}

        <div className="row" style={{ marginTop: 10 }}>
          <div style={{ flex: 1, marginRight: 10 }}>
            <label>Fecha venc.</label>
            <input
              type="text"
              value={fecha}
              onChange={onFechaChange}
              placeholder="MM/YY"
              style={{ textAlign: "center" }}
            />
            {errorFecha && <p className="error">{errorFecha}</p>}
          </div>

          <div style={{ width: 100 }}>
            <label>CVV</label>
            <input
              type="password"
              value={cvv}
              onChange={onCvvChange}
              placeholder="***"
              onFocus={() => setMostrarReverso(true)}
              onBlur={() => setMostrarReverso(false)}
              style={{ textAlign: "center" }}
            />
            {errorCvv && <p className="error">{errorCvv}</p>}
          </div>
        </div>

        <button type="submit">Pagar</button>
      </form>

    </div>
  );
}