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

  
  

  const timer = setTimeout(()=>{
    setActiveStep(activeStep+1)

  },timerValue)



 
  
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
    clearTimeout(timer)
    dispatch(cartConfirmHiddle(false))
   }
  }, [activeStep])



 


  // useEffect(() => {
  //   const timer = setTimeout(() => {
     
  
  //     setActiveStep(activeStep+ 1);
  
      
  //   }, 10000);
  //   if(activeStep===1)
  //   {
  //     console.log(activeStep)
  //     clearTimeout(timer)
  //   }
  //   const timer2 = setTimeout(() => {
     
  
  //     setActiveStep(activeStep+ 1);
  
      
  //   }, 5000);

  //   if(activeStep===2)
  //   {
  //     console.log(activeStep)
  //     clearTimeout(timer2)
  //   }
  // }, [])

   


 
  //   const timer = setTimeout(() => {
  //     let newSkipped = skipped;
  
  //     setActiveStep(activeStep + 1);
  
  //     setSkipped(newSkipped);
  //   }, 20000);
  
  //   if (activeStep === 1) {
  //     clearTimeout(timer);
  //     const timer2 = setTimeout(() => {
  //       let newSkipped = skipped;
  
  //       setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // console.log(activeStep)
  //       setSkipped(newSkipped);
  //     }, 10000);
  
  //   if (activeStep ===2) {
  //       console.log(activeStep)
  //       setActiveStep(activeStep + 1);
  //       clearTimeout(timer2);
      
       
  //     }
  //   } 
  //   else if (activeStep>1){
  //     clearTimeout(timer);
  //   }

  


  

  

  return (
    <div className={classes.root}>
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
    </div>
  );
}
