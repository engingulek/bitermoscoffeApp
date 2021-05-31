import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { auth, providerFacebook, providerGoogle } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import alert from "alertifyjs";
import {
  login,
  logout,
  selectUser,
} from "../reduxtoolkit/features/login/loginSlice";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

function SingUp() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginRed);
  const inputName = useRef(null);
  const inputSurname = useRef(null);
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const history = useHistory();

  const singUpPasswordAndEmail = (event) => {
    event.preventDefault();
    if (
      inputName.current.value === "" ||
      inputSurname.current.value === "" ||
      inputEmail.current.value === ""
    ) {
      alert.error("Boş bırakılan yerleri doldurunuz");
    } else {
      auth
        .createUserWithEmailAndPassword(
     inputEmail.current.value,  inputPassword.current.value
        ).then(function (result) {
          return result.user.updateProfile({
            displayName:
          inputName.current.value + " " + inputSurname.current.value,});})
        .then((user) => {
          alert.success("Hesabınız Oluşturuldu Ana Sayfada Giriş Yapınız");
          history.push("/");})
        .catch((err) => {
          if (err.code === "auth/invalid-email") {
            alert.error("Desteklenmeyen e-mail şekli");
          } else if (err.code === "auth/weak-password") {
            alert.error("6 karakterden uzun şifre giriniz");
          } else if (err.code === "auth/email-already-in-use") {
            alert.error("Girdiğiniz e-posta kullanılmaktadır");
         }});}};

  const singUpGoogle = () => {
    auth.signInWithPopup(providerGoogle).catch((error) => console.log("Hata"));
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        alert.success("Ana Sayfadan Giriş Yapabilirisniz");
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

      <SingUpContainer>
        <div className="withSocialMedia">
          <div className="title">
            <span>Sosyal medya ile üye ol </span>
          </div>
          <div className="socialMediaIcon">
            <div className="googleIcon" onClick={singUpGoogle}>
              <img
                src="https://img-authors.flaticon.com/google.jpg"
                alt="googleIcon"
              />
            </div>
          </div>
        </div>
        <div className="withEmailPassaword">
          <div className="title">
            <span>E-posta adresi ile üye ol</span>
          </div>
          <div className="userForm">
            <form onSubmit={singUpPasswordAndEmail}>
              <input type="text" placeholder="Ad" id="name" ref={inputName} />
              <input
                type="text"
                placeholder="Soyad"
                id="surname"
                ref={inputSurname}
              />

              <input
                type="text"
                placeholder="E-posta Adresi"
                id="eposta"
                ref={inputEmail}
              />

              <input
                type="password"
                placeholder="Şifre"
                id="password"
                ref={inputPassword}
              />

              <div className="singUpBttn">
                <button>Üye Ol</button>
              </div>
            </form>
          </div>
        </div>
      </SingUpContainer>
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

const SingUpContainer = styled.div`
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
  .withSocialMedia {
    .socialMediaIcon {
      display: flex;
      flex-direction: row;
      margin-top: 18px;
      margin-bottom: 18px;
      justify-content: space-evenly;
      .googleIcon,
      .facebookIcon {
        display: flex;
        justify-content: center;
        align-content: center;
        border-radius: 4px;
        height: 100%;
        border: 1px solid lightgray;
        :hover {
          cursor: pointer;
        }
        img {
          padding-left: 5px;
          width: 50px;
          height: 50px;
        }
      }
    }
  }
  .withEmailPassaword {
    display: flex;
    flex-direction: column;
    .userForm {
      form {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
      }
      input {
        margin-top: 30px;
        outline: none;
        background-color: lightgray;
        outline-width: 0;
        padding: 10px;
        display: flex;
        flex-direction: row;
        border: 1px solid lightgray;
        align-items: center;
        color: #6f4e37;
        background-color: white;
        border-radius: 10px;
      }
    }
  }
  .singUpBttn {
    margin-top: 20px;
    button {
      border: none;
      min-width: 180px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 20px;
      background-color: #54e346;
      color: white;
      :hover {
        background-color: #03c03c;
      }
    }
  }
`;

export default SingUp;
