import React from 'react';

import styled from 'styled-components';
import { Hero } from '../interfaces/hero.interface';
import { InfoBar } from './infoBar';

interface HeroCardProps {
    hero: Hero;
}

const HeroInfoBox = styled.div`
    padding: 0.5em 0.5em;
    font-size: 24px;
`;

const ImageRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeroImage = styled.img`
    max-width: 25%;
    max-height:25%;
`;

export const HeroCard = ({ hero }: HeroCardProps) => (
  <HeroInfoBox>
    <InfoBar label="Nickname" value={hero.nickname} />
    <InfoBar label="Real name" value={hero.real_name} />
    <InfoBar label="Catch phrase" value={hero.catch_phrase} />
    <InfoBar label="Superpowers" value={hero.superpowers} />
    <InfoBar label="Origin description" value={hero.origin_description} />
    <span>Images:</span>
    <ImageRow>
      {hero.image_paths && hero.image_paths.map((image) => <HeroImage src={hero.image_paths && `${process.env.REACT_APP_BACKEND_ADDRESS}/images/${image}`} />)}
    </ImageRow>
  </HeroInfoBox>
);
