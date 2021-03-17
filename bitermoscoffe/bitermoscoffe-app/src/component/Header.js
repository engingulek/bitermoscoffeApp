import React, { useState } from "react";
import styled from "styled-components";
import PersonIcon from '@material-ui/icons/Person';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import HomeIcon from '@material-ui/icons/Home';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CloseIcon from '@material-ui/icons/Close';
function Header() {

    const [expandIcon,setExpandIcon]=useState(false);
    const [inputChanges,setInputChange]=useState(false);
    const [inputValue,setInputValue]=useState("");
    const expandIconBttn =()=>{
        setExpandIcon(!expandIcon)
    }

    const inputChange=(e)=>{
        
        
        if(e.target.value.length>0)
        {
            setInputChange(true)
            
        }
        else{
            setInputChange(false)
        }
        

    }

    const clearSearchBar =()=>{
        setInputChange(false)
        
        

    }
  return (
    <Wrapper>
      <HeaderContainer>
        <PageTitle>
        <div className="logo">
        <img src="https://www.flaticon.com/svg/vstatic/svg/2087/2087625.svg?token=exp=1616008632~hmac=239c5019a21d49b910d3906547f6ff0f"
        alt="logo"
        />
        </div>
        <div className="title">
        <span>bitermoscoffe</span>
        </div>

      
          

        </PageTitle>

        <SearchBar>
        {
            inputChanges ? <div>
            <input type="text" placeholder="bi termos kahvemi" onChange={inputChange} />
            <div>
            <CloseIcon onClick={clearSearchBar}/>
            
            </div>
            
            </div>: <div>
        <input type="text" value={inputValue} placeholder="bi termos kahvemi" onChange={inputChange} />
        <div>
        <HomeIcon/>
        <span>
        Ev
        </span>
        <ArrowForwardIosIcon fontSize="small"/>
       
        </div>
       
        
        </div>

        }
       
          
        </SearchBar>

        <UserInfo onClick={expandIconBttn}>
          <div className="userLogo">
          <PersonIcon />
          </div>

          <div className="userName">
          <span>
          Profil
          </span>
          
          </div>

          <div className="downButton" >
          {
              expandIcon?<ExpandLessIcon/>:<ExpandMoreIcon/>

          }
          
          </div>
        </UserInfo>
      </HeaderContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`



`;

const HeaderContainer = styled.div`
background-color:#6F4E37;
position:fixed;
width:100%;
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
padding:10px;

`

const PageTitle = styled.div`
display:flex;
flex-direction:row;
color:lightgray;

font-size:30px;



div{
    display:flex;
    justify-content:space-between;
    margin-left:10px;


img{
    width:35px;
    height:35px;

}
   
}
`;

const SearchBar = styled.div`
div{
    padding:10px;
display:flex;
flex-direction:row;
border : 1px solid lightgray;
align-items:center;
color:#6F4E37;
background-color:white;
border-radius:99px;

div{
    border-radius:0;
    border:none;
    padding:0;
  
   

    
    :hover{
        cursor: pointer;
    }
}



 input{
     outline-width:0;
     border:none;
     width:350px;
     font-size:15px;
 }

}




`;

const UserInfo = styled.div`
display:flex;
flex-direction:row;


div{
    margin-left:5px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;

   
    :last-child{
        margin-right:20px;
    }

    :hover{
        cursor: pointer;
    }

    
}

`;
export default Header;
