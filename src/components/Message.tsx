import styled from 'styled-components';


export const TasksMessage = styled.div`
  margin-top: 20px;
  padding: 20px;
  text-align: center;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.2em;
  color: #ff0535;
`;

export const AppBackground = styled.div`
  background-image: url('/1975new3.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
`;
export const TaskFont = styled.td<{ completed: boolean }>`
  font-size: 1.1em;
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
  
  //font-family: Arial, sans-serif;
`;


