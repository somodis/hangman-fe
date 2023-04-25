import { Location } from 'react-router-dom';

import { parse, stringify } from './query';

export const parseRedirectLink = (location: Location) => {
  const search = parse(location.search);
  return search.redirectTo ? window.atob(search.redirectTo as string) : null;
};

export const getRedirectLink = (location: Location) => {
  const link = `${location.pathname || ''}${location.search || ''}`;
  const redirectLink = link && link !== '/' ? stringify({ redirectTo: window.btoa(link) }) : '';

  return redirectLink ? `?${redirectLink}` : '';
};
