import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import db from "../firebase";
import alert from "alertifyjs";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

function Card() {
  const [menu, setMenu] = useState([]);
  const dispatch = useDispatch();
  const menuSelector = useSelector((state) => state.menuRed);
  const productSelector = useSelector((state)=>state.productRed)
  useEffect(() => {
    if (menuSelector.menuInfo !== "") {
      db.collection("products")
        .where("bransName", "==", menuSelector.menuInfo.menuTitleId)
        .onSnapshot((onSnapshot) => {
          const menuItem = [];
          onSnapshot.forEach((doc) => {
            menuItem.push({
              productId: doc.id,
              productData: doc.data(),
            });
          });
          setMenu(menuItem);
        });
    } else {
      db.collection("products").onSnapshot((onSnapshot) => {
        const menuItem = [];
        onSnapshot.forEach((doc) => {
          menuItem.push({
            productId: doc.id,
            productData: doc.data(),
          });
        });
        setMenu(menuItem);
      });
    }
  }, [menuSelector.menuInfo.menuTitleId]);



  const addProducttoCart = (addItem) => {
    const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));
    if (uidLoc === null) {
      alert.error("Giriş Yapmadan Sipariş Veremezsiziniz");
    } 
    else if (productSelector.cartConfirmCount !== 0){
      alert.error("Siparişiniz teslim edilmeden başka sipariş veremezsiniz");
    }
    
    else {
      //        db.collection("personList").doc(uidLoc).collection("cartList").doc(addItem.productId).set({
      //  addCartProductName:addItem.productData.productName,
      //  addCartProductPrice:addItem.productData.price,
      //  addCartProductQuantity:addItem.productData.quantity,
      //  addCartProductTime:addItem.productData.time,
      //  addCartProductKind:addItem.productData.kind

      //        })
      //      .then(() => {
      //         alert.success("Siparişiniz Başarıyla eklemiştir")
      //     })
      //     .catch((error) => {
      //          console.error("Error writing document: ", error);
      //     });

      const addCartItems = db
        .collection("personList")
        .doc(uidLoc)
        .collection("cartList")
        .doc(addItem.productId);
      addCartItems.get().then((doc) => {
        if (doc.exists) {
          addCartItems.update({
            addCartProductQuantity: doc.data().addCartProductQuantity + 1,
          });
        } else {
          db.collection("personList")
            .doc(uidLoc)
            .collection("cartList")
            .doc(addItem.productId)
            .set({
              addCartProductName: addItem.productData.productName,
              addCartProductPrice: addItem.productData.price,
              addCartProductQuantity: addItem.productData.quantity,
              addCartProductTime: addItem.productData.time,
              addCartProductKind: addItem.productData.kind,
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

  const addProducttoFavoriList = (addItem) => {
    const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));
    if (uidLoc === null) {
      alert.error("Giriş Yapmadan Favori Ekleme İşlemi Yapamazsınız");
    } else {
      //       db.collection("personList").doc(uidLoc).collection("favoriListList").doc(addItem.productId).set({
      //   addFavoriProductName:addItem.productData.productName,
      //  addFavoriProductPrice:addItem.productData.price,
      //   addFavoriProductQuantity:addItem.productData.quantity,
      //  addFavoriProductTime:addItem.productData.time,
      //   addFavoriProductKind:addItem.productData.kind

      //        })
      //      .then(() => {
      //         alert.success("Favorilerinize Başarıyla Eklenmiştir")
      //    })
      //      .catch((error) => {
      //          console.error("Error writing document: ", error);
      //     });

      const addFavoriItems = db
        .collection("personList")
        .doc(uidLoc)
        .collection("favoriList")
        .doc(addItem.productId);
      addFavoriItems.get().then((doc) => {
        if (doc.exists) {
          alert.error("Zaten Favorilerinizde Bulunmaktadır");
        } else {
          db.collection("personList")
            .doc(uidLoc)
            .collection("favoriList")
            .doc(addItem.productId)
            .set({
              addFavoriProductName: addItem.productData.productName,
              addFavoriProductPrice: addItem.productData.price,
              addFavoriProductQuantity: addItem.productData.quantity,
              addFavoriProductTime: addItem.productData.time,
              addFavoriProductKind: addItem.productData.kind,
            })
            .then(() => {
              alert.success("Favorilerinize Başarıyla Eklemiştir");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        }
      });
    }
  };

  return (
    <Wrapper>
      {menu.map((item) => (
        <CardContainer>
          <ProductImg>
            <div>
              <img src={item.productData.img} alt="kahve" />
            </div>
          </ProductImg>
          <ProductName>
            <span>{item.productData.productName}</span>
          </ProductName>
          <ProductType>
            <div className="makeTime">
              <span>Hazırlanış Süresi : {item.productData.time}</span>
            </div>
            <div
              className="favoriIcon"
              onClick={() => addProducttoFavoriList(item)}
            >
              <FavoriteBorderIcon
                style={{ fontSize: "30px", color: "red" }}
                className="icon"
              />
            </div>
          </ProductType>
          <ProductCount>
            <span>{item.productData.price} ₺</span>
            <span>{item.productData.kind}</span>
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
