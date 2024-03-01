import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/UserContext";
import styled from "styled-components";
import { Container } from "../../Styles/Styles";
import GenerateCoupon from "./GenerateCoupon";
import SendEmail from "./SendEmail";
import MyUsers from "./MyUsers";
import Services from "./Services";
// import Transactions from "../Transactions";
function Admin() {
  const { isAdmin, user, fetchAdmin, adminDetails } = useGlobalContext();
  const [currentRoute, setCurrentRoute] = useState("allUsers");
  // const [searchTransactions, setSearchTransactions] = useState("");
  const [searchUsers, setSearchUsers] = useState("");
  // const [filteredTransactions, setFilteredTransaction] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(adminDetails.allUsers);
  const [totalUsersBalance, setTotalUsersBalance] = useState(0);
  const navigate = useNavigate();

  const eachAdminNavArray = [
    {
      name: "All Users",
      value: adminDetails.allUsers.length,
      url: "allUsers",
    },
    {
      name: "Total Balance",
      value: totalUsersBalance.toFixed(2),
      url: "",
    },
    {
      name: "All transactions",
      value: adminDetails.allTransactions.length,
      url: "allTransactions",
    },
    {
      name: "Generate Coupon",
      value: null,
      url: "generateCoupon",
    },
    {
      name: "Email users",
      value: null,
      url: "sendmail",
    },
    {
      name: "Available services",
      value: null,
      url: "services",
    },
  ];
  useEffect(() => {
    fetchAdmin();
    // eslint-disable-next-line
  }, []);
  const getBalances = () => {
    const { allUsers } = adminDetails;
    const totalUsersBalance = allUsers.reduce((total, currentValue) => {
      total += currentValue.balance;
      return total;
    }, 0);
    setTotalUsersBalance(totalUsersBalance - user.balance);
  };
  useEffect(() => {
    getBalances();
    // eslint-disable-next-line
  }, [adminDetails.allUsers]);
  useEffect(() => {
    if (!isAdmin) {
      navigate("/profile");
    }
    // eslint-disable-next-line
  }, []);

  // filtering transactions
  useEffect(() => {
    // const makeSearch = () => {
    //   if (searchTransactions === "")
    //     return setFilteredTransaction(adminDetails.allTransactions);
    //   if (searchTransactions) {
    //     const res = adminDetails.allTransactions.filter((obj) =>
    //       JSON.stringify(obj)
    //         .toLowerCase()
    //         .includes(searchTransactions.toLowerCase())
    //     );
    //     setFilteredTransaction(res);
    //   }
    // };
    // makeSearch();
    // eslint-disable-next-line
  }, [searchTransactions]);
  // filtering users
  useEffect(() => {
    const makeSearch = () => {
      // if (searchUsers === "")
      //   return setFilteredTransaction(adminDetails.allUsers);
      if (searchUsers) {
        const res = adminDetails.allUsers.filter((obj) =>
          JSON.stringify(obj).toLowerCase().includes(searchUsers.toLowerCase())
        );
        setFilteredUsers(res);
      }
    };
    makeSearch();
  }, [searchUsers]);

  return (
    <Container>
      <button className="btn" onClick={fetchAdmin}>
        Refresh
      </button>
      <Wrapper>
        {eachAdminNavArray.map((e, index) => (
          <button
            className="each__nav btn btn-block"
            onClick={() => setCurrentRoute(e.url)}
            key={index}
          >
            {e.name} {e.balance ? "₦" : null} {e.value}
          </button>
        ))}
      </Wrapper>

      {currentRoute === "generateCoupon" && <GenerateCoupon />}
      {/* {currentRoute === "allTransactions" && (
        <>
          <input
            className="search"
            placeholder="Search transactions"
            type="text"
            value={searchTransactions}
            onChange={(e) =>
              setSearchTransactions(e.target.value.toLowerCase())
            }
          />

          <Transactions transactions={filteredTransactions} />
        </>
      )} */}
      {currentRoute === "sendmail" && <SendEmail />}
      {currentRoute === "allUsers" && (
        <>
          <input
            className="search"
            placeholder="Search user"
            type="text"
            value={searchUsers}
            onChange={(e) => setSearchUsers(e.target.value.toLowerCase())}
          />
          <MyUsers allUsers={filteredUsers} />
        </>
      )}
      {currentRoute === "services" && <Services />}
    </Container>
  );
}

export default Admin;

const Wrapper = styled.div`
  margin-bottom: 1rem;
  .each__nav {
    color: black;
    margin: auto;
    margin-bottom: 1rem;
    transition: all 0.3s ease-in-out;
    box-shadow: var(--shadow-4);
    &:nth-of-type(1) {
      background-color: #ffeeba;
    }
    &:nth-of-type(2) {
      background-color: #c6c8ca;
    }
    &:nth-of-type(3) {
      background-color: #f5c6cb;
    }
    &:nth-of-type(4) {
      background-color: #c3e6cb;
    }
    &:nth-of-type(5) {
      background-color: #f5c6cb;
    }
    &:nth-of-type(6) {
      background-color: #ffeeba;
    }
  }
  svg {
    font-size: 2rem;
  }
  @media (min-width: 500px) {
    display: flex;
    flex-wrap: wrap;
    .each__nav {
      width: 40%;
    }
  }
`;
