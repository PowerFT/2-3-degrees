import React from 'react';
import { MenuItem } from './MenuItem';
import { useAuth } from '../../hooks';

export const TalentMenu = ({ mobile, menuopen, onclose }) => {
  const { loadingViewer, viewer, isLoggedIn } = useAuth();
  if (loadingViewer || !viewer || !isLoggedIn) return null;
  return (
    <>
      {viewer.roles.nodes[0].name === 'talent' && (
        <>
          <MenuItem
            mobile={mobile}
            link="/talent/jobs"
            label="My Opportunities"
            menuopen={menuopen}
            onclose={onclose}
          />
          <MenuItem
            mobile={mobile}
            link="/talent/account"
            label="Account"
            menuopen={menuopen}
            onclose={onclose}
          />
        </>
      )}
    </>
  );
};
