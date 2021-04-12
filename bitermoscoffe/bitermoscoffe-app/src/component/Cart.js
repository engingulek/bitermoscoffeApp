import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";

import db from "../firebase";
function Cart() {
  const [locId, setlocId] = useState("")
  const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));
  const user = useSelector((state) => state.loginRed);
 
const [cartProductList, setcartProductList] = useState([])
  useEffect(() => {
    if (uidLoc!==null) {

      db.collection("personList").doc(uidLoc).collection("cartList").onSnapshot((onSnapshot)=>{
        const cartItem = [];
        onSnapshot.forEach((doc)=>{
          cartItem.push({
            cartProductId :doc.id,
            cartProducData:doc.data()

          })
          
        })
        setcartProductList(cartItem)
      })
    
      
    }
  
   
  }, )

  
  useEffect(() => {
    setlocId(uidLoc)
  }, [locId])


  return (
    <Wrapper>
    {
      uidLoc===null? 
      <CartLoginOut>
      <div>
      
      <span>Giriş Yapmadan Alışveriş Yapamazsınız</span>
      
      
      </div>
      </CartLoginOut>
      :
      cartProductList.length===0?
      <div>
      <span>
      Sepeteniz Boş
      </span>
      </div>:
      <CartWrapper>
      {
        cartProductList.map((item)=>(
          <CartContainer>
        <ProductCartInfo>
          <div className="productInfo">
            <div className="productName">
              <span>{item.cartProducData.addCartProductName}</span>
            </div>
            <div className="thermosLitre">
              <span>{item.cartProducData.addCartProductKind}  x  {item.cartProducData.addCartProductQuantity}</span>
            </div>
            <div className="amount">
            <span>
            {item.cartProducData.addCartProductPrice * item.cartProducData.addCartProductQuantity}.00 ₺
            </span>
            
            </div>
            <div className="makeTime">
              <div className="totalTime">
                <span>{item.cartProducData.addCartProductTime + 15} dk </span>
              </div>
              <div className="deliveryAndMakeTime">
                <span>
                  Hazırlanış: {item.cartProducData.addCartProductTime} <br />
                  Teslimat: 15dk
                </span>
              </div>
            </div>
          </div>
          <div className="remove">
            <div className="reduce">-</div>
            <div className="count">{item.cartProducData.addCartProductQuantity}</div>

            <div className="increuce">+</div>
          </div>
          
        </ProductCartInfo>
        
       
      </CartContainer>

          
        ))


      }
      
     
      <ButtonConfirm>
        <div>
        <Link className="link" to="/cartConfirm">
        <button>
          Sepeti Onayla
          </button>
        </Link>
          
          </div>
        </ButtonConfirm>
        </CartWrapper>
    }
      
      
    </Wrapper>
  );
}

const Wrapper = styled.div`
display:flex;
flex-direction:column;
align-items:center;
  width: 100%;
  margin-right: 20px;
  margin-left: 10px;
  border-radius: 10px;
  border: 1px solid brown;
  
`;
const CartWrapper = styled.div``

const CartLoginOut = styled.div`
display:flex;
margin:30px;

div{
  
  span{
   
    color:red;
    font-size:20px;
  }
}


`


const CartContainer = styled.div`
  width: 220px;
  border-top: 2px solid brown;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
display:flex;
flex-direction:column;
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

    .amount
    {
      margin-top:5px;
      span{
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
margin-bottom:20px;
button{
    border:none;
    color:white;
    background-color:#54e346;
padding:10px 20px;
font-weight:600;
font-size:19px;
border-radius:10px;
:hover{
    background-color: #03c03c;
}

}
.link{
  text-decoration:none;
  color:white;
  :hover{
    color:white;
  }
}


`;
export default Cart;
