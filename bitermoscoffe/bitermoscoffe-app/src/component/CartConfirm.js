import React, { useEffect, useState } from "react";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import addMonths from "date-fns/addMonths";
import styled from "styled-components";
import { Link } from "react-router-dom";
import alert from "alertifyjs";
import DatePicker from "react-datepicker";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import db from "../firebase";
import { useDispatch } from "react-redux";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  const [myAddress, setMyAddress] = useState([])
  const [myAddressTitle, setMyAddressTitle] = useState([])
  const a = 0;

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
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
        const cartConfirmItemPrice = 0;
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
    db.collection("personList")
    .doc(uidLoc)
    .collection("addressList")
    .onSnapshot((onSnapshot) => {
      const addressListItems = [];
      onSnapshot.forEach((doc) => {
        addressListItems.push(doc.data().addressTitle);
      });
      setMyAddressTitle(addressListItems);
    });
  }, [])

  useEffect(() => {
    if(adress==="")
    {
      db.collection("personList")
      .doc(uidLoc)
      .collection("addressList")
      .onSnapshot((onSnapshot) => {
        const addressListItems = [];
        onSnapshot.forEach((doc) => {
          addressListItems.push(doc);
        });
        setMyAddress(addressListItems);
      });
    }
    else{
      db.collection("personList")
      .doc(uidLoc)
      .collection("addressList").where("addressTitle","==",adress)
      .onSnapshot((onSnapshot) => {
        const addressListItems = [];
        onSnapshot.forEach((doc) => {
          addressListItems.push(doc);
        });
        setMyAddress(addressListItems);
      });

    }
   
  },[myAddress])



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
  });

  const timeToggle = () => {
    setTimeModal(!timeModal);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const orderClicled = () => {
    if(adress==="")
    {
      alert.error("Adress Seçimi Yapmadan Sipariş Veremezsiniz")
    }
    else{
      const email = JSON.parse(localStorage.getItem("userEmailLoc"));
      const userInfoServer = {
        email: email,
        summary: [],
        price: cartConfirmPrice,
        time: cartConfirmTime,
      };
      cartConfirm.map((item) =>
        userInfoServer.summary.push({
          name: "İsim: " + item.cartConfirmProducData.addCartProductName,
          quantity: "Adet: " + item.cartConfirmProducData.addCartProductQuantity,
        })
      );
      axios
        .post("http://localhost:3005/create", userInfoServer)
        .then(() => console.log("Book Created"))
        .catch((err) => {
          console.error(err);
        });
      setModal(!modal);
    }
   
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
          cartConfirmListKin:item.cartConfirmProducData.addCartProductKind
          
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

  const classes = useStyles();
  const [adress, setAdress] = React.useState("");

  const handleChange = (event) => {
    setAdress(event.target.value);

  };

  return (
    <Wrapper>
      <CartConfirmContainer>
        <HeaderContainer>
          <div className="pageTitle">
          <Link className="link" to="/">
          <span>bitermoscoffe</span>
          </Link>
            
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
          </OrderDec>
          <OrderUserDec>
            <div className="orderUserAdress">
              <div className="titleAdress">
                <div>
                  <span>Teslimat Adresi</span>
                </div>
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Adreslerim</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={adress}
                      onChange={handleChange}
                    >
                    {myAddressTitle.map((item)=>(
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                    
                      
                    </Select>
                  </FormControl>
                 
                </div>
               
              </div>
              {myAddress.length===0 &&
                <div className="emptyAdress">
              Hiç Bir Adresiniz Bulunmamaktadır. <Link to="/myAcount">Hesabıma</Link> giderek yeni adres ekleyiniz
                </div>}
             
              <div className="userAdress">
             
              {adress===""?<div className="adress">Bir Adress giriniz</div>:
             
              <AddressLocations >
              {
                myAddress.map((item)=>(
                  <AddressLocation >
                  {item.data().addressLocation}
                  </AddressLocation>
                
                ))
              }</AddressLocations>}
                
               
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
  @media only screen and (max-width:725px){
    display: flex;
  flex-direction: column;
   
}

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
  @media only screen and (max-width:725px){
    display: flex;
  flex-direction: column;
   
}



  
`;

const AddressLocations = styled.div`

`
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

const AddressLocation = styled.textarea`

width:100%;
height:100%;
font-size:18px;
outline-width:0px;
border:none;

  @media only screen and (max-width:725px){
    display: flex;
  flex-direction: column;
   
}

`
const OrderUserDec = styled.div`
  .orderUserAdress {
    display: flex;
    flex-direction: column;
    .emptyAdress{
      width:330px;
    }
    .titleAdress {
      display:flex;
      align-items:center;
      
      
      span {
        margin-right:20px;
        font-size: 20px;
        font-weight: 600;
      }
    }

    .userAdress {
      width: 300px;
      height: 100%;
      border: 2px solid #6f4e37;
      padding: 10px 20px;
      border-radius: 5px;
      @media only screen and (max-width:725px){
        width: 100%;
  
   
}

.adress{
  .addressLocation{
    @media only screen and (max-width:725px){
      width: 100px;
       
  
   
}

  }
}
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
