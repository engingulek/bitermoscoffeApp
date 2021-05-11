import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import db from "../firebase";
import alert from "alertifyjs";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

function Card() {
  const [products, setProduct] = useState([]);
  const [cartConfrim, setCartConfirm] = useState([]);
  const [cartConfirmListStatu, setCartConfirmListStatu] = useState(false);
  const menuSelector = useSelector((state) => state.menuRed);

  useEffect(() => {
    if (menuSelector.menuInfo !== "") {
      db.collection("products")
        .where("bransName", "==", menuSelector.menuInfo.menuTitleId)
        .onSnapshot((onSnapshot) => {
          const productItems = [];
          onSnapshot.forEach((doc) => {
            productItems.push(doc);
          });
          setProduct(productItems);
        });
    } else {
      db.collection("products").onSnapshot((onSnapshot) => {
        const productItems = [];
        onSnapshot.forEach((doc) => {
          productItems.push(doc);
        });
        setProduct(productItems);
      });
    }
  }, [menuSelector.menuInfo.menuTitleId]);

  //   useEffect(() => {

  //     db.collection("products").onSnapshot((onSnapshot) => {
  //     const productItems = []
  //       onSnapshot.forEach((doc) => {
  //         productItems.push(doc)
  //         })
  //      setProduct(productItems)
  //     })
  //  },[] )

  useEffect(() => {
    const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));

    if(uidLoc!==null)
    {
      db.collection("personList")
      .doc(uidLoc)
      .collection("cartConfirmList")
      .onSnapshot((onSnapshot) => {
        const cartConfrimListItems = [];
        onSnapshot.forEach((doc) => {
          
            cartConfrimListItems.push(doc);
           
          
        });
        setCartConfirm(cartConfrimListItems);
      });
    }
    

  }, []);




  const addProducttoCart = (addItem) => {
    const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));

    if (uidLoc === null) {
      alert.error("Giriş Yapmadan Sipariş Veremezsiziniz");
    } 
   else if (cartConfrim.length !== 0) {
      alert.error("Başka Bir Siparişiniz Bulunmaktadır");
     
    }
    
    else {
       
        const addCartItems = db
          .collection("personList")
          .doc(uidLoc)
          .collection("cartList")
          .doc(addItem.id);
        addCartItems.get().then((doc) => {
          if (doc.exists) {
            addCartItems.update({
              addCartProductQuantity: doc.data().addCartProductQuantity + 1,
            });
            alert.success("Siparişiniz Tekrar eklemiştir");
          } else {
            db.collection("personList")
              .doc(uidLoc)
              .collection("cartList")
              .doc(addItem.id)
              .set({
                addCartProductName: addItem.data().productName,
                addCartProductPrice: addItem.data().price,
                addCartProductQuantity: addItem.data().quantity,
                addCartProductTime: addItem.data().time,
                addCartProductKind: addItem.data().kind,
              })
              .then(() => {
                alert.success("Siparişiniz Başarıyla eklemiştir");
              })
              .catch((error) => {
                console.error("Error writing document: ", error);
              });
          }
        });
      

  
    }
  };

  // const addProducttoCart = (addItem) => {

  //   const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));

  //   if (uidLoc===null)
  //   {
  //     alert.error("Giriş Yapmadan Sipariş Veremezsiziniz");
  //   }

  // else{
  //   const addCartItems = db.collection("personList").doc(uidLoc)
  //   .collection("cartList").doc(addItem.id);
  //   addCartItems.get().then((doc)=>{
  //     if(doc.exists){
  //       addCartItems.update({
  //         addCartProductQuantity: doc.data().addCartProductQuantity + 1,
  //       });

  //     }else{
  //       db.collection("personList")
  //       .doc(uidLoc)
  //       .collection("cartList")
  //       .doc(addItem.id)
  //       .set({
  //         addCartProductName: addItem.data().productName,
  //         addCartProductPrice: addItem.data().price,
  //         addCartProductQuantity: addItem.data().quantity,
  //         addCartProductTime: addItem.data().time,
  //         addCartProductKind: addItem.data().kind,
  //       })
  //       .then(() => {
  //         alert.success("Siparişiniz Başarıyla eklemiştir");
  //       })
  //       .catch((error) => {
  //         console.error("Error writing document: ", error);
  //       });
  //     }
  //   })
  // }
  // };


  const addFavoriList = (addItem)=>{
    const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));
    if (uidLoc === null) {
      alert.error("Giriş Yapmadan Sipariş Veremezsiziniz");
    } 
    else{
      const addCartItems = db
          .collection("personList")
          .doc(uidLoc)
          .collection("favoriList")
          .doc(addItem.id);
        addCartItems.get().then((doc) => {
          if (doc.exists) {
         
            alert.warning("Zaten Favori Listenizde Bulunmaktadır.");
          } else {
            db.collection("personList")
              .doc(uidLoc)
              .collection("favoriList")
              .doc(addItem.id)
              .set({
                addCartProductName: addItem.data().productName,
                addCartProductPrice: addItem.data().price,
                addCartProductQuantity: addItem.data().quantity,
                addCartProductTime: addItem.data().time,
                addCartProductKind: addItem.data().kind,
              })
              .then(() => {
                alert.success("Ürün FavoriListe Eklendi");
              })
              .catch((error) => {
                console.error("Error writing document: ", error);
              });
          }
        });

    }
    
  }

  return (
    <Wrapper>
      {products.map((item) => (
        <CardContainer>
          <ProductImg>
            <div>
              <img src={item.data().img} alt="kahve" />
            </div>
          </ProductImg>
          <ProductName>
            <span>{item.data().productName}</span>
          </ProductName>
          <ProductType>
            <div className="makeTime">
              <span>Hazırlanış Süresi : {item.data().time}</span>
            </div>
            <div className="favoriIcon" onClick={()=>addFavoriList(item)}>
              <FavoriteBorderIcon
                style={{ fontSize: "30px", color: "red" }}
                className="icon"
              />
            </div>
          </ProductType>
          <ProductCount>
            <span>{item.data().price} ₺</span>
            <span>{item.data().kind}</span>
          </ProductCount>
          <ProductBttn>
            <div onClick={() => addProducttoCart(item)}>
              <button>Sepete Ekle</button>
            </div>
          </ProductBttn>
        </CardContainer>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  width: 300px;

  border: 1px solid lightgray;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);

  padding-top: 30px;
  padding-bottom: 30px;
  margin-left: 50px;
  margin-bottom: 30px;
  :hover {
    cursor: pointer;
    div {
      visibility: visible;
    }
  }
`;
const ProductImg = styled.div`
  div {
    img {
      width: 200px;
      height: 200px;
      border-radius: 15px;
    }

    display: flex;
    justify-content: center;
  }
`;
const ProductName = styled.div`
  padding-top: 10px;
  span {
    font-weight: bolder;
    font-size: 20px;
    display: flex;
    justify-content: center;
  }
`;
const ProductType = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  padding-top: 10px;
  margin-top: 7px;
  margin-bottom: 7px;
  height: 100%;
  background-color: #91091e;
  .makeTime {
    span {
      color: white;
      padding-bottom: 5px;
      padding-top: 5px;
      align-self: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .favoriIcon {
    display: flex;
    align-items: center;
  }
`;
const ProductCount = styled.div`
  span {
    font-weight: bolder;
    font-size: 18px;
    display: flex;
    justify-content: center;
  }
  padding-top: 10px;
`;
const ProductBttn = styled.div`
  div {
    display: flex;
    justify-content: center;
    /* visibility: hidden; */
    margin-top: 5px;

    button {
      border: none;
      outline: none;
      outline-style: none;
      padding: 14px;
      padding-right: 35px;
      padding-left: 35px;
      border-radius: 10px;
      background-color: white;
      color: #fc8621;
      border: 1px solid #fc8621;
      :hover {
        background-color: #fc8621;
        color: white;
      }
    }
  }
  padding-top: 10px;
`;

export default Card;
