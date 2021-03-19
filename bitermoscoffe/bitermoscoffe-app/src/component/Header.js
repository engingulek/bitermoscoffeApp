import React, { useState } from "react";
import styled from "styled-components";
import PersonIcon from "@material-ui/icons/Person";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import HomeIcon from "@material-ui/icons/Home";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CloseIcon from "@material-ui/icons/Close";

function Header() {
  const [expandIcon, setExpandIcon] = useState(false);
  const [inputChanges, setInputChange] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const expandIconBttn = () => {
    setExpandIcon(!expandIcon);
  };

  const inputChange = (e) => {
    if (e.target.value.length > 0) {
      setInputChange(true);
    } else {
      setInputChange(false);
    }
  };

  const clearSearchBar = () => {
    setInputChange(false);
  };
  return (
    <Wrapper>
      <HeaderContainer>
        <PageTitle>
          <div className="logo"></div>
          <div className="title">
            <span>bitermoscoffe</span>
          </div>
        </PageTitle>

        <SearchBar>
          {inputChanges ? (
            <div>
              <input
                type="text"
                placeholder="bi termos kahvemi"
                onChange={inputChange}
              />
              <div>
                <CloseIcon onClick={clearSearchBar} />
              </div>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={inputValue}
                placeholder="bi termos kahvemi"
                onChange={inputChange}
              />
              <div>
                <HomeIcon />
                <span>Ev</span>
                <ArrowForwardIosIcon fontSize="small" />
              </div>
            </div>
          )}
        </SearchBar>

        <UserInfo>
          <div className="user" onClick={expandIconBttn} >
            <div className="userLogo">
              <PersonIcon />
            </div>

            <div className="userName">
              <span>Profil</span>
            </div>

            <div className="downButton">
              {expandIcon ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
          </div>
        </UserInfo>
      </HeaderContainer>

      {expandIcon ? (
        <MoreInfo>
          <div className="userCard">
            <div className="userTitle">
              <div className="userImage">
                <PersonIcon />
              </div>
              <div className="userInfo">
                <div className="userName">
                  <span>Engin Gülek</span>
                </div>
                <div className="userPhone">
                  <span>123456</span>
                </div>
              </div>
            </div>
            <div className="userSelect">
              <div className="userAddress">
                <span>Adreslerim</span>
              </div>
              <div className="pastOrders">
                <span>Geçmiş Siparişler</span>
              </div>
              <div className="userInvoice">
                <span>Fatura Bilgileri</span>
              </div>
              <div className="userPuan">
                <span>Puanlarım</span>
              </div>
              <div className="line">
              
              </div>
              <div className="exit">
              Çıkış Yap
               </div>
            </div>
          </div>
        </MoreInfo>
      ) : (
        false
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MoreInfo = styled.div`
  display: flex;
  justify-content: center;

  .userCard {
    border: 1px solid lightgray;
    margin-top: 65px;
    margin-left: 1200px;

    .userTitle {
      display: flex;
      flex-direction: row;
      background-color: lightgray;
      padding: 25px;
      .userImage{
          color:red;
          border:1px solid lightgray;
          background-color:white;
         padding:10px;
         border-radius:10px;
      }
      .userInfo {
        padding-left: 15px;
        .userPhone {
          padding-top: 5px;
        }
      }

      :hover
      {
          cursor: pointer;
      }
    }

    .userSelect{
        display:flex;
        flex-direction:column;
        padding-top:10px;
        
        div{
            padding-bottom:10px;
            padding-top:10px;
            display:flex;
            justify-content:center;
            
           
           
          
            :hover{
                background-color:red;
                cursor: pointer;
                color:white;

            }
            
        }
        .line{
                padding:0px;
                height:4px;
                background-color:red;
                margin-top:3px;
                margin-bottom:3px;
            }


    }
  }

  
`;

const HeaderContainer = styled.div`
  background-color: #6f4e37;
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const PageTitle = styled.div`
  display: flex;
  flex-direction: row;
  color: lightgray;

  font-size: 30px;

  div {
    display: flex;
    justify-content: space-between;
    margin-left: 10px;

    img {
      width: 35px;
      height: 35px;
    }
  }
`;

const SearchBar = styled.div`
  div {
    padding: 10px;
    display: flex;
    flex-direction: row;
    border: 1px solid lightgray;
    align-items: center;
    color: #6f4e37;
    background-color: white;
    border-radius: 99px;

    div {
      border-radius: 0;
      border: none;
      padding: 0;

      :hover {
        cursor: pointer;
      }
    }

    input {
      outline-width: 0;
      border: none;
      width: 350px;
      font-size: 15px;
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: color-interpolation-filters;

  div {
    margin-left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    position: relative;

    :last-child {
      margin-right: 20px;
    }

    :hover {
      cursor: pointer;
    }

    
  }

  /* 
  .moreUserInfo{
      display:block;
      align-items:center;
      justify-content:center;
      div{
        display:block;
      align-items:center;
      justify-content:center;
        border:1px solid lightgray;
      background-color:white;
      color:black;
      }
  } */
`;

export default Header;
