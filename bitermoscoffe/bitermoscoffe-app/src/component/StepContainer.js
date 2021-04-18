import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

function getSteps() {
  return ['Hazırlanıyor', 'Yolda', 'Teslim Edildi'];
}
export default function StepContainer() {
  const steps = getSteps();
  return (
    <div >
      <Stepper >
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    
    </div>
  );
}
