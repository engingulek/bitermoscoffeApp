import React from "react";
import styled from "styled-components";
import {
    Link
  } from "react-router-dom"

function SingUp() {
  return (
    <Wrapper>
      <PageTitle>
       
        <Link to="/" className="link">
        <span>
        
        bitermoscoffe
        
        </span>
        </Link>
      </PageTitle>

      <SingUpContainer>
        <div className="withSocialMedia">
          <div className="title">
            <span>Sosyal medya ile üye ol  </span>
          </div>
          <div className="socialMediaIcon">
            <div className="facebookIcon">
              <img
                src="https://i.pinimg.com/736x/ac/57/3b/ac573b439cde3dec8ca1c6739ae7f628.jpg"
                alt="facebookIcon"
              />
            </div>
            <div className="googleIcon">
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
            <form>
              <input type="text" placeholder="Ad" id="name" />
              <input type="text" placeholder="Soyad" id="surname" />
              <input type="text" placeholder="E-posta Adresi" id="eposta" />
              <input type="password" placeholder="Şifre" id="password" />
            </form>
          </div>
        </div>
        <div className="singUpBttn">
          <button>Üye Ol</button>
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
  .link{
      text-decoration:none;
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