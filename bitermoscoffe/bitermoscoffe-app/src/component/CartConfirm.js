import React, { Fragment, useEffect, useState } from "react";
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
import { cartConfirmTimeReducer, selectedDate } from "../reduxtoolkit/features/product/productSlice";

function CartConfirm() {
  const [modal, setModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const time = new Date();
  const [orderTime, setOrderTime] = useState({
    hours:time.getHours() + 1,
    minute:"00"
  });
  const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));
  const [cartConfirm, setCartConfirm] = useState([]);
  const [stepTimer, setStepTimer] = useState({
    makeReady: 0,
    deliver: 0,
  });
  // local bilgisi olmadıığından teslim süresi default verildi
  const [locationTime, setLocationTime] = useState(20);
  const [adress, setAdress] = useState("");

  const [cartConfirmTime, setCartConfirmTime] = useState({
    max: 0,
    min: 0,
  });
  const [cartConfirmPrice, setCaetConfirmPrice] = useState(0);
  const [myAdress, setMyAdress] = useState("");

  const [myAddressTitle, setMyAddressTitle] = useState([]);
  const a = 0;
  const [openToServer,setOpenToServe]= useState(false)

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




  // useEffect(() => {
  //   let time = new Date(date);
  //   let hours = time.getHours();
  //   setOrderTime(hours + ":" +"00" + " ");
  // }, [date]);

  useEffect(() => {
    db.collection("personList")
      .doc(uidLoc)
      .collection("cartList")
      .onSnapshot((onSnapshot) => {
        const cartConfirmItem = [];
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
    console.log(adress);
    if (adress !== "") {
      db.collection("personList")
        .doc(uidLoc)
        .collection("addressList")
        .where("addressTitle", "==", adress)
        .onSnapshot((onSnapshot) => {
          let addressLocation = null;
          onSnapshot.forEach((doc) => {
            addressLocation = doc.data().addressLocation;
          });
          setMyAdress(addressLocation);
        });
    }

    // doc.data().addressTitle
  }, [adress]);

  useEffect(() => {
    db.collection("personList")
      .doc(uidLoc)
      .collection("addressList")
      .onSnapshot((onSnapshot) => {
        const addressTitle = [];
        onSnapshot.forEach((doc) => {
          addressTitle.push(doc.data().addressTitle);
        });

        setMyAddressTitle(addressTitle);
      });
  }, []);

  // useEffect(() => {
  //   if (adress === "") {
  //     db.collection("personList")
  //       .doc(uidLoc)
  //       .collection("addressList")
  //       .onSnapshot((onSnapshot) => {
  //         const addressListItems = [];
  //         onSnapshot.forEach((doc) => {
  //           addressListItems.push(doc);
  //         });
  //         setMyAddress(addressListItems);
  //       });
  //   } else {
  //     db.collection("personList")
  //       .doc(uidLoc)
  //       .collection("addressList")
  //       .where("addressTitle", "==", adress)
  //       .onSnapshot((onSnapshot) => {
  //         const addressListItems = [];
  //         onSnapshot.forEach((doc) => {
  //           addressListItems.push(doc);
  //         });
  //         setMyAddress(addressListItems);
  //       });
  //   }
  // }, [myAddress]);

  useEffect(() => {
    let countPrice = 0;
    let countTime = [];
    let defaultTime = 0;

    cartConfirm.forEach((element) => {
      countPrice +=
        element.cartConfirmProducData.addCartProductPrice *
        element.cartConfirmProducData.addCartProductQuantity;
      countTime.push(
        element.cartConfirmProducData.addCartProductTime *
          element.cartConfirmProducData.addCartProductQuantity
      );
    });

    // cartConfirm.map((item) => {
    //   countPrice +=
    //     item.cartConfirmProducData.addCartProductPrice *
    //     item.cartConfirmProducData.addCartProductQuantity;

    // });

    // console.log(Math.max(...countTime));
    // console.log(Math.min(...countTime));
    setCaetConfirmPrice(countPrice);

    setCartConfirmTime({
      min: Math.max(...countTime) + locationTime,
      max: Math.max(...countTime) + locationTime + 15,
    });

    setStepTimer({
      makeReady:
        Math.max(...countTime) === 0 ? 10 : Math.max(...countTime) === 0,
      deliver: locationTime,
    });

    // console.log(countPrice)
    // console.log(countTime)
  }, [cartConfirm]);

  const timeToggle = () => {
    setTimeModal(!timeModal);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const orderClicled = () => {
    if (myAdress.length === 0) {
      alert.error("Adress Seçimi Yapmadan Sipariş Veremezsiniz");
    } else {
      const email = JSON.parse(localStorage.getItem("userEmailLoc"));
      const userInfoServer = {
        email: email,
        summary: [],
        price: cartConfirmPrice,
        minTime: cartConfirmTime.min,
        maxTime: cartConfirmTime.max,
      };
    

    
      if(orderTime!==null)
      {
        cartConfirm.forEach((element) => {
          userInfoServer.summary.push({
            name: "İsim: " + element.cartConfirmProducData.addCartProductName,
            quantity:
              "Adet: " + element.cartConfirmProducData.addCartProductQuantity,
              time:"Sipariş Hazırlanma Saati" + orderTime
          });
        });

      }else{
        cartConfirm.forEach((element) => {
          userInfoServer.summary.push({
            name: "İsim: " + element.cartConfirmProducData.addCartProductName,
            quantity:
              "Adet: " + element.cartConfirmProducData.addCartProductQuantity,
          });
        });
      }


      axios
        .post("http://localhost:3005/create", userInfoServer)
        .then(() => console.log("Book Created"))
        .catch((err) => {
          console.error(err);
        });
      setModal(!modal);

      console.log(stepTimer);
      dispatch(cartConfirmTimeReducer(stepTimer));
    }
  };

  const cartConfirmClicked = () => {
    setModal(!modal);
    const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));
    cartConfirm.forEach((element) => {
      db.collection("personList")
        .doc(uidLoc)
        .collection("cartConfirmList")
        .doc(element.cartConfirmProductId)
        .set({
          cartConfirmListName: element.cartConfirmProducData.addCartProductName,
          cartConfirmListPrice:
            element.cartConfirmProducData.addCartProductPrice,
          cartConfirmListQunatity:
            element.cartConfirmProducData.addCartProductQuantity,
          cartConfirmListTime: element.cartConfirmProducData.addCartProductTime,
          cartConfirmListKin: element.cartConfirmProducData.addCartProductKind,
        });
    });

    // cartConfirm.map((item) =>
    //   db
    //     .collection("personList")
    //     .doc(uidLoc)
    //     .collection("cartConfirmList")
    //     .doc(item.cartConfirmProductId)
    //     .set({
    //       cartConfirmListName: item.cartConfirmProducData.addCartProductName,
    //       cartConfirmListPrice: item.cartConfirmProducData.addCartProductPrice,
    //       cartConfirmListQunatity:
    //         item.cartConfirmProducData.addCartProductQuantity,
    //       cartConfirmListTime: item.cartConfirmProducData.addCartProductTime,
    //       cartConfirmListKin: item.cartConfirmProducData.addCartProductKind,
    //     })
    // );

    cartConfirm.forEach((element) => {
      db.collection("personList")
        .doc(uidLoc)
        .collection("cartList")
        .doc(element.cartConfirmProductId)
        .delete()
        .then(() => {
          // console.log("Success");
        })
        .catch((err) => {
          console.log(err);
        });
    });

    // cartConfirm.map((item) =>
    //   db
    //     .collection("personList")
    //     .doc(uidLoc)
    //     .collection("cartList")
    //     .doc(item.cartConfirmProductId)
    //     .delete()
    //     .then(() => {
    //       // console.log("Success");
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    // );
  };

  const classes = useStyles();

  const handleChange = (event) => {
    setAdress(event.target.value);
  };

  const onChangeDate = (date)=>{
    setOrderTime({
      hours:date.getHours(),
      minute:"00"
    })
    dispatch(selectedDate(orderTime))
  }

  

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
            {/*15 dk gecikme payı */}
            <span>
              {cartConfirmTime.min}-{cartConfirmTime.max}dk
            </span>
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
                      <span>{"   Geçerli Zaman  " + orderTime.hours+":00"}</span>
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
                <Button onClick={()=>setOpenToServe(!openToServer)} >Ismarla</Button>
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Adreslerim
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={adress}
                      onChange={handleChange}
                    >
                      {myAddressTitle.map((item, index) => (
                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              {myAddressTitle.length===0?
                <div className="emptyAdress">
              Hiç Bir Adresiniz Bulunmamaktadır. <Link to="/myAcount">Hesabıma</Link> giderek yeni adres ekleyiniz
                </div>:false}

              <div className="userAdress">
{openToServer===false? <Fragment>
  {adress === "" ? (
                  <div className="adress">Bir Adres Seçiniz</div>
                ) : (
                  
                  <AddressLocations>
                  
            
                    {myAdress}
                    
                    </AddressLocations>
                )}
</Fragment>:<Fragment>
  <ToServerInput type="text" onChange={(event)=>setMyAdress(event.target.value)}/>
  </Fragment>}


            
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <span style={{ fontSize: "20px", fontWeight: "600" }}>
                Siparişleriniz
              </span>
            </div>

            <div className="ordersInfo">
              <table style={{ width: "100%" }}>
                <tr>
                  <th>No:</th>
                  <th>Sipariş:</th>
                  <th>Fiyat:</th>
                </tr>

                {cartConfirm.map((item, index) => (
                  <tr key={item.cartConfirmProductId}>
                    <td>{index + 1}</td>
                    <td className="ordersName">
                      {item.cartConfirmProducData.addCartProductName}
                    </td>
                    <td className="ordersPrice">
                      {item.cartConfirmProducData.addCartProductPrice *
                        item.cartConfirmProducData.addCartProductQuantity}
                      .00 ₺
                    </td>
                  </tr>
                ))}
              </table>
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
            onChange={(date) => onChangeDate(date)}
           
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            dateFormat="Pp"
            inline
            minTime={setHours(
              setMinutes(new Date(), 0),
              new Date().getHours() + 1
            )}
            maxTime={setHours(setMinutes(new Date(), 0), 21)}
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
  @media only screen and (max-width: 725px) {
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
  @media only screen and (max-width: 725px) {
    display: flex;
    flex-direction: column;
  }
`;

const AddressLocations = styled.div``;
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
  width: 100%;
  height: 100%;
  font-size: 18px;
  outline-width: 0px;
  border: none;
  @media only screen and (max-width: 725px) {
    display: flex;
    flex-direction: column;
  }
`;
const OrderUserDec = styled.div`
  .orderUserAdress {
    display: flex;
    flex-direction: column;
    .emptyAdress {
      width: 330px;
    }
    .titleAdress {
      display: flex;
      align-items: center;
      span {
        margin-right: 20px;
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
      @media only screen and (max-width: 725px) {
        width: 100%;
      }
      .adress {
        .addressLocation {
          @media only screen and (max-width: 725px) {
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
        overflow-x: scroll;
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


const ToServerInput = styled.textarea`
outline-width: 0px;
width: 250px;
height: 80px;


`
export default CartConfirm;
