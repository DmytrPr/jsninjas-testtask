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

export const HeroList = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const heroes = useAppSelector((state) => state.heroes.loadedHeroes);

  return (
    <List>
      {heroes.map((hero) => (
        <li key={hero.id}>
          <HeroPreviewCard
            onClick={() => setIsOpen(true)}
            hero={
            {
              id: hero.id,
              nickname: hero.nickname,
              image_paths: hero.image_paths,
            }
}
          />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            contentLabel="Hero Data"
          >
            <HeroCard hero={hero} />
          </Modal>
        </li>
      ))}

    </List>

  );
};
