import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

const CardsComponent = ({ data }) => {
  const [show, setShow] = useState(false);
  return (
    <Box
      minWidth={300}
      maxWidth={400}
      m={2}
      sx={{
        display: "flex",
        flex: 1,
        height: "fit-content",
        borderRadius: 4,
        p: 4,
        border:'1px solid #cecece',
      }}
    >
      <Box>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box>
            <img
              src={data?.logoUrl}
              alt=""
              height={70}
              width={50}
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                color: "#5b5959c9",
                fontWeight: 500,
                textTransform:'capitalize'
              }}
            >
              {data?.companyName}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                color: "#000",
                textTransform:'uppercase',
              }}
            >
              {data?.jobRole}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                color: "#000",
                textTransform:'capitalize',
              }}
            >
              {data?.location}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "12px", sm: "14px", md: "16px" },
              color: "#000",
            }}
          >
            {" "}
            Estimated Salary : $
            {data?.minJdSalary ? data?.minJdSalary + "k -" : ""}{" "}
            {data?.maxJdSalary + "k"} {data?.salaryCurrencyCode}
          </Typography>
          <Typography
            mt={2}
            sx={{
              fontSize: { xs: "14px", sm: "16px", md: "18px" },
              color: "#000",
              fontWeight: 600,
            }}
          >
            Job Description:
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "12px", sm: "12px", md: "14px" },
              color: "#000",
              fontWeight: 400,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: { xs: 2, md: show ? 100 : 5 },
              WebkitBoxOrient: "vertical",
            }}
          >
            {data?.jobDetailsFromCompany}
          </Typography>
          <Button onClick={()=>setShow(!show)}>{show?'Hide':'Show'}</Button>
          <Typography
            mt={2}
            sx={{
              fontSize: { xs: "12px", sm: "14px", md: "16px" },
              color: "#5b5959",
            }}
          >
            Experience required:
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "12px", sm: "14px", md: "16px" },
              //   color: "#5b5959",
            }}
          >
            {data?.minExp ? data?.minExp + " -" : ""} {data?.maxExp ?? "N/A"}{" "}
            years
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              p: 1,
              width: "100%",
              backgroundColor: "#2ae3c3",
              color: "#000",
              boxShadow: "none",
              borderRadius: 2,
              ":hover": {
                backgroundColor: "#2ae3c3",
                color: "#000",
                boxShadow: "none",
              },
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CardsComponent;
