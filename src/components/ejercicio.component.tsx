import styled from "styled-components";

export const Input = styled.div`
   label{
    display:block;
    font-size: 1.4rem;
    text-align: left;
    margin: auto 1rem;
    font-weight: 600;
   }
   input{
    width: 95%;
    margin: 1rem;
    padding: 1rem;
    border-radius: 5px;
    border-style:none;
    box-shadow: 2px 2px 2px #e1e1e1;
    border: 1px solid #e1e1e1;
   }
`;

export const BotonActivable = styled.button<any>`
  padding:.5rem;
  font-size: 1.6rem;
  color: #fff;
  margin: .3rem;
  border-radius: 5px;
  font-size: 1rem;
  background: ${ ({activo}) => activo ? "#ffe1f1" : "#b1b1b1"};
  border-style:none;
  box-shadow: 2px 2px 2px #e1e1e1; 
  border: 1px solid #e1e1e1;
`; 

export const DivOpcionIncrementable = styled.div`
  margin:1rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
  p{
    margin: 0;
    font-size: 1.4rem;
    font-weight: 600;;
  }
`;

export const Checkbox = styled.label`
   display:flex;
   align-items:center;
   margin: 1rem; 
   input[checkbox]{
    width: 15px;
    heigth: 15px;
    margin: 0 1rem;
   }
`;

export const Label = styled.label`
  display:block;
  margin: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
  text-align: left;
`;

export const DivSerie = styled.div`
  maring: 1rem 5px;
  padding: 1rem;
  border-bottom: 1px solid #e1e1e1;
  label{
    font-size: 1.4rem;
  }
`;

export const Select = styled.select`
   padding: 1rem .5rem;
   border-radius: 5px;
   border-style:none;
    box-shadow: 2px 2px 2px #e1e1e1;
    border: 1px solid #e1e1e1;
   option{
    padding: 1rem;
   }
`;
export const Button = styled.button<any>`
   width: 50%;
   display: block;
   margin:.3rem;
   padding: 1rem 2rem;
   border-radius: 6px;
   border-style:none;
   background: ${({ activo }) => activo ? "pink" : "grey"};
   color: #fff;
   font-weight: 600;
   box-shadow: 1px 2px 4px rgba(0,0,0,0.3);
`;