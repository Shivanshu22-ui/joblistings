import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";

const MenuProps = {
  PaperProps: {
    style: {
      //   maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      //   width: 250,
    },
  },
};

// const names = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];
const CustomSelect = () => {

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  return (
    <Box sx={{ m: 1, minWidth: 200, flex: 1, display: "flex" }}>
      <FormControl sx={{ m: 1, minWidth: 200, flex: 1, display: "flex" }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={personName}
          onChange={handleChange}
          placeholder="values insfes sfsefsef"
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          sx={{
            p: 0,
            "MuiSelect-select": {
              p: 0,
            },
          }}
        >
          {[0, 1, 2, 3].map((name) => (
            <MenuItem
              key={name}
              value={name}
              //   style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
