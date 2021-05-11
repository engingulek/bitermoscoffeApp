import React, { useEffect, useState } from "react";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import addMonths from "date-fns/addMonths";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import DatePicker from "react-datepicker";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import db from "../firebase";
import { useDispatch } from "react-redux";
import axios from "axios";


function CartConfirm() {
  const [modal, setModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [hourss, setHourss] = useState(new Date().getHours() + 1);
  const [orderTime, setOrderTime] = useState("");
  const time = new Date();
  const oorderTime = time.setMinutes(time.getHours() + 60);
  const [date, setDate] = useState(oorderTime);
  const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));
  const [cartConfirm, setCartConfirm] = useState([]);
  const [cartConfirmTime, setCartConfirmTime] = useState(0);
  const [cartConfirmPrice, setCaetConfirmPrice] = useState(0);

  const a = 0;
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    let time = new Date(date);
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let day = time.getDay();
    var gunler = [
      "pazar",
      "pazartesi",
      "salı",
      "çarşamba",
      "perşembe",
      "cuma",
      "cumartesi",
    ];

    setOrderTime(hours + ":" + minutes + " " + gunler[day]);
  }, [date]);

  useEffect(() => {
    db.collection("personList")
      .doc(uidLoc)
      .collection("cartList")
      .onSnapshot((onSnapshot) => {
        const cartConfirmItem = [];
        const cartConfirmItemPrice =0;
        onSnapshot.forEach((doc) => {
          cartConfirmItem.push({
            cartConfirmProductId: doc.id,
            cartConfirmProducData: doc.data(),
          });
          
        });
        setCartConfirm(cartConfirmItem);
       
      });
      
  }, []);

  useEffect(() => {
    let countPrice = 0;
    let countTime = 0;

    cartConfirm.map((item) => {
      countPrice +=
        item.cartConfirmProducData.addCartProductPrice *
        item.cartConfirmProducData.addCartProductQuantity;
      countTime += item.cartConfirmProducData.addCartProductTime;
    });
    setCaetConfirmPrice(countPrice);
    // console.log(countPrice)
    // console.log(countTime)
    
    setCartConfirmTime(countTime);
  },);

  const timeToggle = () => {
    setTimeModal(!timeModal);
  };

  const toggle = () => {
    setModal(!modal);
  };
  

  const orderClicled = () => {
    const email = JSON.parse(localStorage.getItem("userEmailLoc"));
    const userInfoServer = {
      email: email,
      summary: [],
      price:cartConfirmPrice,
      time:cartConfirmTime

    };
   
    // console.log(cartConfirm)
    cartConfirm.map((item)=>(
      userInfoServer.summary.push({
        name:"İsim: "+item.cartConfirmProducData.addCartProductName,
        quantity:"Adet: "+item.cartConfirmProducData.addCartProductQuantity
  
      })

    ))
    

   

    axios
      .post("http://localhost:3005/create",userInfoServer)
      .then(() => console.log("Book Created"))
      .catch((err) => {
        console.error(err);
      });

    setModal(!modal);
  };

  const cartConfirmClicked = () => {
    setModal(!modal);
    const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));
    cartConfirm.map((item) =>
      db
        .collection("personList")
        .doc(uidLoc)
        .collection("cartConfirmList")
        .doc(item.cartConfirmProductId)
        .set({
          cartConfirmListName: item.cartConfirmProducData.addCartProductName,
          cartConfirmListPrice: item.cartConfirmProducData.addCartProductPrice,
          cartConfirmListQunatity:
            item.cartConfirmProducData.addCartProductQuantity,
          cartConfirmListTime: item.cartConfirmProducData.addCartProductTime,
        })
    );

    cartConfirm.map((item) =>
      db
        .collection("personList")
        .doc(uidLoc)
        .collection("cartList")
        .doc(item.cartConfirmProductId)
        .delete()
        .then(() => {
          // console.log("Success");
        })
        .catch((error) => {
          console.log(error);
        })
    );
  };

  return (
    <Wrapper>
      <CartConfirmContainer>
        <HeaderContainer>
          <div className="pageTitle">
            <span>bitermoscoffe</span>
          </div>
          <div className="deliveryTimeHeader">
            <span>10-{cartConfirmTime + 10}dk</span>
          </div>
        </HeaderContainer>
        <Order>
          <OrderDec>
            <div className="deliveryTime">
              <div className="deliveryTimeTitle">
                <span>Telimat Yöntemi</span>
              </div>
              <div className="deliveryTimeChoose">
                <form>
                  <div>
                    <input type="radio" name="time" id="now" />
                    <label htmlFor="now">Şimdi Teslim Et</label>
                  </div>
                  <div>
                    <div>
                      <input
                        type="radio"
                        name="time"
                        id="time"
                        onClick={timeToggle}
                      />
                      <label htmlFor="time">Zaman Belirleme</label>
                    </div>
                    <div className="defaultDeliveryTime">
                      <span>{"   Geçerli Zaman  " + orderTime}</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="addNote">
              <div className="addNoteTitle">
                <span>Not Ekle</span>
              </div>
              <div className="add">
                <textarea placeholder="Eklemek İstediğiniz Notu Yazınız."></textarea>
              </div>
            </div>
          </OrderDec>
          <OrderUserDec>
            <div className="orderUserAdress">
              <div className="titleAdress">
                <span>Teslimat Adresi</span>
              </div>
              <div className="userAdress">
                <span>Siparişin Teslim Edileceği Adres</span>
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <span style={{ fontSize: "20px", fontWeight: "600" }}>
                Siparişleriniz
              </span>
            </div>

            <div className="ordersInfo">
              <div className="ordersTitle">
                <span>No:</span>
                <span>Sipariş</span>
                <span>Fiyat</span>
              </div>
              <div className="ordersContainer">
                {cartConfirm.map((item, index) => (
                  <div key={index}>
                    <div className="ordersIndex">{index + 1}</div>
                    <div className="ordersName">
                      {item.cartConfirmProducData.addCartProductName}
                    </div>
                    <div className="ordersPrice">
                      {item.cartConfirmProducData.addCartProductPrice *
                        item.cartConfirmProducData.addCartProductQuantity}
                      .00 ₺
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </OrderUserDec>
        </Order>
        <OrderButton>
          <button onClick={orderClicled}>
            Sipariş Ver
            <br />
            {cartConfirmPrice}.00₺
          </button>
        </OrderButton>
      </CartConfirmContainer>

      <Modal isOpen={modal}>
        <ModalBody
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          Siparişinz Alınmıştır <br />
          Afiyet Oldun
        </ModalBody>
        <ModalFooter>
          <Link to="/">
            <Button color="danger" onClick={cartConfirmClicked}>
              Kapat
            </Button>
          </Link>
        </ModalFooter>
      </Modal>
      <Modal isOpen={timeModal} toggle={timeToggle}>
        <ModalBody
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontWeight: "600",
          }}
        >
          <DatePicker
            selected={startDate}
            onChange={(date) => setDate(date)}
            locale="pt-TR"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            dateFormat="Pp"
            inline
            minTime={setHours(setMinutes(new Date(), a), hourss)}
            maxTime={setHours(setMinutes(new Date(), 30), 23)}
            minDate={new Date()}
            maxDate={new Date()}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={timeToggle}>
            Kapat
          </Button>
        </ModalFooter>
      </Modal>
    </Wrapper>
  );
}
const Wrapper = styled.div``;
const CartConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const HeaderContainer = styled.div`
  width: 100%;

  background-color: #6f4e37;
  padding: 15px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 1000;
  top: 0;
  left: 0;

  .pageTitle {
    span {
      color: white;
      font-size: 30px;
    }
  }
  .deliveryTimeHeader {
    border: 1px solid #29bb89;
    padding: 10px 10px;
    border-radius: 10px;
    background-color: #29bb89;
    height: 100%;
    span {
      color: white;
      font-size: 19px;
      font-weight: 700;
    }
  }
`;
const Order = styled.div`
  margin-top: 120px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const OrderDec = styled.div`
  display: flex;
  flex-direction: column;
  .deliveryTime {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    .deliveryTimeTitle {
      span {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .deliveryTimeChoose {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 10px 50px;
      padding-right: 180px;
      height: 100%;
      border: 2px solid #6f4e37;
      border-radius: 5px;
      margin-bottom: 40px;
      margin-top: 30px;
      div {
        font-size: 18px;

        label {
          margin-left: 20px;

          :hover {
            cursor: pointer;
          }
        }

        input {
          font-size: 19px;
          :hover {
            cursor: pointer;
          }
        }
        .defaultDeliveryTime {
          font-size: 15px;
        }
      }
    }
  }
  .addNote {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    .addNoteTitle {
      span {
        font-size: 20px;
        font-weight: 600;
      }
      margin-bottom: 20px;
    }
    .add {
      width: 100%;

      height: 100%;
      border: 2px solid #6f4e37;
      border-radius: 5px;
      textarea {
        border: none;
        outline: none;
        width: 100%;
        padding: 10px 20px;
      }
    }
  }
`;
const OrderUserDec = styled.div`
  .orderUserAdress {
    display: flex;
    flex-direction: column;
    .titleAdress {
      margin-bottom: 20px;
      span {
        font-size: 20px;
        font-weight: 600;
      }
    }

    .userAdress {
      width: 100%;
      height: 100%;
      border: 2px solid #6f4e37;
      padding: 10px 20px;
      border-radius: 5px;
    }
  }

  .ordersInfo {
    font-size: 17px;
    font-weight: 600px;
    margin-top: 10px;
    width: 100%;

    border: 2px solid #6f4e37;
    padding: 10px 20px;
    border-radius: 5px;
    .ordersContainer {
      div {
        display: flex;
        flex-direction: row;
        margin-left: 15px;
        margin-top: 7px;
      }

      .ordersName {
        margin-left: 30px;
      }
      .ordersPrice {
        margin-left: 25px;
      }
    }
  }

  .ordersTitle {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 10px;
  }
`;

const OrderButton = styled.div`
  display: flex;
  margin-top: 60px;
  justify-content: center;
  button {
    border: none;
    padding: 10px 50px;
    color: white;
    background-color: #54e346;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 600;
    :hover {
      background-color: #03c03c;
    }
  }
`;
export default CartConfirm;
