import { DatePicker, DateRangePicker, LocalizationProvider } from "@mui/lab"
import { Box, Select, styled, TextField } from "@mui/material"
import * as React from "react"
import AdapterDateFns from "@mui/lab/AdapterDateFns"

import SelectUnstyled, { selectUnstyledClasses } from "@mui/base/SelectUnstyled"
import OptionUnstyled, { optionUnstyledClasses } from "@mui/base/OptionUnstyled"
import PopperUnstyled from "@mui/base/PopperUnstyled"

const grey = {
  100: "#E7EBF0",
  300: "#CDD2D7",
  900: "#1A2027",
}

const StyledButton = styled("button")(
  () => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 200px;
  background:  #ffffff00;
  border: 1px solid ${grey[300]};
  border-radius: 20px;
  text-align: left;
  line-height: 1.5;
  color: inherit;

  &:hover {
    background: transparent;
    border: 1px solid #a42d2d;
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${grey[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: " ▴";
    }
  }

  &::after {
    content: " ▾";
  }
  `
)

const StyledListbox = styled("ul")(
  () => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 200px;
  background: #ffffff;
  border: 1px solid #a42d2d;
  border-radius: 0.75em;
  color: ${grey[900]};
  overflow: auto;
  outline: 0px;
  `
)

const StyledOption = styled(OptionUnstyled)(
  () => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: #a42d2d33;
    color: #a42d2d;
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: #a42d2d33;
    color: #a42d2d;
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: #a42d2d33;
    color: #a42d2d;
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${grey[100]};
    color: ${grey[900]};
  }
  `
)

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  }

  return <SelectUnstyled {...props} ref={ref} components={components} />
})

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

function PickDate() {
  const [value1, setValue1] = React.useState(null)
  const [value2, setValue2] = React.useState([null, null])
  const [viewPeriod, setViewPeriod] = React.useState(false)

  // console.log(new Date(value1).toISOString())

  return (
    <Box sx={{ mt: 8, width: "100%" }}>
      <Box>
        <h2>Filter</h2>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CustomSelect
          defaultValue={0}
          onChange={(e) => {
            console.log(e)
            e === 0 ? setViewPeriod(false) : setViewPeriod(true)
          }}
        >
          <StyledOption value={0}>By Date</StyledOption>
          <StyledOption value={1}>By Period</StyledOption>
        </CustomSelect>
        <Box
          sx={{
            diplay: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            display={viewPeriod ? "none" : "flex"}
            sx={{
              alignItems: "center",
              width: "40%",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ pl: 5 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={value1}
                  onClose={() => {
                    console.log("chosen!!")
                  }}
                  cancelText="Back"
                  label="Choose Date"
                  todayText="Today Statements"
                  onChange={(newValue) => {
                    setValue1(newValue)
                  }}
                  renderInput={(params) => (
                    <MyTextField sx={{ width: 200 }} size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Box>
          </Box>
          <Box
            display={viewPeriod ? "flex" : "none"}
            sx={{ alignItems: "center", pl: 5, width: "55%" }}
          >
            <Box sx={{ pl: 5 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box sx={{ pl: 2 }}>
                  <DateRangePicker
                    startText=""
                    endText=""
                    value={value2}
                    onChange={(newValue) => {
                      setValue2(newValue)
                    }}
                    renderInput={(startProps, endProps) => (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ mx: 2 }}> From </Box>
                        <MyTextField
                          sx={{ width: 200 }}
                          size="small"
                          {...startProps}
                        />
                        <Box sx={{ mx: 2 }}> To </Box>
                        <MyTextField
                          sx={{ width: 200 }}
                          size="small"
                          {...endProps}
                        />
                      </Box>
                    )}
                  />
                </Box>
              </LocalizationProvider>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PickDate
