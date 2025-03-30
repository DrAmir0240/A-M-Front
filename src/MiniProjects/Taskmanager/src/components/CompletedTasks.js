import React from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const Th = styled.th`
    padding: 12px;
    text-align: left;
    background-color: #f5f5f5;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
    padding: 12px;
    border-bottom: 1px solid #ddd;
`;

const Priority = styled.span`
    padding: 4px 8px;
    border-radius: 4px;
    color: #fff;
    ${({ priority }) => {
        switch (priority) {
            case 'HIGH':
                return 'background-color: #dc3545;';
            case 'NORMAL':
                return 'background-color: #ffc107;';
            case 'LOW':
                return 'background-color: #28a745;';
            default:
                return 'background-color: #6c757d;';
        }
    }}
`;

const Status = styled.span`
    ${({ status }) => {
        switch (status) {
            case 'Completed':
                return 'color: #28a745;';
            case 'In Progress':
                return 'color: #007bff;';
            case 'Open':
                return 'color: #333;';
            default:
                return 'color: #333;';
        }
    }}
`;

const ActionIcons = styled.div`
    display: flex;
    gap: 10px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
  font-size: 16px;

  &:hover {
    color: #0056b3;
  }
`;

function CompletedTasks({ tasks, toggleTaskCompletion, deleteTask, openEditModal }) {
    return (
        <TableContainer>
            <Table>
                <thead>
                <tr>
                    <Th>وضعیت</Th>
                    <Th>موضوع</Th>
                    <Th>توضیحات</Th>
                    <Th>اولویت</Th>
                    <Th>تاریخ شروع</Th>
                    <Th>تاریخ سررسید</Th>
                    <Th>وضعیت</Th>
                    <Th>اقدامات</Th>
                </tr>
                </thead>
                <tbody>
                {tasks.length === 0 ? (
                    <tr>
                        <Td colSpan="8">هیچ تسکی وجود ندارد.</Td>
                    </tr>
                ) : (
                    tasks.map((task) => (
                        <tr key={task.id}>
                            <Td>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTaskCompletion(task.id)}
                                />
                            </Td>
                            <Td>{task.subject}</Td>
                            <Td>{task.company}</Td>
                            <Td><Priority priority={task.priority}>{task.priority}</Priority></Td>
                            <Td>{task.startDate}</Td>
                            <Td>{task.dueDate}</Td>
                            <Td><Status status={task.status}>{task.status}</Status></Td>
                            <Td>
                                <ActionIcons>
                                    <IconButton onClick={() => openEditModal(task)}>
                                        <FaEdit />
                                    </IconButton>
                                    <IconButton onClick={() => deleteTask(task.id)}>
                                        <FaTrash />
                                    </IconButton>
                                </ActionIcons>
                            </Td>
                        </tr>
                    ))
                )}
                </tbody>
            </Table>
        </TableContainer>
    );
}

export default CompletedTasks;