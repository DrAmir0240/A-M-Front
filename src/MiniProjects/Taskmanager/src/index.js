import React, { useState } from 'react';
import styled from 'styled-components';
import TaskList from './components/TaskList';
import CompletedTasks from './components/CompletedTasks';
import Sidebar from './components/Sidebar';
import TaskModal from './components/TaskModal';

const AppContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 1400px; /* بزرگ‌تر کردن عرض */
    height: 1000px;
    margin: 20px auto;
    gap: 20px;
`;

const MainContent = styled.div`
    flex: 1;
    margin-left: 60px; /* برای نزدیک شدن به سایدبار */
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: #333;
`;

const Tabs = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`;

const Tab = styled.button`
    padding: 8px 16px;
    background-color: ${({ active }) => (active ? '#007bff' : 'transparent')};
    color: ${({ active }) => (active ? '#fff' : '#333')};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
`;

const AddButton = styled.button`
    background-color: #007bff;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;

    &:hover {
        background-color: #0056b3;
    }
`;

function App() {
    const [tasks, setTasks] = useState([]);
    const [currentTab, setCurrentTab] = useState('LIST');
    const [showModal, setShowModal] = useState(false);
    const [editTask, setEditTask] = useState(null);

    const addTask = (newTask) => {
        setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
        setShowModal(false);
    };

    const updateTask = (updatedTask) => {
        setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
        setShowModal(false);
        setEditTask(null);
    };

    const toggleTaskCompletion = (taskId) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const openEditModal = (task) => {
        setEditTask(task);
        setShowModal(true);
    };

    return (
        <AppContainer>
            <Sidebar />
            <MainContent>
                <Header>
                    <Title>task manager</Title>
                    <AddButton onClick={() => setShowModal(true)}>
                        <span>+</span> ADD TASK
                    </AddButton>
                </Header>
                <Tabs>
                    <Tab active={currentTab === 'LIST'} onClick={() => setCurrentTab('LIST')}>
                        لیست تسک ها
                    </Tab>
                    <Tab active={currentTab === 'COMPLETED'} onClick={() => setCurrentTab('COMPLETED')}>
                        تسک‌های انجام‌شده
                    </Tab>
                </Tabs>
                {currentTab === 'LIST' && (
                    <TaskList
                        tasks={tasks.filter((task) => !task.completed)}
                        toggleTaskCompletion={toggleTaskCompletion}
                        deleteTask={deleteTask}
                        openEditModal={openEditModal}
                    />
                )}
                {currentTab === 'COMPLETED' && (
                    <CompletedTasks
                        tasks={tasks.filter((task) => task.completed)}
                        toggleTaskCompletion={toggleTaskCompletion}
                        deleteTask={deleteTask}
                        openEditModal={openEditModal}
                    />
                )}
                {showModal && (
                    <TaskModal
                        onClose={() => {
                            setShowModal(false);
                            setEditTask(null);
                        }}
                        onSave={editTask ? updateTask : addTask}
                        task={editTask}
                    />
                )}
            </MainContent>
        </AppContainer>
    );
}

export default App;