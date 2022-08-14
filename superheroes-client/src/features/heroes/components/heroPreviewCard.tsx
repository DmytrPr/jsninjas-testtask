import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../../store';
import { deleteHero } from '../heroesSlice';
import { Hero } from '../interfaces/hero.interface';

interface HeroCardProps {
    hero: Pick<Hero, 'id' | 'nickname' | 'image_paths'>;
    onClick: () => void;
}
const Container = styled.div`
    display: grid;
    grid-template-columns: 9fr minmax(min-content, 1fr);
    grid-template-rows: minmax(min-content, auto) 1.5fr;

    border: 2px none;
    border-radius: 5px;
    padding: 10px 10px;
    margin-bottom: 10px;

    background: lightblue;

    &:hover{
      background: #94cde0;
    }
`;

const RemoveButton = styled.button`
    grid-column: 2;
    grid-row:  1;
    justify-self: end;
    align-self: center;

    max-height: 0.5fr;

    background: red;
    color: white; 
    font-size: 1em; 
    padding: 0.5em;   
    border: none;
    border-radius: 5px;

    &:hover {
        background: rgb(255, 200, 200);
    }

    &:active {
        background: darkred;
        color: gray;
    }
`;

const HeroPreviewImage = styled.img`
    grid-column: 1;
    grid-row:  2;

    max-width: 200px;
    max-height:200px;
`;

const NickNameLabel = styled.span`
    font-size: 32px;
    margin-bottom: 5px;
`;

export const HeroPreviewCard = ({ hero, onClick }: HeroCardProps) => {
  const dispatch = useAppDispatch();
  const handleRemove = () => {
    dispatch(deleteHero({ id: hero.id }));
  };

  return (
    <Container onClick={onClick}>
      <NickNameLabel>{hero.nickname}</NickNameLabel>
      <RemoveButton onClick={handleRemove}>x</RemoveButton>
      {hero.image_paths && !!hero.image_paths.length && <HeroPreviewImage src={`${process.env.REACT_APP_BACKEND_ADDRESS}/images/${hero.image_paths[0]}`} alt="Hero preview image" />}
    </Container>
  );
};
