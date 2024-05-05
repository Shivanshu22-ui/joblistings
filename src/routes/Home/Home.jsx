import React, { useState, useRef, useCallback } from "react";
import { Alert, Box } from "@mui/material";
import FilterComponent from "../../components/FilterComponent";
import CardsComponent from "../../components/CardsComponent";
import useJobsHook from "../../utils/useJobsHook";
import { setJobListings } from "../../store/listing.slice";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";

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

  const filteredJobs = jobListings.filter((item) => {
    const queryMatch =
      query.toLowerCase() === "" ||
      item?.companyName.toLowerCase().includes(query.toLowerCase());
    const roleMatch =
      filter.role === "" ||
      item?.jobRole.toLowerCase().includes(filter.role.toLowerCase());
    const expMatch = filter.minExp === 0 || item.minExp >= filter.minExp;
    const locationMatch =
      filter.location === "" ||
      item?.location.toLowerCase().includes(filter.location.toLowerCase());
    const miniPay =
      filter.miniPay === "" || item.minJdSalary >= parseInt(filter.miniPay);
    return queryMatch && expMatch && roleMatch && locationMatch && miniPay;
  });

  return (
    <Box>
      <FilterComponent
        setQuery={setQuery}
        setFilter={setFilter}
        filter={filter}
      />
      <Box minHeight={"100vh"}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            flexWrap: "wrap",
            mt: 4,
          }}
        >
          {filteredJobs.length === 0 ? (
            <div>{!loading && "No data found"}</div>
          ) : (
            filteredJobs.map((job, id) => (
              <div
                key={job.id}
                ref={id === filteredJobs.length - 1 ? lastBookElementRef : null}
              >
                <CardsComponent data={job} />
              </div>
            ))
          )}
        </Box>
        {loading && !error && <Loader />}
      </Box>
      {error && (
        <Alert severity="error">
          Error in loading jobs, please check your internet connection and try
          again
        </Alert>
      )}
    </Box>
  );
};

export default Home;
