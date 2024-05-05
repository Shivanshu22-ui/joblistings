import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../apis/api";
import { useDispatch } from "react-redux";

const useJobsHook = (pageNumber, reducerFunction) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;

    const fetchData = {
      limit: 10,
      offset: pageNumber - 10,
    };
    axios({
      method: "POST",
      url: api.getJObPostings,
      data: fetchData,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        dispatch(reducerFunction(res.data.jdList));
        setHasMore(res.data.jdList.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [pageNumber]);

  return { loading, error, hasMore };
};

export default useJobsHook;
