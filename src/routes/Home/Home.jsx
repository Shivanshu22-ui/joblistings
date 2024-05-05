import React, { useEffect, useState, useRef, useCallback } from "react";
import { Box } from "@mui/material";
import FilterComponent from "../../components/FilterComponent";
import CardsComponent from "../../components/CardsComponent";
import { api } from "../../apis/api";
import useJobsHook from "../../utils/useJobsHook";
import { setJobListings } from "../../store/listing.slice";
import { useSelector } from "react-redux";

const Home = () => {
  const [filter, setFilter] = useState({
    minExp:0,
    location:'',
    role:'',
    miniPay:''
  });
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(10);
  const { loading, error, hasMore } = useJobsHook(limit, setJobListings);
  const {jobListings} = useSelector((state)=>state.jobListing);

  console.log(jobListings);
  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setLimit((prev) => prev + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <Box>
      <FilterComponent setQuery={setQuery} setFilter={setFilter}/>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          flexWrap: "wrap",
          mt: 4,
        }}
      >
        {jobListings
          .filter((item) => {
            return query.toLowerCase() === ""
              ? item
              : item.companyName.toLowerCase().includes(query.toLowerCase());
          })
          .map((job, id, filter) => {
            if (filter.length === id + 1)
              return (
                <div ref={lastBookElementRef}>
                  <CardsComponent data={job} />
                </div>
              );
            else return <CardsComponent data={job} />;
          })}
      </Box>
    </Box>
  );
};

export default Home;
