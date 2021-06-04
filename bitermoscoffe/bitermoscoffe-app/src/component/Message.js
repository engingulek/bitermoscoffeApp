import React ,{useState} from 'react'
import { Fragment } from 'react'
import MessageIcon from '@material-ui/icons/Message';
import styled from 'styled-components';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



const Message = () => {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
  

    return (
       <Fragment>
 
           <MessageIconSection>


           <MessageIcon style={{ fontSize: 40 }} color="secondary"  onClick={toggle} id="TooltipExample" />
         
           </MessageIconSection>
           <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Müşteri Destek</ModalHeader>
        <ModalBody>
          <MessageSendSection>
          <CustomerSupport>
            Size nasıl yardımıcı olabilirim?
           
</CustomerSupport> 
          <MyMessage>

            Siparişimin durumun çok merak ettim 
          
          </MyMessage>
          
          </MessageSendSection>
         
        

        <MessageSeciton>
          <MessageInput type="text" ></MessageInput>
        <SendMessage>Gönder</SendMessage>
          </MessageSeciton>
         
        
        </ModalBody>
        
        
        <ModalFooter>
         
          <Button color="secondary" onClick={toggle}>Kapat</Button>
        </ModalFooter>
      </Modal>




       </Fragment>
    )
}

export default Message


const MessageIconSection =styled.section`
float: right;
margin-right: 50px;
border: 2px solid red;
padding: 10px 10px;
border-radius: 20px;
cursor: pointer;
display: flex;
flex-direction: column;
align-items: center;
position: fixed;
    bottom: 0px;
    right: 0px;
    margin-bottom: 10px;
`

const MessageSeciton = styled.section`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
margin-top: 20px;


`

const MessageInput = styled.input`
width: 450px;
margin-right: 30px;
outline-width: 0px;
border:2px solid brown;
border-radius: 10px;
font-size: 20px;

`


const SendMessage = styled.button`
border:none;
padding: 5px 5px;
font-size: 18px;
border-radius: 10px;
color:white;
background-color: #4aa96c;


`
const MessageSendSection = styled.section`
display: flex;
flex-direction: column;

`




const MyMessage = styled.span`

margin-left: 170px;
width: 300px;
margin-top: 20px;
border:1px solid lightgray;
border-radius: 20px;
padding: 5px 15px;
background-color: lightgray;
color: black;


`

const CustomerSupport = styled.span`
width: 300px;
border:1px solid #2978b5;
border-radius: 20px;
padding: 5px 15px;
background-color: #2978b5;
color: white;


`



