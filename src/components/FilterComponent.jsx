import React from "react";
import { Box, TextField } from "@mui/material";
import CustomSelect from "./CustomSelect";

const FilterComponent = ({setQuery,setFilter,filter}) => {
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
        <CustomSelect setFilter={setFilter} name='minExp' label='Min Experience' values = {minExp} filter={filter}/>
        <CustomSelect setFilter={setFilter} name='role' label='Role' values = {role} filter={filter}/>
         <CustomSelect setFilter={setFilter} name='location' label='Location' values = {location} filter={filter}/>
        <CustomSelect setFilter={setFilter} name='miniPay' label='Minimun Pay' values = {minPay} filter={filter}/>
        <TextField
          id="outlined-basic"
          label="Search company name"
          variant="outlined"
          m={1}
          onChange={(e)=>setQuery(e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default FilterComponent;

const minExp = [0,5,10,15,20];
const role = ['Frontend','Backend','IOS','Android','tech lead'];
const location = ['Chennai','Mumbai','Delhi','Remote'];
const minPay = ['3k','5k','10k','20k','50k','100k']