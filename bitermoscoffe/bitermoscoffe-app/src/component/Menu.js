import React, { useEffect, useState } from "react";
import "./Menu.css";
import db from "../firebase";
import { useDispatch } from "react-redux";
import { menuSelected } from "../reduxtoolkit/features/menu/menuSlice";
function Menu() {
  const [menu, setMenu] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    db.collection("menuList").onSnapshot((onSnapshot) => {
      const menuItem = [];
      onSnapshot.forEach((doc) => {
        menuItem.push({
        menuTitleId:doc.id,
         menuTitles: doc.data()
        
        });
        
      });
      setMenu(menuItem);


      
      
      
      
    });


   
    
  },);

const menuClicked=(menuItems)=>{
  
 dispatch(menuSelected(menuItems))

}
  return (
    <div className="navbar">
      <span>Ismarla</span>

      {menu.map((menuItems) => (
        <div className="subnav" onClick={()=>menuClicked(menuItems)}>
          <button className="subnavbtn">{menuItems.menuTitles.menuTitle}</button>
          
        </div>
      ))}
    </div>
  );
}

export default Menu;
