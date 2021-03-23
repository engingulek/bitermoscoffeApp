import React from "react";
import styled from "styled-components";

function Card() {
  return (
    <Wrapper>
      <CardContainer>
        <ProductImg>
          <div>
            <img
              src="https://foto.haberler.com/haber/2017/12/05/dunya-turk-kahvesi-gunu-nde-kahveniz-kahve-10314099_6526_o.jpg"
              alt="kahve"
            />
          </div>
        </ProductImg>
        <ProductName>
          <span>Filtre Kahve</span>
        </ProductName>
        <ProductType>
          <span>Taze Öğütülmüş</span>
        </ProductType>
        <ProductCount>
          <span>19.00₺</span>
          <span>(1 litre termos)</span>
        </ProductCount>
        <ProductBttn>
          <div>
            <button>Sepete Ekle</button>
          </div>
        </ProductBttn>
      </CardContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  height: 100%;
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
  padding-top: 10px;
  margin-top: 7px;
  margin-bottom: 7px;
  height: 100%;
  background-color: #91091e;

  span {
    color: white;
    padding-bottom: 5px;
    padding-top: 5px;
    align-self: center;
    display: flex;
    justify-content: center;
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
    visibility: hidden;
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
