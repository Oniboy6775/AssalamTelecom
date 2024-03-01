import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/UserContext";

const Services = () => {
  const {
    adminDetails: { services },
    updateService,
  } = useGlobalContext();
  return (
    <>
      <h3 className="title">Available services</h3>
      <Wrapper className="container">
        {services.map((e, index) => {
          return (
            <div key={index} className="card">
              <h3 className="title">{e.serviceName}</h3>
              {e.serviceStatus ? (
                <p style={{ color: "green" }}>
                  {e.serviceName} is currently available
                </p>
              ) : (
                <p style={{ color: "red" }}>
                  {e.serviceName} is currently locked
                </p>
              )}
              <button onClick={() => updateService(e._id)} className="btn">
                {e.serviceStatus ? "Lock" : "Unlock"}
              </button>
            </div>
          );
        })}
      </Wrapper>
    </>
  );
};

export default Services;
const Wrapper = styled.section`
  padding: 1rem;
  .card {
    background: var(--grey-200);
    color: var(--primary-500);
    border-radius: var(--borderRadius);
    text-align: center;
    margin-bottom: 1rem;
    p {
      font-weight: 900;
      text-transform: capitalize;
    }
  }
  @media (min-width: 700px) {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    .card {
      width: 30%;
    }
  }
`;
