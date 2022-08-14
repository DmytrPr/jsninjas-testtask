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
    div{
      padding-left: 20px;
    }
`;

const Label = styled.span`
  color: gray;
`;

export const InfoBar = ({ label, value }: InfoBarProps) => (
  <InfoContainer>
    <Label>
      {label}
      :
    </Label>
    <div>
      {value}
    </div>
  </InfoContainer>
);
