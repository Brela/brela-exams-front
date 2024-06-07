import React from 'react';

const CardSectionGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="exam gap-4 grid grid-cols-1 lg:grid-cols-2 items-stretch">{children}</div>
);

export default CardSectionGrid;
