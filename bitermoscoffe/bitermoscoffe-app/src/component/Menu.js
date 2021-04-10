import React, { useEffect, useState } from "react";
import "./Menu.css";
import db from "../firebase";
function Menu() {
  const [menu, setMenu] = useState([]);
  

  useEffect(() => {
    db.collection("menuList").onSnapshot((onSnapshot) => {
      const menuItem = [];
      onSnapshot.forEach((doc) => {
        menuItem.push(doc.data());
      });
      setMenu(menuItem);
    });
  }, []);

  return (
    <div className="navbar">
      <span>Ismarla</span>

      {menu.map((menuItems) => (
        <div className="subnav">
          <button className="subnavbtn"> 
          {menuItems.menuTitle} 
          </button>
          <div className="subnav-content">
            {menuItems.subMenuTitle.map((sub) => (
              <li>{sub}</li>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Menu;
