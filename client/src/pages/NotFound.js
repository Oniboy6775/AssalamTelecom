import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import notFound from "../images/not-found.svg";
const NotFound = () => {
  return (
    <Container>
      <div>
        <img src={notFound} alt="not found" />
        <h3 className="text-center">Ohh! page not found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">back home</Link>
      </div>
    </Container>
  );
};

export default NotFound;
const Container = styled.div`
  text-align: center;
  display: flex;
  padding: 2rem;
  div {
    margin: auto;
  }
  /* img {
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  } */
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--grey-500);
  }
  a {
    color: var(--primary-500);
    text-decoration: underline;
    text-transform: capitalize;
  }
`;
