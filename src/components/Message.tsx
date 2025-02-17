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


export const TaskFont = styled.td<{ completed: string }>`
  font-size: 1.1em;
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
  &[completed="true"] {
    text-decoration: line-through;
  }
  &[completed="false"] {
    text-decoration: none;
  }
`;


