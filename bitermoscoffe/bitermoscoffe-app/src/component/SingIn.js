import React from "react";
import styled from "styled-components";
import FacebookIcon from "@material-ui/icons/Facebook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

function SingIn() {
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
          <input type="text" placeholder="Email adresinizi giriniz" />
          <input type="password" placeholder="password" />
          <button>Giriş Yap</button>
        </div>
        <div className="withSocialMedia">
          <div className="socialMediaTitle">
            <span>Sosyal medya ile giriş yap</span>
          </div>
          <div className="socialMediaIcon">
            <div className="facebookIcon">
              <FaFacebook color="blue" />
            </div>
            <div className="googleIcon">
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
  .inputContainer {
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
    .socialMediaTitle{
        margin-top:15px;
        span{
            font-size:20px;
            font-weight:700;
            color:black;
        }
    }
    .socialMediaIcon{
        display:flex;
        flex-direction:row;
        font-size:35px;
        margin-top:10px;
       
        :hover{
            cursor:pointer;
        }
        .facebookIcon{
            margin-right:40px;
        }

    }

   
  }
`;

export default SingIn;
