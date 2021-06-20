import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import db from "../firebase";
import styled from "styled-components";
import { Link } from "react-router-dom";
import alert from "alertifyjs";
function PastOrder() {

  const [orderPastList, setOrderPastList] = useState([]);
  const [pastOrderPrice, setPastOrderPrice] = useState(0);



  useEffect(() => {
    const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));
    console.log(uidLoc);
    if (uidLoc !== null) {
      db.collection("personList")
        .doc(uidLoc)
        .collection("pastOrderList")
        .onSnapshot((onSnapshot) => {
          const pastOrderListItems = [];
          onSnapshot.forEach((doc) => {
            pastOrderListItems.push(doc);
          });
          setOrderPastList(pastOrderListItems);
        });
    }
  }, []);

 

  useEffect(() => {
    let countPrice = 0;

    orderPastList.map((item) => {
      countPrice +=
        item.data().cartPastOrderListPrice *
        item.data().cartPastOrderListQunatity;
    });
    setPastOrderPrice(countPrice);
  });

  const pastAddCartList = (item)=>{
    const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));
    const addCartItems = db
        .collection("personList")
        .doc(uidLoc)
        .collection("cartList")
        .doc(item.id);
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
            .doc(item.id)
            .set({
              addCartProductName: item.data().cartPastOrderListName,
              addCartProductPrice: item.data().cartPastOrderListPrice,
              addCartProductQuantity: 1,
              addCartProductTime: item.data().cartPastOrderListTime,
              addCartProductKind:item.data().cartPastOrderListKind
            
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

  return (
    <Wrapper>
      <Container>
        <PastOrderHeader>
          <MainTitle>
            <Link className="link" to="/">
              bitermoscoffe
            </Link>
          </MainTitle>
          <SubTitle>Geçmiş Siparişlerim</SubTitle>
        </PastOrderHeader>
        {orderPastList.length===0?
          <div className="emptyPastOrderList">
          <span>Geçmiş Siparişiniz Bulunmamaktadır</span>
          </div>
          :<PastOrderProduct>
          <PastOrderProductTop>
           
            <PastOrderCount>Adet: {orderPastList.length}</PastOrderCount>
            <PastOrderAmount>Fİyat : {pastOrderPrice}₺</PastOrderAmount>
          </PastOrderProductTop>

          {orderPastList.map((item, index) => (
            <PastOrderProductBottom>
              <PastOrderName>{item.data().cartPastOrderListName}</PastOrderName>

              <PastOrderPrice>
                Fiyat:{" "}
                {item.data().cartPastOrderListPrice *
                  item.data().cartPastOrderListQunatity}
              </PastOrderPrice>

              <PastOrderTime>
                Süre {item.data().cartPastOrderListTime} dk
              </PastOrderTime>

              <TryAddCartList onClick={()=>pastAddCartList(item)}>
              Sepete Ekle
              </TryAddCartList>
            </PastOrderProductBottom>
          ))}
        </PastOrderProduct>}
      </Container>
    </Wrapper>
  );
}

export default PastOrder;

const Wrapper = styled.div``;
const TryAddCartList = styled.button`
border:none;
padding:5px 10px;
border-radius:10px;
background-color:#29bb89;
color:white;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  .emptyPastOrderList{
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:20px;
    font-size:35px;
    font-weight:bold;
  }

`;
const PastOrderHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MainTitle = styled.span`
  margin-bottom: 30px;
  color: brown;
  font-weight: bold;
  font-size: 50px;
  @media only screen and (max-width:725px){
    font-size: 40px;

  }

  cursor: pointer;

  .link {
    text-decoration: none;
    color: brown;
    :hover {
      color: brown;
      text-decoration: none;
    }
  }
`;
const SubTitle = styled.span`
  color: red;
  margin-bottom: 20px;
  font-size: 35px;
  @media only screen and (max-width:725px){
    font-size: 25px;

  }
`;

const PastOrderDate = styled.span``;
const PastOrderAmount = styled.span``;
const PastOrderCount = styled.span``;
const PastOrderProduct = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width:725px)
  {
    width:300px;
  margin-left:50px;
  }
 
  
`;
const PastOrderProductTop = styled.div`
  width: 900px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border: 1px solid lightgray;
  background-color: rgb(249, 249, 249);
  @media only screen and (max-width:725px){
    width: 300px;
    font-size:15px;
    font-weight:bold;

  }
`;

const PastOrderProductBottom = styled.div`
  width: 900px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 15px;
  padding-bottom: 15px;
  @media only screen and (max-width:725px){
    width: 300px;
    font-size:15px;
    

  }
`;

const SpanSame = styled.span`
  font-size: 20px;
  @media only screen and (max-width:725px){
    
    font-size:15px;
    

  }
`;
const PastOrderName = styled(SpanSame)``;
const PastOrderPrice = styled(SpanSame)``;
const PastOrderTime = styled(SpanSame)``;
