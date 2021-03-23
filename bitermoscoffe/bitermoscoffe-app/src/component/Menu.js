import React from "react";
import "./Menu.css";
function Menu() {
  return (
    <div class="navbar">
      <span>Ismarla</span>
      <div class="subnav">
        <button class="subnavbtn">Kahve </button>
        <div class="subnav-content">
          <li>Filtre Kahve</li>
          <li>Espresso</li>
          <li>Yöresel Kahveler</li>
        </div>
      </div>
      <div class="subnav">
        <button class="subnavbtn">Çay </button>
        <div class="subnav-content">
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
