import React, { useEffect, useState } from "react";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import addMonths from "date-fns/addMonths";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import DatePicker from "react-datepicker";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";





function CartConfirm() {
  const [modal, setModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [hourss, setHourss] = useState(new Date().getHours() + 1);
  const [orderTime, setOrderTime] = useState("");
  const time = new Date();
  const oorderTime = time.setMinutes(time.getHours() + 60);
  const [date, setDate] = useState(oorderTime);
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

  const timeToggle = () => {
    setTimeModal(!timeModal);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const classes = useStyles();
  return (
    <Wrapper>
      <CartConfirmContainer>
        <HeaderContainer>
          <div className="pageTitle">
            <span>bitermoscoffe</span>
          </div>
          <div className="deliveryTimeHeader">
            <span>10-20dk</span>
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
           
          </OrderUserDec>
        </Order>
        <OrderButton>
          <button onClick={toggle}>
            Sipariş Ver
            <br />
            60 tl
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
            <Button color="danger" onClick={toggle}>
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
