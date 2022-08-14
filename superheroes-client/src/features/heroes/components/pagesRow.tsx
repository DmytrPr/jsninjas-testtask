import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../store';
import { heroesSlice } from '../heroesSlice';

interface PageButtonProps {
    selected?: boolean;
}

const PageButton = styled.button<PageButtonProps>`
    font-size: 1em; 
    padding: 10px;   
    margin: 5px;
    border: none;
    border-radius: 5px;
    
    background: ${(props) => (props.selected ? 'rgb(100, 100, 100)' : 'white')};
    color: ${(props) => (props.selected ? 'white' : 'black')};

    &:hover:not(:disabled) {
        background: rgb(200, 200, 200);
    }

    &:active:not(:disabled) {
        background: rgb(70, 70, 70);
    }


`;

const ButtonsWrapper = styled.ul`
    display: flex;
    flex-direction: row;

    margin: auto;

    list-style: none;
    padding: 0;
`;

export const PagesRow = () => {
  const currentPage = useAppSelector((state) => state.heroes.page);
  const totalPages = useAppSelector((state) => state.heroes.total);

  const dispatch = useAppDispatch();

  const handleClick = (page: number) => {
    dispatch(heroesSlice.actions.movePage(page));
  };

  return (
    <ButtonsWrapper>
      {[...Array(totalPages).keys()].map((i) => i + 1).map(
        (page) => (
          <li key={page}>
            <PageButton
              selected={page === currentPage}
              disabled={page === currentPage}
              onClick={() => handleClick(page)}
            >
              {page}
            </PageButton>
          </li>
        ),
      )}
    </ButtonsWrapper>
  );
};
