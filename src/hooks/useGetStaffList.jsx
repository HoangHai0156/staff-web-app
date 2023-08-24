import React, { useContext, useEffect, useState } from "react";
import { Staff } from "../services/staffService";
import { loadingContext } from "../components/context/LoadingProvider";

export default function useGetStaffList() {
  const [staffList, setStaffList] = useState([]);
  const { setLoading } = useContext(loadingContext);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await Staff.getStaff();
      setStaffList(res?.data);
      setLoading(false);
    })();
  }, []);

  return [staffList];
}
