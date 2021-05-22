import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import alert from "alertifyjs";
import db from "../firebase";
import { useRef } from "react";
function MyAcount() {
  const [modal, setModal] = useState(false);
  const toggle = () => {setModal(!modal) 
    setSave(true)};
  const addressTile = useRef(null);
  const addressLocation = useRef(null);
  const editaddressTile = useRef(null);
  const editaddressLocation = useRef(null);
  const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));
  const userNameLoc = JSON.parse(localStorage.getItem("userNameLoc"));
  const [save,setSave] = useState(false)
  const [defaultTitle , setDefaultTitle] = useState("")
  const [defaultLocation , setDefaulttLocation ] = useState("")
  const [itemId , setItemId ] = useState("")
const [myAddress, setMyAddress] = useState([])
  const newAddAdress = (event) => {

    if(save===true)
    {
      console.log("Kaydet")
      event.preventDefault();
    
      const uidLoc = JSON.parse(localStorage.getItem("uidLoc"));
      if (
        addressTile.current.value === "" ||
        addressLocation.current.value === ""
      ) {
        alert.error("Boş alanları doldurunnuz");
      } else if (addressLocation.current.value.length < 40) {
        alert.error("Adresinizi biraz daha belirtiniz");
      } else {
        console.log(addressTile.current.value);
        console.log(addressLocation.current.value);
        const addCartItems = db
          .collection("personList")
          .doc(uidLoc)
          .collection("addressList")
          .doc(addressTile.current.value);
  
        addCartItems.get().then((doc) => {
          if (doc.exists) {
            alert.error("Böyle Bir Adres Başlığı Bulunmaktadır");
            setModal(true);
          } else {
            db.collection("personList")
              .doc(uidLoc)
              .collection("addressList")
  
              .doc(addressTile.current.value)
              .set({
                addressTitle: addressTile.current.value,
                addressLocation: addressLocation.current.value,
              })
              .then(() => {
                alert.success("Adresiniz Başarıyla Eklenmiştir");
              })
              .catch((error) => {
                console.error("Error writing document: ", error);
              });
            setModal(!modal);
          }
        });
      }
    }

  
    
  };


 
useEffect(() => {
  db.collection("personList")
        .doc(uidLoc)
        .collection("addressList")
        .onSnapshot((onSnapshot) => {
          const addressListItems = [];
          onSnapshot.forEach((doc) => {
            addressListItems.push(doc);
          });
          setMyAddress(addressListItems);
        });
}, [])


const deleteMyAdress = (item)=>{

  db.collection("personList")
        .doc(uidLoc)
        .collection("addressList")
        .doc(item.id)
        .delete()
        .then(() => {
          alert.success("Adres Silindi");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });

}

