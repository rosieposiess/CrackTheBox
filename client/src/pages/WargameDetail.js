import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WargameDetailList from "../components/WargameDetailList";
import axios from "axios";

const WargameDetail = () => {
  const [wargameData, setWargameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://ec2-3-36-34-43.ap-northeast-2.compute.amazonaws.com:8000/wargame/${id}/`);
        setWargameData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="wargame_info_container">
      <h1 className="wargame_detail_title">문제 정보</h1>
      {wargameData && <WargameDetailList {...wargameData} />}
    </div>
  );
};

export default WargameDetail;
