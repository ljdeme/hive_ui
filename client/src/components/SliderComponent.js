import React, { useState } from 'react';
import '../css/testing.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
const Input = styled(MuiInput)`
  width: 3rem;
  font-family: 'Chakra Petch';
  color: white;
  font-weight: bold;

  &::before,
  &::after {
    border-bottom: 1px solid #ffffff40; // Set the default underline color to white
  }

  &:hover::before,
  &:hover::after {
    border-bottom: 2px solid #E8B83D; // Set the underline color to gold on hover
  }

  &:focus::before,
  &:focus::after {
    border-bottom: 2px solid #E8B83D; // Set the underline color to gold when the input is focused
  }
`;

const sliderStyle = {
  color: '#FFF', // Set the slider color to #E8B83D
};

const labelStyle = {
  color: '#FFF',
  fontWeight:'bold',
  fontFamily: 'Chakra Petch',
};

export default function SliderComponent({ setSpeed }) {
  const [value, setValue] = useState(50);
  
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    setSpeed(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? 0 : Number(event.target.value));
    setSpeed(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom sx={labelStyle}>
        Speed
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            sx={sliderStyle} // Apply the slider style
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}