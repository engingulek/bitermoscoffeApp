import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import alert from "alertifyjs";
import db from "../firebase";
function FavoriList() {
  const [favoriList, setfavoriList] = useState([]);
  const [cartConfrim, setCartConfirm] = useState([]);

  useEffect(() => {
    const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));

    if (uidLoc !== null) {
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

  useEffect(() => {
    const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));
    if (uidLoc !== null) {
      db.collection("personList")
        .doc(uidLoc)
        .collection("favoriList")
        .onSnapshot((onSnapshot) => {
          const favoriListItems = [];
          onSnapshot.forEach((doc) => {
            favoriListItems.push(doc);
          });
          setfavoriList(favoriListItems);
        });
    }
  }, []);

  const addFavItemtoCartList = (addItem) => {
    const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));

    if (cartConfrim.length !== 0) {
      alert.error("Başka Bir Siparişiniz Bulunmaktadır");
    } else {
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
              addCartProductName: addItem.data().addFavProductName,
              addCartProductPrice: addItem.data().addFavProductPrice,
              addCartProductQuantity: addItem.data().addFavProductQuantity,
              addCartProductTime: addItem.data().addFavProductTime,
              addCartProductKind: addItem.data().addFavProductKind,
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

  return (
    <FavoriListContainer>
      <FavListSub>
      <FavoListIcon src="https://images.hepsiburada.net/cac/content/www/erised/globalAssets/images/begendiklerim.png"/>
      <FavoriListTitles>
      <FavoriHomePage>
      <Link to="/" className="link">
      Ana Sayfa
      </Link>
      
      </FavoriHomePage>
      <FavoriSubTitle>
      Beğendiklerim
      </FavoriSubTitle>
      <FavoriSubCount>
      {favoriList.length} Ürün Bulunmaktadır
      </FavoriSubCount>
      
      </FavoriListTitles>
      
      
        
      </FavListSub>
      {favoriList.length === 0 ? (
        <FavListEmpty>
          <div className="word">
            <span>Beğeni Listen Boş</span>
          </div>
        </FavListEmpty>
      ) : (
        <FavList>
          {favoriList.map((favList) => (
            <FavListProductsContainer>
              <ProductImg>
                <div>
                  <img src={favList.data().addFavProductImg} alt="kahve" />
                </div>
              </ProductImg>
              <ProductName>
                <span>{favList.data().addFavProductName} </span>
              </ProductName>
              <ProductType>
                <div className="makeTime">
                  <span>
                    Hazırlanış Süresi : {favList.data().addFavProductTime}
                  </span>
                </div>
              </ProductType>
              <ProductCount>
                <span>{favList.data().addFavProductPrice}</span>
                <span>{favList.data().addFavProductKind}</span>
              </ProductCount>
              <ProductBttn>
                <div onClick={() => addFavItemtoCartList(favList)}>
                  <button>Sepete Ekle</button>
                </div>
              </ProductBttn>
            </FavListProductsContainer>
          ))}
        </FavList>
      )}
    </FavoriListContainer>
  );
}

export default FavoriList;

const FavoriListContainer = styled.div`
  display: flex;
  flex-direction: column;
 
`;

const FavoriListTitles = styled.div`
display:flex;
flex-direction:column;
`

const SameSpan = styled.span`
margin-bottom:20px;
display:flex;
align-items:center;
justify-content:center;
font-size:20px;
color:white;
font-weight:bold;


`
const FavoriHomePage = styled(SameSpan)`
cursor: pointer;
.link{
  text-decoration: none;
  color: white;
}
.link:hover{
  color: white;
  text-decoration: none;
}

`
const FavoriSubTitle = styled(SameSpan)`
cursor:default;`
const FavoriSubCount = styled(SameSpan)`
cursor:default;
`

const FavListEmpty = styled.div`
  display: flex;
  margin-top: 80px;

  justify-content: center;
  align-content: center;

  .word {
    font-size: 50px;

    font-weight: bold;
  }
`;
const FavList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top:250px;
  @media only screen and (max-width:725px){
    margin-top:380px;
  }

`;
const FavListSub = styled.div`

  display: flex;
  align-items: center;
 flex-direction:row;
  background-color: rgb(239, 50, 49);
  padding-top: 50px;
  padding-bottom: 50px;
  border-bottom-left-radius: 60px;
  border-bottom-right-radius: 60px;
  position: fixed;
  width: 100%;
  z-index: 1000;
  top: 0;
  left: 0;

  @media only screen and (max-width:725px){
    display:flex;
    flex-direction:column;
  }
`;
const FavoListIcon = styled.img`
margin: 0 34px 0 44px;
 width: 150px;
  height: 150px;

`

const FavListProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 60px;

  border: 1px solid lightgray;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgb(239, 50, 49);

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
  background-color: rgb(239, 50, 49);
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
      color: rgb(239, 50, 49);

      border: 1px solid rgb(239, 50, 49);
      :hover {
        background-color: rgb(239, 50, 49);
        color: white;
      }
    }
  }
  padding-top: 10px;
`;
