import React from "react";
import { Box, TextField } from "@mui/material";
import CustomSelect from "./CustomSelect";

const FilterComponent = ({setQuery,setFilter}) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <CustomSelect setFilter={setFilter}/>
        <CustomSelect setFilter={setFilter}/>
        <CustomSelect setFilter={setFilter}/>
        <CustomSelect setFilter={setFilter}/>
        <TextField
          id="outlined-basic"
          label="Search company name"
          variant="outlined"
          onChange={(e)=>setQuery(e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default FilterComponent;
