import React from 'react';
import styled from 'styled-components';
import { useConfigurations } from '../../../../hooks';

const Image = styled.img`
  height: ${72 / 16}px;
`;

const Logo = () => {
  const { authLogo } = useConfigurations();

  return <Image src={authLogo} alt="" />;
};

export default Logo;
