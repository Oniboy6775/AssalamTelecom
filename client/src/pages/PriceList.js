import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Axios from "axios";
function PriceList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [priceList, setPriceList] = useState([]);
  const fetchPriceList = async () => {
    try {
      const response = await Axios.get("/api/v1/prices");
      setPriceList(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchPriceList();
  }, []);
  if (priceList.length < 1) return <div className="loading"></div>;
  return (
    <div className="  text-center  pb-5 mx-auto">
      <h3 className="title underline">Our prices</h3>
      <div className="text-center">
        <button className="btn mb-4" onClick={() => navigate("/profile")}>
          HOME
        </button>
      </div>
      <table id="t01" className="table-auto hover:table-fixed m-auto">
        <thead className="bg-[var(--primary-500)] text-white ">
          <tr>
            <th>Plan id</th>
            <th>Network</th>
            <th>Volume</th>
            <th>Price</th>
            <th>Reseller</th>
            <th>API</th>
            <th>Validity</th>
            <th>Buy</th>
          </tr>
        </thead>

        <tbody className="">
          {priceList.map((e) => {
            return (
              <tr
                onClick={() => {
                  navigate("/profile");
                }}
                key={e.id}
                className="text-xs even:bg-[#eee] hover:bg-black/20 whitespace-nowrap text-left "
              >
                <td>{e.id}</td>
                <td>
                  {e.plan_network}-{e.plan_type}
                </td>
                <td>{e.plan}</td>
                <td>₦{e.my_price}</td>
                <td>₦{e.resellerPrice}</td>
                <td>₦{e.apiPrice}</td>
                <td>{e.month_validate.substring(0, 7)}</td>
                <td>
                  <button
                    className="btn-hipster btn"
                    onClick={() => navigate("/profile")}
                  >
                    Buy now
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default PriceList;
