import styled from 'styled-components';
import { Table as BootstrapTable, Card as BootstrapCard } from 'react-bootstrap';


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


// export const TaskFont = styled.td<{ completed: string }>`
//   font-size: 1.1em;
//   text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
//   &[completed="true"] {
//     text-decoration: line-through;
//   }
//   &[completed="false"] {
//     text-decoration: none;
//   }
// `;

export const StyledTableWrapper = styled.div`
  overflow-x: auto;
  @media (max-width: 575px) {
    display: none;
  }
`;

export const StyledTable = styled(BootstrapTable)`
  @media (max-width: 768px) {
    font-size: 1em;
  }

  @media (max-width: 480px) {
    font-size: 1em;
  }

  @media (max-width: 360px) {
    font-size: 1em;
  }
`;

export const StyledTh = styled.th<{ width: string }>`
  width: ${({ width }) => width || 'auto'};
  vertical-align: middle;
  @media (max-width: 768px) {
    &:nth-child(1) { width: 10%; }
    &:nth-child(2) { width: 40%; }
    &:nth-child(3) { width: 20%; }
    &:nth-child(4) { width: 30%; }
  }

  @media (max-width: 480px) {
    &:nth-child(1) { width: 15%; }
    &:nth-child(2) { width: 50%; }
    &:nth-child(3) { width: 15%; }
    &:nth-child(4) { width: 20%; }
  }

  @media (max-width: 360px) {
    &:nth-child(1) { width: 20%; }
    &:nth-child(2) { width: 40%; }
    &:nth-child(3) { width: 20%; }
    &:nth-child(4) { width: 20%; }
  }
`;

export const TaskFont = styled.td<{ completed: string }>`
  text-decoration: ${({ completed }) => (completed === 'true' ? 'line-through' : 'none')};
  vertical-align: middle;
  
  @media (max-width: 768px) {
    font-size: 1.15em;
  }

  @media (max-width: 480px) {
    font-size: 1.15em;
  }

  @media (max-width: 350px) {
    font-size: 1.15em;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 21px;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 5px;
  }

  @media (max-width: 360px) {
    flex-direction: column;
    gap: 3px;
  }
`;

export const CenteredContainer = styled.div`
    display: none;
  
  @media (max-width: 575px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const StyledCard = styled(BootstrapCard)`
    display:none;
    
    @media (max-width: 350px) {
      display: block;
    }
`;

export const TaskItem = styled.li`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  
  
`;

export const TaskName = styled.span<{ completed: string }>`
  text-decoration: ${({ completed }) => (completed === 'true' ? 'line-through' : 'none')};
  vertical-align: middle;
  flex-grow: 1;
`;