const editAddAdress = (event)=>{
  event.preventDefault()
  console.log(itemId)
  console.log(editaddressTile.current.value)
  console.log(editaddressLocation.current.value)

  if(editaddressTile.current.value==="" || editaddressLocation.current.value === "")
  {
    alert.error("Değiştime işlemi yapmadınız");
    setModal(!modal)
  }else if (editaddressLocation.current.value>40)
  {
    alert.error("Adressi birazdaha açıklayınız");
  }
  else{
    db.collection("personList")
    .doc(uidLoc)
    .collection("addressList")
    .doc(itemId)
    .update({
      addressTitle:editaddressTile.current.value,
      addressLocation:editaddressLocation.current.value
    });
    setModal(!modal)

  }


 

}
// açan 
const editMyAdress = (item)=>{
  setSave(false)
  setModal(!modal)
  setDefaultTitle(item.data().addressTitle)
  setDefaulttLocation(item.data().addressLocation)
  setItemId(item.id)
    
   
 


  

  
  

}



  return (
    <Wrapper>
      <HomaPageTitle>
        <Link to="/" className="link">
          bitermoscoffe
        </Link>
      </HomaPageTitle>

      <MyAccountPage>
        <PageTitle>
          <span>Hesabım</span>
        </PageTitle>
        <PageHeader>
          <ProfilImg>EG</ProfilImg>
          <ProfilName>{userNameLoc}</ProfilName>
        </PageHeader>

        <MyInfoContainer>
          <MyInfoDecsContainer>
            <MyInfoDecsTitle>Profil Bilgileri</MyInfoDecsTitle>
            <MyInfoSubDecs>
              bitermoscoffe’daki deneyiminizi en iyi seviyede tutabilmemiz için
              gereken bilgilerinizi buradan düzenleyebilirsiniz.
            </MyInfoSubDecs>
          </MyInfoDecsContainer>

          <MyInfo>
            <NameSurname>
              <MyName>
                <NameLabel>Ad:</NameLabel>
                <NameInput />
              </MyName>
              <MySurname>
                <SurnameLabel>Soyadı:</SurnameLabel>
                <SurnameInput />
              </MySurname>
            </NameSurname>
            <MyPassaword>
              <MyPassawordDesc>
                <MyPassawordDescTitle>Şifre Değişikliği</MyPassawordDescTitle>
                <MyPassawordDescSub>
                  Şifreniz en az bir harf, rakam veya özel karakter içermeli.
                  Ayrıca şifreniz en az 8 karakterden oluşmalı.
                </MyPassawordDescSub>
              </MyPassawordDesc>

              <AvailablePasswordLabel>Mevcut Şifre</AvailablePasswordLabel>
              <AvailablePassword type="password" />

              <ChangePasswordLabel>Yeni Şifre</ChangePasswordLabel>
              <ChangePassword type="password" />
            </MyPassaword>

            <MyAdressContainer>
              <MyAdressHeader>
                <MyAdressTitle>Adreslerim</MyAdressTitle>

                <MyAdressSub>
                  {myAddress.length} teslimat adresiniz bulunmaktadır. Bu sayfadan yeni adres
                  oluşturabilir, mevcut adreslerinizi düzenleyebilir ya da
                  silebilirsiniz.
                </MyAdressSub>
              </MyAdressHeader>

              <MyAdresss>
                <MyAdressAdd onClick={toggle}>
                  <PostAddIcon style={{ fontSize: 100 }} />
                </MyAdressAdd>
                {myAddress.map((item)=>(
                  <MyAdressInfo>
              
                  <MyAdressName> {item.data().addressTitle}</MyAdressName>
                  <MyAdressLocation value={item.data().addressLocation} type="text"/>
               
                 
                  
                  <Buttons>
                    <DeleteAdress onClick={()=>deleteMyAdress(item)}>Sil</DeleteAdress>
                    <EditAdress onClick={()=>editMyAdress(item)}>Düzenle</EditAdress>
                  </Buttons>
                </MyAdressInfo>
                  ))}
              
              </MyAdresss>
            </MyAdressContainer>
          </MyInfo>
        </MyInfoContainer>
      </MyAccountPage>
      {save?<div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Yeni Adress Ekle</ModalHeader>
          <ModalBody>
            <form onSubmit={newAddAdress}>
              <Container>
                <AddAdressNameLabel>Adres Başlığı:</AddAdressNameLabel>
                <AddAdressNameInput ref={addressTile} />

                <AddAdressLocationLabel>Açık Adres:</AddAdressLocationLabel>
                <AddAdressLocationInput ref={addressLocation} />
              </Container>

              <Button
                color="primary"
                style={{
                  float: "right",
                  marginLeft: "30px",
                  marginTop: "20px",
                }}
              >
              Kaydet
              
              </Button>
              <Button
                color="secondary"
                style={{ float: "right", marginTop: "20px" }}
                onClick={toggle}
              >
                İptal Et
              </Button>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </div>:<div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Adresi Değiştir</ModalHeader>
        <ModalBody>
          <form onSubmit={editAddAdress}>
            <Container>
              <AddAdressNameLabel>Adres Başlığı:</AddAdressNameLabel>
              <AddAdressNameInput placeholder={defaultTitle} ref={editaddressTile} />

              <AddAdressLocationLabel>Açık Adres:</AddAdressLocationLabel>
              <AddAdressLocationInput placeholder={defaultLocation} ref={editaddressLocation} />
            </Container>

            <Button
              color="primary"
              style={{
                float: "right",
                marginLeft: "30px",
                marginTop: "20px",
              }}
            >
            Düzenle
            
            </Button>
            <Button
              color="secondary"
              style={{ float: "right", marginTop: "20px" }}
              onClick={toggle}
            >
              İptal Et
            </Button>
          </form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>}
    </Wrapper>
  );
}

export default MyAcount;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomaPageTitle = styled.div`
@media only screen and (max-width:725px){
  font-size: 30px;
}
  margin-top: 50px;
  font-size: 45px;
  color: brown;
  cursor: pointer;
  .link {
    text-decoration: none;
    color: brown;
  }
  .link:hover {
    color: brown;
    text-decoration: none;
  }
`;

const MyAccountPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
 
