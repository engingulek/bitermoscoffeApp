import React from "react";
import "./Menu.css";
function Menu() {
  return (
    <div className="navbar">
      <span>Ismarla</span>
      <div className="subnav">
        <button className="subnavbtn">Kahve </button>
        <div className="subnav-content">
          <li>Filtre Kahve</li>
          <li>Espresso</li>
          <li>Yöresel Kahveler</li>
        </div>
      </div>
      <div className="subnav">
        <button className="subnavbtn">Çay </button>
        <div className="subnav-content">
          <li>Ada Çayı</li>
          <li>Nane Limon</li>
          <li>Ihlamaur</li>
          <li>Kuş burnu</li>
        </div>
      </div>
      <span>Hakkımızda</span>
    </div>
  );
}

export default Menu;
