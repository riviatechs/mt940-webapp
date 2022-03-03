import {
  Autocomplete,
  InputBase,
  Slider,
  SliderThumb,
  styled,
  TextField,
} from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import PropTypes from "prop-types"
import { priceSeparator } from "../../util/util"

const AirbnbSlider = styled(Slider)(() => ({
  color: "#a42d2d",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px #a42d2d16",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: "#d8d8d8",
    height: 3,
  },
}))

function AirbnbThumbComponent(props) {
  const { children, ...other } = props
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  )
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
}

const MyTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#a42d2d",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#a42d2d",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#00000033",
      borderRadius: 50,
    },
    "&:hover fieldset": {
      borderColor: "#000000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#a42d2d",
    },
  },
})

const minDistance = 100000

function AmountPicker(props) {
  const [value, setValue] = React.useState([0, 1000000])
  const [min, setMin] = React.useState(0)
  const [max, setMax] = React.useState(1000000)

  const amountRangeHandler = (event, newValue, activeThumb) => {
    // console.log(event.target.value);

    if (!Array.isArray(newValue)) {
      return
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 10000000 - minDistance)
        setValue([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(newValue[1], minDistance)
        setValue([clamped - minDistance, clamped])
      }
    } else {
      setValue(newValue)
      setMin(newValue[0])
      setMax(newValue[1])
    }
  }

  const handleMinInputChange = (event) => {
    const intNum = parseInt(event.target.value)
    setMin(event.target.value === "" ? "" : intNum)

    setValue((prev) => [intNum, prev[1]])
  }

  const handleMaxInputChange = (event) => {
    const intNum = parseInt(event.target.value)
    setMax(event.target.value === "" ? "" : intNum)

    setValue((prev) => [prev[0], intNum])
  }

  props.amountPicker(value)

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        py: 5,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <label>Amount</label>
      <MyTextField
        size="small"
        onChange={handleMinInputChange}
        inputProps={{
          step: 100000,
          min: 0,
          max: 10000000,
          type: "number",
          "aria-labelledby": "input-slider",
        }}
        value={min}
        sx={{ width: 150 }}
      />
      <AirbnbSlider
        components={{ Thumb: AirbnbThumbComponent }}
        sx={{ width: 400 }}
        getAriaLabel={() => "Minimum distance shift"}
        value={value}
        onChange={amountRangeHandler}
        min={0}
        valueLabelDisplay="auto"
        max={10000000}
      />
      <MyTextField
        onChange={handleMaxInputChange}
        inputProps={{
          step: 100000,
          min: 0,
          max: 10000000,
          type: "number",
          "aria-labelledby": "input-slider",
        }}
        size="small"
        value={max}
        sx={{ width: 150 }}
      />
    </Box>
  )
}

export default AmountPicker
