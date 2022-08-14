import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { HeroList } from './features/heroes/components/heroList';
import { PagesRow } from './features/heroes/components/pagesRow';
import { loadHeroes } from './features/heroes/heroesSlice';
import { useAppDispatch } from './store';
import { CreateHeroCard } from './features/heroes/components/createHeroCard';

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 80%;
  margin: auto;
  h1{
    margin: auto;
    padding-bottom: 10px;
  }
`;

const CreateHeroButton = styled.button`
  position: absolute;
  top: 5%;
  right: 5%;

  width: 25px;
  height: 25px;

  background: lime;
  color: white; 
  font-size: 1em; 
  border: none;
  border-radius: 5px;

  text-align: center;
  vertical-align: center;

  &:hover {
      background: rgb(200, 255, 200);
  }

  &:active {
      background: green;
      color: gray;
  }
`;

export const App = () => {
  const dispatch = useAppDispatch();
  const [isCreateModal, setCreateModal] = useState(false);

  useEffect(() => {
    dispatch(loadHeroes({ size: 5, offset: 0 }));
  }, [dispatch]);
  return (
    <MainWrapper>
      <h1> Superhero DB </h1>
      <HeroList />
      <PagesRow />
      <CreateHeroButton onClick={() => setCreateModal(true)}>+</CreateHeroButton>
      <Modal
        isOpen={isCreateModal}
        onRequestClose={() => setCreateModal(false)}
        contentLabel="Create hero"
        style={
          {
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          }
        }
      >
        <CreateHeroCard onSubmit={() => setCreateModal(false)} />
      </Modal>
    </MainWrapper>
  );
};
