import React, { Fragment, useEffect } from 'react'
import styled from 'styled-components'
import db from '../firebase'
const HelperMessage = () => {

useEffect(() => {
    db.collection("message").onSnapshot((onSnapshot) => {
        const menuItem = [];
        onSnapshot.forEach((doc) => {
          console.log(doc.id)
          
        });
      
  
  
        
        
        
        
      });
   
}, [])



    return (
        <Wrapper>
       <HelperMessageContainer>
       <MessageSendSection>
          <CustomerSupport>Size nasıl yardımıcı olabilirim?</CustomerSupport>
              <MyMessage> Merhaba </MyMessage>   
          </MessageSendSection>
          <MessageSeciton>
            <MessageInput type="text" />
            <SendMessage >Gönder</SendMessage>
          </MessageSeciton>
       </HelperMessageContainer>
      </Wrapper>
    )
}

export default HelperMessage

const Wrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
flex-wrap: wrap;
margin-top: 70px;

`

const HelperMessageContainer = styled.section`
width: 600px;
border: 2px solid lightgray;
border-radius: 20px;
padding: 20px 10px;

`


const MessageSeciton = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom:20px;
`;

const MessageInput = styled.input`
  width: 450px;
  margin-right: 30px;
  outline-width: 0px;
  border: 2px solid brown;
  border-radius: 10px;
  font-size: 20px;

`;

const SendMessage = styled.button`
  border: none;
  padding: 5px 5px;
  font-size: 18px;
  border-radius: 10px;
  color: white;
  background-color: #4aa96c;
`;
const MessageSendSection = styled.section`
  display: flex;
  flex-direction: column;
  border:2px solid red;
  padding: 10px 20px;
  border-radius: 20px;

 
`;

const MyMessage = styled.span`
 


  width: 300px;
  border: 1px solid #2978b5;
  border-radius: 20px;
  padding: 5px 15px;
  background-color: #2978b5;
  color: white;
  margin-top:20px;


`;

const CustomerSupport = styled.span`
 margin-left: 170px;
  width: 300px;
  margin-top: 20px;
  border: 1px solid lightgray;
  border-radius: 20px;
  padding: 5px 15px;
  background-color: lightgray;
  color: black;
 
`;
