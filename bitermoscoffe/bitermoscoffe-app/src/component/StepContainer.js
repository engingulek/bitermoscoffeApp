import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
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
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const dispatch = useDispatch()

  useEffect(() => {
    
    return () => {
     
    };
  }, []);

  const timer = setTimeout(() => {
    let newSkipped = skipped;


setActiveStep(activeStep+ 1);

setSkipped(newSkipped);
  }, 4000);

  if(activeStep===3)
  {
    clearTimeout(timer)
    dispatch(cartConfirmHiddle(false))
  }
  console.log(activeStep)





  
  
    



  



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
          <div>
           
          </div>
        </div>
      </div>
    </div>
  );
}
