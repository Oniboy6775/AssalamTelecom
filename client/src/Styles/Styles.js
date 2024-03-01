import styled from "styled-components";

export const Container = styled.div`
  box-shadow: var(--shadow-4);
  border-radius: var(--borderRadius);
  margin: auto;
  margin-top: 2rem;
  h4 {
    text-align: center;
    color: var(--black);
    text-transform: uppercase;
    font-weight: 900;
  }

  .acc__details {
    text-align: center;
    > h2 {
      font-size: 1.5rem;
    }
    > p {
      text-align: center;
      color: green;
      margin: auto;
    }
  }
  .user__details {
    display: flex;
    flex-direction: column;

    @media (min-width: 678px) {
      display: flex;
      flex-wrap: wrap;
    }
    .detail__name {
      text-transform: uppercase;
      color: var(--text-color);
      width: 15%;
      font-weight: 900;
    }
    .each__detail {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media (min-width: 678px) {
        width: 50%;
      }
    }
    .api__btn {
      background-color: var(--primary-600);
      color: var(--white);
      align-self: center;
      margin: 1rem auto;
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  /* @media (max-width: 678px) {
    flex-direction: column;
    width: 100%;
  } */
`;
export const FormContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  max-width: 60%;
  width: 100%;
  height: 100%;
  border: 2px red blue;
  margin-right: 3rem;
  @media (max-width: 678px) {
    max-width: 90%;
  } */
`;

export const Form = styled.form`
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 2s;
`;

export const InnerWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    height: 50px;
    width: 100%;
    margin: 0.2rem;
    background-color: blueviolet;
    color: black;
    border-radius: 0.5rem;

    &:nth-of-type(1) {
      background-color: #ffeeba;
      text-align: center;
    }
    &:nth-of-type(2) {
      background-color: #ffeeba;
      text-align: center;
    }
    &:nth-of-type(3) {
      background-color: #c6c8ca;
      text-align: center;
    }
    &:nth-of-type(4) {
      background-color: #f5c6cb;
      text-align: center;
    }
    &:nth-of-type(5) {
      background-color: #c3e6cb;
      text-align: center;
    }
  }
`;

export const TableContainer = styled.div`
  /* max-height: 60vh; */
  /* overflow: scroll; */
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  /* margin-left: 0 !important; */
  /* border-radius: 10px; */
  /* width: 90vw; */
  max-height: 80vh;
  width: 90%;

  th,
  td {
    /* padding-bottom: 0.4rem; */
    /* padding-left: 1.5rem; */
    padding: 0.5rem 0.1rem;
    text-align: left;
    white-space: nowrap;
    text-transform: capitalize;
    @media (min-width: 678px) {
      padding: 1rem;
    }
  }
  #t01 tr:nth-child(even) {
    background-color: #eee;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  #t01 tr:nth-child(odd) {
    cursor: pointer;
    background-color: #fff;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  #t01 th {
    color: white;
    background-color: var(--primary-500);
    padding: 0.5rem;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
