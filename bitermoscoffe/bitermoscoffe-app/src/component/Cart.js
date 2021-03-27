import React from "react";
import styled from "styled-components";

function Cart() {
  return (
    <Wrapper>
      <CartContainer>
        <ProductCartInfo>
          <div className="productInfo">
            <div className="productName">
              <span>Filtre Kahve</span>
            </div>
            <div className="thermosLitre">
              <span>1 Litre X 1</span>
            </div>
            <div className="makeTime">
              <div className="totalTime">
                <span>25 dk</span>
              </div>
              <div className="deliveryAndMakeTime">
                <span>
                  Hazırlanış: 10dk <br />
                  Teslimat: 15dk
                </span>
              </div>
            </div>
          </div>
          <div className="remove">
            <div className="reduce">-</div>
            <div className="count">1</div>

            <div className="increuce">+</div>
          </div>
          
        </ProductCartInfo>
        
       
      </CartContainer>
      <CartContainer>
        <ProductCartInfo>
          <div className="productInfo">
            <div className="productName">
              <span>Ada Çayı</span>
            </div>
            <div className="thermosLitre">
              <span>1.5 Litre X 2</span>
            </div>
            <div className="makeTime">
              <div className="totalTime">
                <span>30 dk</span>
              </div>
              <div className="deliveryAndMakeTime">
                <span>
                  Hazırlanış: 20dk <br />
                  Teslimat: 10dk
                </span>
              </div>
            </div>
          </div>
          <div className="remove">
            <div className="reduce">-</div>
            <div className="count">2</div>

            <div className="increuce">+</div>
          </div>
          
        </ProductCartInfo>
        
       
      </CartContainer>
      <ButtonConfirm>
        <div>
          <button>
          Sepeti Onayla
          </button>
          </div>
        </ButtonConfirm>
      
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


`;
export default Cart;
