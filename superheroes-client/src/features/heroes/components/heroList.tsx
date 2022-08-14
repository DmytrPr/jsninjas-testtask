import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useAppSelector } from '../../../store';
import { HeroPreviewCard } from './heroPreviewCard';
import { HeroCard } from './heroFullCard';

const List = styled.ul`
        margin: auto;

        max-width: 50%;
        min-width: 60%;

        list-style: none;
        padding: 0;
    `;

const Error = styled.div`
  padding: 10px;

  text-align: center;
  font-size: 25px;
`;

export const HeroList = () => {
  const heroes = useAppSelector((state) => state.heroes.loadedHeroes);
  const [modalIsOpen, setIsOpen] = useState({} as Record<string, boolean>);
  return (
    <List>
      {heroes.length ? heroes.map((hero) => (
        <li key={hero.id}>
          <HeroPreviewCard
            onClick={() => setIsOpen(
              { ...modalIsOpen, [hero.id]: true },
            )}
            hero={
              {
                id: hero.id,
                nickname: hero.nickname,
                image_paths: hero.image_paths,
              }
            }
          />
          <Modal
            isOpen={modalIsOpen[hero.id]}
            onRequestClose={() => setIsOpen(
              { ...modalIsOpen, [hero.id]: false },
            )}
            style={{ content: { maxWidth: '50%', left: '25%' } }}
            contentLabel="Hero Data"
          >
            <HeroCard hero={hero} />
          </Modal>
        </li>
      )) : (
        <Error>Cannot load superheroes, try again later</Error>
      )}
    </List>
  );
};
