import { useEffect } from "react";
import { useState } from "react";

export const useProfile = () => {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartkadata, setCartkadata] = useState({});
  useEffect(() => {
    setLoading(true);
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setData(data.admin);
        setCartkadata(data);
        setLoading(false);
      });
    });
  }, []);
  return { loading, data, cartkadata };
};
