import React, { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import Person from "@material-ui/icons/Person";
import "./Header.css";

function Header() {
  const [inputChanges, setInputChange] = useState(false);
  const [inputValue, setInputValue] = useState("");

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

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headertitle">bitermoscoffe</div>
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
            <DropdownMenu style={{ marginRight: "11px" }}>
              <div className="userContainer">
                <div className="userSing">
                  <div className="userImg">
                    <Person style={{ fontSize: 30 }} />
                  </div>
                  <div className="userNameNumber">
                    <div className="userName">
                      <span>Engin Gülek</span>
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

                    <li>Çıkış Yap</li>
                  </ol>
                </div>
              </div>
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
