import React from 'react';
import styled from 'styled-components';

interface InfoBarProps {
    label: string;
    value: string;
}

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 5px;
    span{
      &:last-child {
        padding-left: 20px;
      }
    }
`;

export const InfoBar = ({ label, value }: InfoBarProps) => (
  <InfoContainer>
    <span>
      {label}
      :
    </span>
    <span>
      {value}
    </span>
  </InfoContainer>
);
