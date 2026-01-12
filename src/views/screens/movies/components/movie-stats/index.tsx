import React from 'react';
import { DetailItem, DetailLabel, DetailsRow, DetailValue } from './styles';

interface MovieStatsProps {
  runtime?: number;
  language: string;
}

export const MovieStats = ({ runtime, language }: MovieStatsProps) => {
  return (
    <DetailsRow>
      <DetailItem>
        <DetailLabel>Length</DetailLabel>
        <DetailValue>{runtime ? `${runtime}min` : 'N/A'}</DetailValue>
      </DetailItem>
      <DetailItem>
        <DetailLabel>Language</DetailLabel>
        <DetailValue>{language.toUpperCase()}</DetailValue>
      </DetailItem>
      <DetailItem>
        <DetailLabel>Rating</DetailLabel>
        <DetailValue>PG-13</DetailValue>
      </DetailItem>
    </DetailsRow>
  );
};
