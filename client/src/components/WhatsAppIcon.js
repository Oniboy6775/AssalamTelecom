import React from "react";
import styled from "styled-components";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppIcon = () => {
  const whatsAppLink = () => {
    window.location.href = "https://wa.link/32w0wa";
  };
  return (
    <Container onClick={whatsAppLink}>
      <div>
        <FaWhatsapp />
      </div>
    </Container>
  );
};

export default WhatsAppIcon;
const Container = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1.5rem;
  z-index: 25;
  div {
    background-color: #25d366;
    display: flex;
    opacity: 0.7;
    margin: auto;
    font-size: 2.5rem;
    color: white;
    border-radius: 50%;
    padding: 0.8rem;
  }
  svg {
    margin: auto;
  }
`;
