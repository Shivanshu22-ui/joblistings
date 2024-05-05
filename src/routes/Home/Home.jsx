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
    minExp: "",
    location: "",
    role: "",
    miniPay: "",
  });
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(10);
  const { loading, error, hasMore } = useJobsHook(limit, setJobListings);
  const { jobListings } = useSelector((state) => state.jobListing);

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

  console.log("loading", loading, "hasmore", hasMore, "error", error);

  // if(loading){
  //   return <div>loading...</div>
  // }
  // if(error){
  //   return <div>error...</div>
  // }
  return (
    <Box>
      <FilterComponent
        setQuery={setQuery}
        setFilter={setFilter}
        filter={filter}
      />
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
            const queryMatch =
              query.toLowerCase() === "" ||
              item?.companyName.toLowerCase().includes(query.toLowerCase());
            const roleMatch =
              filter.role === "" ||
              item?.jobRole.toLowerCase().includes(filter.role.toLowerCase());
            const expMatch =
              filter.minExp === 0 || item.minExp >= filter.minExp;
            const locationMatch =
              filter.location === "" ||
              item?.location
                .toLowerCase()
                .includes(filter.location.toLowerCase());
            const miniPay =
              filter.miniPay === 0 || item.minJdSalary >= filter.miniPay;

            return (
              queryMatch && expMatch && roleMatch && locationMatch && miniPay
            );
          })
          .map((job, id, filterArr) => {
            if (filterArr.length === id + 1) {
              return (
                <div ref={lastBookElementRef}>
                  <CardsComponent data={job} />
                </div>
              );
            } else return <CardsComponent data={job} />;
          })}
      </Box>

      {loading && !error && "Loading..."}
      {error && "Error"}
    </Box>
  );
};

export default Home;
