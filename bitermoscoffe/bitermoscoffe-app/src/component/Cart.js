import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import db from "../firebase";
import StepContainer from "./StepContainer";
import { cartConfirmHiddle } from "../reduxtoolkit/features/product/productSlice";

function Cart() {
  const [locId, setlocId] = useState("");
  const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));
  const cartSelector = useSelector((state) => state.productRed);
   const [cartListConfirm, setCartListConfirm] = useState([]);
  const dispatch = useDispatch();
  const [cartProductList, setcartProductList] = useState([]);
  const [cartConfirmPrice, setCartConfirmPrice] = useState(0)
  const [cartConfirmTime, setCartConfirmTime] = useState(0)
  // const [price, setPrice] = useState(0);

   const loginSelector = useSelector(state => state.loginRed)
   
 

 
  

  useEffect(() => {
    const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));
    if (uidLoc !== null) {
      db.collection("personList")
        .doc(uidLoc)
        .collection("cartList")
        .onSnapshot((onSnapshot) => {
          const cartItem = [];
          onSnapshot.forEach((doc) => {
            cartItem.push(doc);
          });
          setcartProductList(cartItem);
        });
    }
  },[]);

  useEffect(() => {
    setlocId(uidLoc);
  }, [locId]);


  useEffect(() => {
    const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));
    if(uidLoc !== null)
    {
      db.collection("personList")
      .doc(uidLoc)
      .collection("cartConfirmList")
      .onSnapshot((onSnapshot) => {
        const cartConfrimListItems = [];
        onSnapshot.forEach((doc) => {
          
            cartConfrimListItems.push(doc);
           
          
        });
        setCartListConfirm(cartConfrimListItems);
      });
    }
   

  },[]);

  useEffect(() => {
    if (cartSelector.cartConfirmHid === false) {
      console.log("B");

      const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));
      cartListConfirm.map((item) =>
        db
          .collection("personList")
          .doc(uidLoc)
          .collection("pastOrderList")
          .doc(item.id)
          .set({
            cartPastOrderListName: item.data().cartConfirmListName,
            cartPastOrderListPrice: item.data().cartConfirmListPrice,
            cartPastOrderListQunatity: item.data().cartConfirmListQunatity,
            cartPastOrderListTime: item.data().cartConfirmListTime,
          })
      );

      cartListConfirm.map((item) =>
        db
          .collection("personList")
          .doc(uidLoc)
          .collection("cartConfirmList")
          .doc(item.id)
          .delete()
          .then(() => {
            // console.log("Success");
          })
          .catch((error) => {
            console.log(error);
          })
      );
    }
    
  }, [cartSelector.cartConfirmHid]);





  useEffect(() => {
    let countPrice = 0;
    let countTime = 0;

    cartListConfirm.map((item) => {
      countPrice +=
        item.data().cartConfirmListPrice *
        item.data().cartConfirmListQunatity;
      countTime += item.data().cartConfirmListTime;
    });
    setCartConfirmPrice(countPrice);
    
    
    setCartConfirmTime(countTime);
  },[cartListConfirm]);

  return (
    <Wrapper>
    <Container>
     
    {uidLoc === null?<CartLoginOut>
      <div>
        <span>Giriş Yapmadan Alışveriş Yapamazsınız</span>
      </div>
    </CartLoginOut>:
    cartProductList.length===0&&cartListConfirm.length===0 && uidLoc!==null

    ?
    <div className="cartListEmpty">
    <div>
    <span>Sepeteniz</span>
    </div>
    <div>
    <span>Boş</span>
    </div>
          
         
        </div>
        :
        cartListConfirm.length===0?
        <CartWrapper>
        
          {cartProductList.map((item) => (
            <CartContainer>
              <ProductCartInfo>
                <div className="productInfo">
                  <div className="productName">
                    <span>{item.data().addCartProductName}</span>
                  </div>
                  <div className="thermosLitre">
                    <span>
                      {item.data().addCartProductKind} x{" "}
                      {item.data().addCartProductQuantity}
                    </span>
                  </div>
                  <div className="amount">
                    <span>
                      {item.data().addCartProductPrice *
                        item.data().addCartProductQuantity}
                      .00 ₺
                    </span>
                  </div>
                  <div className="makeTime">
                    <div className="totalTime">
                      <span>
                        {item.data().addCartProductTime + 15} dk{" "}
                      </span>
                    </div>
                    <div className="deliveryAndMakeTime">
                      <span>
                        Hazırlanış: {item.data().addCartProductTime}{" "}
                        <br />
                        Teslimat: 15dk
                      </span>
                    </div>
                  </div>
                </div>
                <div className="remove">
                  <div className="reduce">-</div>
                  <div className="count">
                    {item.data().addCartProductQuantity}
                  </div>

                  <div className="increuce">+</div>
                </div>
              </ProductCartInfo>
            </CartContainer>
          ))}

          <ButtonConfirm>
          <Link className="link" to="/cartConfirm">
            <div>
                <button>Sepeti Onayla</button>
            </div>
            </Link>
          </ButtonConfirm>
        </CartWrapper>:
        <div className="cartConfirm">
        <div className="cartConfirmTitle">
        <span>
        Sipariş Verdiğinz Ürünler
        </span>
        </div>
       
        {cartListConfirm.map((item)=>(
          <div className="cartConfirmDesc">
          <span>{item.data().cartConfirmListName} x {item.data().cartConfirmListQunatity}</span>
          </div>
          
        ))}
        <div className="line"/>
        <div className="cartConfirmDesc">
        <span style={{color:"black"}}>
        Sipariş Toplamı :  {cartConfirmPrice}
        </span>
     
        </div>
        
        <div className="cartConfirmDesc">
        <span style={{color:"black"}}>
        Teslim Süresi : {cartConfirmTime}
        </span>
        </div>
        <StepContainer />
        </div>
      
    
        
        }


     
    </Container>
    </Wrapper>
  );

  
}


