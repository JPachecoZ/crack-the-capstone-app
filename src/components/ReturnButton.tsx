import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const StyledButton = styled.div`
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  background-color: #fff;
  color: #000;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
`;

export default function ReturnButton(){
  return (
    <Link
      to="/"
      style={{ textDecoration: "none", color: "inherit", marginTop: "15px" }}
    >
      <StyledButton>Back</StyledButton>
    </Link>
  );
}