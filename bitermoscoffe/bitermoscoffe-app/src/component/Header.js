import React, { useEffect, useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import Person from "@material-ui/icons/Person";
import "./Header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  selectUser,
  cartLogin
} from "../reduxtoolkit/features/login/loginSlice";
import { menuSelected } from "../reduxtoolkit/features/menu/menuSlice";

function Header() {
  const [inputChanges, setInputChange] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [userSing, setUserSing] = useState(false);
 

  const dispatch = useDispatch();

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

  const singInbttnOnClick = () => {
    setUserSing(true);
    setDropdownOpen(false);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = useSelector((state) => state.loginRed);
  const menuSelector = useSelector((state) => state.menuRed);
  const [userLoc, setUserLoc] = useState([]);
  // console.log(user.emailInfo);
  
  

  const localStarnge = () => {
    if (user.userInfo !== null) {
      const uid = user.userInfo.uid;
      const userName = user.userInfo.displayName;
      const userEmail = user.userInfo.email;

      localStorage.setItem("userNameLoc", JSON.stringify(userName));
      localStorage.setItem("uidLoc", JSON.stringify(uid));
      localStorage.setItem("userEmailLoc", JSON.stringify(userEmail));
      localStorage.setItem("uidLocOut", JSON.stringify(uid));
    }
  };
  const userNameLoc = JSON.parse(localStorage.getItem("userNameLoc"));
  const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));
  const userEmailLoc = localStorage.getItem("userEmailLoc");
  const uidLocOut = JSON.parse(localStorage.getItem("uidLocOut"));



  useEffect(() => {
    localStarnge();
  }, userLoc);

  const [login, setuser] = useState("");
  const deneme = () => {
    console.log();
    if (user.userInfo == null) {
      setUserSing(false);
      setuser("not");
    } else {
      setUserSing(true);
      setuser(user.userInfo.displayName);
    }
  };
  useEffect(() => {
    deneme();
  });

  const singOutbttnOnClick = () => {
    setUserSing(false);
    setDropdownOpen(false);
    dispatch(logout());
    dispatch(cartLogin())
    localStorage.setItem("uidLocOut", JSON.stringify(null));
    localStorage.setItem("uidLoc", JSON.stringify(null));
  };

  

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <div className="header">
      <div className="headerContainer">
      <Link to="/" className="headertitleLink" onClick={()=> dispatch(menuSelected(""))}>
      <div className="headertitle">bitermoscoffe</div>
      </Link>
      
        <div className="headerSearchBar">
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
        </div>

        <div className="userInfo">
          <Dropdown direction="right" isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle
              tag="span"
              data-toggle="dropdown"
              aria-expanded={dropdownOpen}
            >
              <div className="userIcons">
                <PersonIcon />
              </div>
            </DropdownToggle>
            <DropdownMenu style={{ marginRight: "11px", borderRadius: "10px" }}>
              {uidLocOut ? (
                <div className="userSingIn">
                  <div className="userSing">
                    <div className="userImg">
                      <Person style={{ fontSize: 30 }} />
                    </div>
                    <div className="userNameNumber">
                      <div className="userName">
                        <span>{userNameLoc}</span>
                      </div>
                      <div className="userNumber">
                        <span>+905345658496</span>
                      </div>
                    </div>
                  </div>
                  <div className="userMore">
                    <ol>
                      <li>Adreslerim</li>
                      <li>Favori Ürümlerim</li>
                      <li>Geçmiş Siparişlerim</li>
                      <li>Fatura Bilgileri</li>

                      <li onClick={singOutbttnOnClick}>Çıkış Yap</li>
                    </ol>
                  </div>
                </div>
              ) : (
                <div className="userSingOut">
                  <div className="singInbttn" onClick={singInbttnOnClick}>
                    <button>
                      <Link to="/singIn" className="linkSingIn">
                        Giriş Yap
                      </Link>
                    </button>
                  </div>
                  <div className="singUpbttn">
                    <button>
                      <Link to="/singUp" className="linksingUp">
                        Üye Ol
                      </Link>
                    </button>
                  </div>
                </div>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

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

export default Header;