const Wrapper = styled.div``;



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-right: 20px;
  margin-left: 15px;
  border-radius: 10px;
  border: 1px solid brown;
  .cartListEmpty{
       color:red;
       display:flex;
       margin:30px;
       flex-direction:column;
       align-items:center;
         justify-content:center;
         font-size: 20px;
      
       
     }
   
  .cartConfirm{
    display:flex;
     flex-direction:column;
     align-items:center;
     justify-content:center;
     cursor: default;
    .cartConfirmTitle{
       margin-top:10px;
       margin-bottom:20px;
       font-size:17px;
       font-weight:bold;
      
     }

     .line{
       border:1px solid brown;
       width:100%;
       height:6px;
       background-color:brown;
       margin-bottom:10px;
       border-radius:100px;
     }

     .cartConfirmDesc{
       font-size:17px;
       font-weight:bold;
       color:brown;
       margin-bottom:10px;
      
     }
    

     
    
  
  }
`;
const CartWrapper = styled.div``;

const CartLoginOut = styled.div`
  display: flex;
  margin: 30px;

  div {
    span {
      color: red;
      font-size: 20px;
    }
  }
`;

const CartContainer = styled.div`
  width: 220px;
  border-top: 2px solid brown;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

const ProductCartInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  margin-top: 10px;
  .productInfo {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;

    .productName {
      span {
        font-size: 20px;
        font-weight: 800;
      }
    }
    .thermosLitre {
      margin-top: 4px;
      span {
        font-size: 15px;
        color: brown;
        font-weight: 800;
      }
    }

    .amount {
      margin-top: 5px;
      span {
        font-size: 20px;
        color: brown;
        font-weight: 500;
      }
    }

    .makeTime {
      margin-top: 5px;
      .totalTime {
        margin-bottom: 4px;
        span {
          font-size: 20px;
        }
      }
      .deliveryAndMakeTime {
        span {
          font-size: 14px;
          font-weight: 700;
          color: #bbbbbb;
        }
      }
    }
  }

  .remove {
    display: flex;
    flex-direction: row;
    font-size: 18px;
    width: 75px;
    height: 30px;

    margin-left: 20px;
    border: 2px solid lightgray;
    border-radius: 5px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
    :hover {
      cursor: pointer;
    }
    .reduce {
      margin-right: 20px;
      margin-left: 5px;
    }
    .count {
      margin-right: 15px;
    }
    .increuce {
      margin-right: 10px;
    }
  }
`;

const ButtonConfirm = styled.div`
  margin-bottom: 20px;
  button {
    border: none;
    color: white;
    background-color: #54e346;
    padding: 10px 20px;
    font-weight: 600;
    font-size: 19px;
    border-radius: 10px;
    :hover {
      background-color: #03c03c;
    }
  }
  .link {
    text-decoration: none;
    color: white;
    :hover {
      color: white;
    }
  }
`;
export default Cart;
