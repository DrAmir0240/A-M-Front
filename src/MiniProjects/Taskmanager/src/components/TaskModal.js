import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Select = styled.select`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
`;

const SaveButton = styled.button`
    background-color: #007bff;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const CancelButton = styled.button`
    background-color: #ddd;
    color: #333;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

function TaskModal({ onClose, onSave, task }) {
    const [formData, setFormData] = useState({
        subject: '',
        company: '',
        priority: 'LOW',
        startDate: '',
        dueDate: '',
        status: 'Open',
    });

    useEffect(() => {
        if (task) {
            setFormData(task);
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <h3>{task ? 'ویرایش تسک' : 'اضافه کردن تسک جدید'}</h3>
                <Form>
                    <Input
                        type="text"
                        name="subject"
                        placeholder="موضوع"
                        value={formData.subject}
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        name="company"
                        placeholder="توضیحات"
                        value={formData.company}
                        onChange={handleChange}
                    />
                    <Select name="priority" value={formData.priority} onChange={handleChange}>
                        <option value="LOW">LOW</option>
                        <option value="NORMAL">NORMAL</option>
                        <option value="HIGH">HIGH</option>
                    </Select>
                    <Input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                    <Input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                    />
                    <Select name="status" value={formData.status} onChange={handleChange}>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </Select>
                    <ButtonGroup>
                        <CancelButton onClick={onClose}>لغو</CancelButton>
                        <SaveButton onClick={handleSubmit}>ذخیره</SaveButton>
                    </ButtonGroup>
                </Form>
            </ModalContent>
        </ModalOverlay>
    );
}

export default TaskModal;