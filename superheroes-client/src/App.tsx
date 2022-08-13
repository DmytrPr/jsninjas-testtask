import React, { useEffect } from 'react';
import styled from 'styled-components';
import { HeroList } from './features/heroes/components/heroList';
import { PagesRow } from './features/heroes/components/pagesRow';
import { loadHeroes } from './features/heroes/heroesSlice';
import { useAppDispatch } from './store';

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 80%;
  margin: auto;
`;

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadHeroes({ size: 5, offset: 0 }));
  }, [dispatch]);
  return (
    <MainWrapper>
      <HeroList />
      <PagesRow />
    </MainWrapper>
  );
};