`;

const PageTitle = styled.div`

  span {
    font-size: 30px;
    color: red;
  }
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;
const ProfilImg = styled.div`
  margin-right: 20px;
  border: 2px solid rgb(234, 234, 234);
  padding: 10px;
  font-size: 20px;
  border-radius: 100px;
  background-color: rgb(234, 234, 234);
  @media only screen and (max-width:725px){
    padding: 8px;
  font-size: 15px;
}
`;
const ProfilName = styled.div`
  @media only screen and (max-width:725px){
   
  font-size: 20px;
}
  font-size: 25px;
`;

const MyInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameSurname = styled.div`
  display: flex;
  flex-direction: row;
  @media only screen and (max-width:725px){
    display: flex;
  flex-direction: column;
   
}
`;

const MyName = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 100px;
`;
const MySurname = styled.div`
  display: flex;
  flex-direction: column;
`;
const LabelSame = styled.label`
  font-size: 20px;
`;

const InputSame = styled.input`
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 20px;
  border: 2px solid rgb(234, 234, 234);
  border-radius: 6px;
  outline-width: 0px;

  :hover {
    background-color: rgb(234, 234, 234);
    border: 2px solid rgb(234, 234, 234);
    border-radius: 6px;
  }
`;

const NameLabel = styled(LabelSame)``;
const NameInput = styled(InputSame)``;
const SurnameLabel = styled(LabelSame)``;
const SurnameInput = styled(InputSame)``;
const MyInfoDecsContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  
`;
const MyInfoDecsTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
`;
const MyInfoSubDecs = styled.span`
  margin-top: 10px;
  width: 560px;
  @media only screen and (max-width:725px){
    width:300px;
   
}
 
`;
const MyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 30px;
  border: 2px solid lightgray;
  padding: 30px;
  border-radius: 10px;
  width:630px;
  @media only screen and (max-width:725px){
    width:350px;
   
}

 
  
  
`;

const MyPassaword = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const MyPassawordDesc = styled.div`
  display: flex;
  flex-direction: column;
`;

const MyPassawordDescTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const MyPassawordDescSub = styled.span`
  margin-top: 10px;
  width: 560px;
  margin-bottom: 20px;
  @media only screen and (max-width:725px){
    width: 300px;
   
}
`;

const AvailablePassword = styled(InputSame)`
  margin-bottom: 20px;
  width: 380px;
  @media only screen and (max-width:725px){
    width: 300px;
   
}
  
`;

const ChangePassword = styled(InputSame)`
  width: 380px;
  @media only screen and (max-width:725px){
    width: 300px;
   
}
`;
const AvailablePasswordLabel = styled(LabelSame)``;
const ChangePasswordLabel = styled(LabelSame)``;

const MyAdressContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
const MyAdressHeader = styled.div`
  display: flex;
  flex-direction: column;
`;
const MyAdressTitle = styled.span`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
`;
const MyAdressSub = styled.span`
  width: 580px;
   @media only screen and (max-width:725px){
    width: 300px;
   
}
`;
const MyAdresss = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const MyAdressSame = styled.div`
  border: 2px solid lightgray;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 20px;
  width: 250px;
`;

const MyAdressAdd = styled(MyAdressSame)`
  margin-right: 20px;
  padding-top: 70px;
  padding-bottom: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const MyAdressInfo = styled(MyAdressSame)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: default;
 height:280px;

  margin-right:20px;

`;

const MyAdressName = styled.span`
  margin-top: 10px;

  font-size: 20px;
  font-weight: bold;
  color: brown;
`;

const MyAdressLocation = styled.textarea`
display:flex;
align-items:center;
justify-content:center;
width:220px;
height:200px;
border:none;
outline-width:0;
cursor:pointer;
 
`;

const Buttons = styled.div`
  margin-bottom: 10px;
`;

const ButtonSame = styled.button`
  border: none;
  outline-width: 0px;
  padding: 10px 30px;
  border-radius: 20px;
  color: white;
`;

const DeleteAdress = styled(ButtonSame)`
  margin-right: 30px;
  background-color: red;
`;

const EditAdress = styled(ButtonSame)`
  background-color: green;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AddAdressNameInput = styled(InputSame)`
  font-size: 18px;
  :hover {
    background-color: white;
  }
`;
const AddAdressLocationInput = styled.textarea`
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 20px;
  border: 2px solid rgb(234, 234, 234);
  border-radius: 6px;
  outline-width: 0px;

  :hover {
    border: 2px solid rgb(234, 234, 234);
    border-radius: 6px;
  }
`;

const SameLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const AddAdressNameLabel = styled(SameLabel)`
  margin-top: 15px;
`;
const AddAdressLocationLabel = styled(SameLabel)`
  margin-top: 30px;
`;
