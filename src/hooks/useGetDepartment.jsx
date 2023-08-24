import React, { useContext, useEffect, useState } from "react";
import { Department } from "./../services/departmentService";
import { loadingContext } from "../components/context/LoadingProvider";

export default function useGetDepartment() {
  const { setLoading } = useContext(loadingContext);

  const [departmentList, setDepartmentList] = useState([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await Department.getDepartment();
      setDepartmentList(res.data);
      setLoading(false);
    })();
  }, []);

  return [departmentList];
}
