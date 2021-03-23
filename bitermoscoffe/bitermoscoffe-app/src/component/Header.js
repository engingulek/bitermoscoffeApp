import React, { useState } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import PersonIcon from "@material-ui/icons/Person";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import HomeIcon from "@material-ui/icons/Home";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components"
import "./Header.css"

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


  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
  return (
    <div className="header">
    <div className="headerContainer">
    <div className="headertitle">
    bitermoscoffe
    </div>
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
      <DropdownMenu style={{marginRight:"1px"}}>
        lmcl.mdvsd
        vdşvkdvsvs
        lvmdlşvmsvmsd
        lvmnşvlsvmşslvs
        lşsmvmvşmmsdvlmds
        lvmdmvdsvşlşmşslvmşsmv
      </DropdownMenu>
    </Dropdown>
    

    
    </div>
    
    </div>
      
    </div>
  )
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


export default Header
