import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHome, FaTasks, FaCalendar, FaChartBar, FaCog } from 'react-icons/fa';

const SidebarContainer = styled.div`
    width: ${({ isOpen }) => (isOpen ? '200px' : '50px')};
    background-color: #333;
    color: white;
    transition: width 0.3s;
    overflow: hidden;
    position: fixed;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1000;
`;

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 10px;
    cursor: pointer;
    &:hover {
        background-color: #444;
    }
`;

const Icon = styled.div`
    font-size: 20px;
`;

const Label = styled.span`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <SidebarContainer
            isOpen={isOpen}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <MenuItem>
                <Icon><FaHome /></Icon>
                <Label isOpen={isOpen}>خانه</Label>
            </MenuItem>
            <MenuItem>
                <Icon><FaTasks /></Icon>
                <Label isOpen={isOpen}>تسک‌ها</Label>
            </MenuItem>
            <MenuItem>
                <Icon><FaCalendar /></Icon>
                <Label isOpen={isOpen}>تقویم</Label>
            </MenuItem>
            <MenuItem>
                <Icon><FaChartBar /></Icon>
                <Label isOpen={isOpen}>گزارش‌ها</Label>
            </MenuItem>
            <MenuItem>
                <Icon><FaCog /></Icon>
                <Label isOpen={isOpen}>تنظیمات</Label>
            </MenuItem>
        </SidebarContainer>
    );
}

export default Sidebar;