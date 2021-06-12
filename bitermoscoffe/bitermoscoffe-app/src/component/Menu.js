import React, { useEffect, useState } from "react";
import "./Menu.css";
import db from "../firebase";
import { useDispatch } from "react-redux";
import { menuSelected } from "../reduxtoolkit/features/menu/menuSlice";
import styled from "styled-components"

function Menu() {
  const [menu, setMenu] = useState([]);
   const dispatch = useDispatch()

  useEffect(() => {
    db.collection("menuList").onSnapshot((onSnapshot) => {
      const menuItem = [];
      onSnapshot.forEach((doc) => {
        menuItem.push({
        menuTitleId:doc.id,
         menuTitles: doc.data()});
        },[]);
      setMenu(menuItem);
    });


   
    
  },);

const menuClicked=(menuItems)=>{
  
  dispatch(menuSelected(menuItems))

}
  return (
    <Wrapper>
    <Container>
    <MenuItem>
   
   

    {menu.map((menuItems) => (
      <OtherItem onClick={()=>menuClicked(menuItems)}>
      {menuItems.menuTitles.menuTitle}
      </OtherItem>
      
      
        
      
    ))}
   
    
    </MenuItem>
    
    </Container>
    
    </Wrapper>





    // <div className="navbar">
    // <div className="subnav">
    // <span className="subnavbtn">Ismarla</span>
    // </div>
      

    
    // </div>
  );
}

export default Menu;

const Wrapper = styled.div``;
const Container = styled.div``;
const MenuItem = styled.div`
display:flex;
flex-direction:row;
justify-content:space-around;
color:black;
@media only screen and (max-width:725px) {
  margin-top:70px;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
}

`;

const ItemSame = styled.span`

margin-top:20px;
margin-bottom:20px;
font-weight:bold;
font-size:20px;
:hover{
  cursor:pointer;
}
`

const FirstItem = styled(ItemSame)`


`;
const OtherItem = styled(ItemSame)``;