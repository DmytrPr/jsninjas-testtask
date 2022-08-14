import React, { useState } from 'react';

import styled from 'styled-components';
import { InfoBar } from '../../../components/infoBar';
import { Hero } from '../interfaces/hero.interface';
import { EditHeroCard } from './editHeroCard';

interface HeroCardProps {
    hero: Hero;
}

const HeroInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em 0.5em;
  font-size: 24px;
`;

const Label = styled.span`
  color: gray;
`;

const ImageRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
`;

const HeroImage = styled.img`
  max-width:  20vw;
  max-height: 20vh;
  margin: 10px;
`;

const EditButton = styled.button`
  align-self: flex-start;

  background: blue;
    color: white; 
    font-size: 1em; 
    margin-top: 1em;
    padding: 0.5em;   
    border: none;
    border-radius: 5px;

    &:hover {
        background: rgb(200, 200, 255);
    }

    &:active {
        background: darkblue;
        color: gray;
    }
`;

export const HeroCard = ({ hero }: HeroCardProps) => {
  const [isEdit, setEdit] = useState(false);
  return (
    <HeroInfoBox>
      {
    isEdit
      ? (
        <EditHeroCard hero={hero} onSubmit={() => setEdit(false)} />
      ) : (
        <>
          <InfoBar label="Nickname" value={hero.nickname} />
          <InfoBar label="Real name" value={hero.real_name} />
          <InfoBar label="Catch phrase" value={hero.catch_phrase} />
          <InfoBar label="Superpowers" value={hero.superpowers} />
          <InfoBar label="Origin description" value={hero.origin_description} />
          {
          hero.image_paths && !!hero.image_paths.length && (
          <>
            <Label>Images:</Label>
            <ImageRow>
              {hero.image_paths.map((image) => <HeroImage key={image} src={hero.image_paths && `${process.env.REACT_APP_BACKEND_ADDRESS}/images/${image}`} />)}
            </ImageRow>
          </>
          )
          }
          <EditButton onClick={() => setEdit(true)}>Edit</EditButton>
        </>
      )
}

    </HeroInfoBox>
  );
};
