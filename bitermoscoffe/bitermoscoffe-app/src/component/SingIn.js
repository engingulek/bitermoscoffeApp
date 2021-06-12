import React, { useRef, useState } from "react";
import styled from "styled-components";

import { FcGoogle } from "react-icons/fc";

import { Link, useHistory } from "react-router-dom";
import { auth, providerGoogle } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
} from "../reduxtoolkit/features/login/loginSlice";
function SingIn() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginRed);
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const [alertMesage, setAlertMesage] = useState("")
  const history = useHistory();

  const singInwithEmailandPassword = (event) => {
    event.preventDefault();
if (inputEmail.current.value==="" && inputPassword.current.value==="" ) {
 setAlertMesage("Boş bırakıldı gerekli alanları doldurunuz")
  
}

else{
  console.log(inputEmail.current.value + " " + inputPassword.current.value);

    auth
      .signInWithEmailAndPassword(
        inputEmail.current.value,
        inputPassword.current.value
      )
      .then((user) => {
        const emailUserInfo = [];

        dispatch(login(user.user));
        console.log("Çalıştı");
        history.push("/")
      })
      .catch((error) => {
        if (error.code ==="auth/wrong-password") {
          setAlertMesage("Üzgünüz, şifren yanlıştı. ")
          
          }
          else if (error.code==="auth/user-not-found") {
            setAlertMesage("Girdiğin kullanıcı adı bir hesaba ait değil.")
            
          }
      });

}
    
  };

  const singInGoogle = () => {
    auth.signInWithPopup(providerGoogle).catch((error) => console.log("Hata"));
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login(authUser));
      }
    });
  };

  return (
    <Wrapper>
      <PageTitle>
        <Link to="/" className="link">
          <span>bitermoscoffe</span>
        </Link>
      </PageTitle>

      <SingInContainer>
        <div className="title">
          <span>Giriş Yap</span>
        </div>
        <div className="inputContainer">
        
          <form  onSubmit={singInwithEmailandPassword}>
            <input
              type="text"
              placeholder="Email adresinizi giriniz"
              ref={inputEmail}
            />
            <input type="password" placeholder="password" ref={inputPassword} />
            
         
          <button >
          Giriş Yap
          
          </button>
         
          </form>
          
        
          
         
          
        </div>
        <div style={{color:"red", fontSize:"15px" , marginTop:"10px", margin:"10px"}}>
        <span>
        {alertMesage}
        </span>
      
        </div>
        <div className="withSocialMedia">
          <div className="socialMediaTitle">
            <span>Sosyal medya ile giriş yap</span>
          </div>
          <div className="socialMediaIcon">
            
            <div className="googleIcon" onClick={singInGoogle}>
              <FcGoogle />
            </div>
          </div>
        </div>
      </SingInContainer>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 472px;
  width: 100%;
  margin: 60px auto;
  color: #484848;
`;

const PageTitle = styled.div`
  .link {
    text-decoration: none;
    span {
      font-size: xx-large;
      font-weight: 700;
      color: #6f4e37;
    }
  }
`;

const SingInContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 72px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  max-width: 472px;
  width: 100%;
  margin: 50px auto;
  color: #484848;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .title {
    margin-bottom: 20px;
    span {
      font-size: 30px;
      font-weight: 700;
    }
  }
  .inputContainer > form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    input {
      border: 1px solid lightgray;
      padding: 10px 20px;
      outline: none;
      border-radius: 10px;
      :nth-child(2) {
        margin-top: 30px;
      }
    }
    button {
      margin-top: 20px;
      border: none;
      outline: none;
      padding: 10px 10px;
      border-radius: 10px;
      color: white;
      background-color: #54e346;
      :hover {
        background-color: #03c03c;
      }
    }
  }
  .withSocialMedia {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top: 1px solid lightgray;
    width: 100%;
    margin-top: 20px;
    .socialMediaTitle {
      margin-top: 15px;
      span {
        font-size: 20px;
        font-weight: 700;
        color: black;
      }
    }
    .socialMediaIcon {
      display: flex;
      flex-direction: row;
      font-size: 35px;
      margin-top: 10px;
      :hover {
        cursor: pointer;
      }
      .facebookIcon {
        margin-right: 40px;
      }
    }
  }
`;

export default SingIn;