import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartConfirmHiddle } from "../reduxtoolkit/features/product/productSlice";
import { Fragment } from "react";
import styled from "styled-components"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Hazırlanıyor", "Yolda", "Teslim Edildi"];
}

export default function StepContainer() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const dispatch = useDispatch();
   //Hazırlama
     //timeSelector.cartConfirmMakeReady
  const [timerValue, setTimerValue] = useState(15000);
  const timeSelector = useSelector((state) => state.productRed);
  console.log(timeSelector.cartConfirmMakeReady)
  console.log(timeSelector.cartConfirmDeliver)
const date = new Date();
date.getHours()

  




  if (timeSelector.selectTimeHours===date.getHours() || !timeSelector.selectTimeHours )
  {
    console.log(timeSelector.selectTimeHours)
    const timer = setTimeout(()=>{
      setActiveStep(activeStep+1)
  
    },timerValue)
    if(activeStep===4)
    {
      clearTimeout(timer)
    }
    
  }
  else
  {
    
  }

 



 
  
  useEffect(() => {
   if(activeStep===1)
   {
     setTimerValue(10000) 
     // Teslim süresi/Yolda
     //timeSelector.cartConfirmDeliver 
    
   }
   else if(activeStep===2)
   {
     // Kapıda 
    setTimerValue(5000) 
    
    
   }
   else if(activeStep===3)
   {
     // Teslim edildi müşterinin görmesi için vakit 
     setTimerValue(5000)
    
   }
   else if (activeStep===4)
   {
    
    dispatch(cartConfirmHiddle(false))
   }
  }, [activeStep])



 




  


  

 

  return (


<Fragment>
{timeSelector.selectTimeHours && <OrderTime>Siparişniz {timeSelector.selectTimeHours}:00 hazırlanmaya başlanacaktır</OrderTime>}
{!timeSelector.selectTimeHours && <div className={classes.root}>
<Stepper activeStep={activeStep}>
  {steps.map((label, index) => {
    const stepProps = {};
    const labelProps = {};
    return (
      
      <Step key={label} {...stepProps}>
        <StepLabel {...labelProps}>{label}</StepLabel>
      </Step>
    );
  })}
</Stepper>
<div>
  <div>
    <div></div>
  </div>
</div>
</div> }


</Fragment>
    
    
  );
}

const OrderTime = styled.span`
color: red;
display: flex;
text-align: center;
font-size: 20px;
margin-bottom: 10px;
font-weight: bold;
`