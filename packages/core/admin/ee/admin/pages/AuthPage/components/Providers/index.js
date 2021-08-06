import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  Divider,
  Stack,
  Row,
  Box,
  TableLabel,
  Button,
  Main,
  Subtitle,
  H1,
  Link,
  Text,
} from '@strapi/parts';
import { useIntl } from 'react-intl';
import { useAuthProviders } from '../../../../hooks';
import UnauthenticatedLayout, {
  Column,
  LayoutContent,
} from '../../../../../../admin/src/layouts/UnauthenticatedLayout';
import SSOProviders from './SSOProviders';
import { useConfigurations } from '../../../../../../admin/src/hooks';

const DividerFull = styled(Divider)`
  flex: 1;
`;
const AuthButton = styled(Button)`
  display: inline-block;
  width: 100%;
`;

const Providers = () => {
  const { authLogo } = useConfigurations();
  const ssoEnabled = strapi.features.isEnabled(strapi.features.SSO);

  const { push } = useHistory();
  const { formatMessage } = useIntl();
  const { isLoading, data: providers } = useAuthProviders({ ssoEnabled });

  const handleClick = () => {
    push('/auth/login');
  };

  const p = [...providers, ...providers, ...providers, ...providers, ...providers];

  if (!ssoEnabled || (!isLoading && p.length === 0)) {
    return <Redirect to="/auth/login" />;
  }

  return (
    <UnauthenticatedLayout>
      <LayoutContent>
        <Main labelledBy="welcome">
          <Column>
            <img src={authLogo} alt="" aria-hidden style={{ height: '72px' }} />
            <Box paddingTop="6" paddingBottom="1">
              <H1 id="welcome">{formatMessage({ id: 'Auth.form.welcome.title' })}</H1>
            </Box>
            <Box paddingBottom="7">
              <Subtitle textColor="neutral600">
                {formatMessage({ id: 'Auth.login.sso.subtitle' })}
              </Subtitle>
            </Box>
          </Column>
          <Stack size={7}>
            <SSOProviders providers={p} />
            <Row>
              <DividerFull />
              <Box paddingLeft={3} paddingRight={3}>
                <TableLabel textColor="neutral600">{formatMessage({ id: 'or' })}</TableLabel>
              </Box>
              <DividerFull />
            </Row>
            <AuthButton onClick={handleClick}>
              {formatMessage({ id: 'Auth.form.button.login.strapi' })}
            </AuthButton>
          </Stack>
        </Main>
      </LayoutContent>
      <Row justifyContent="center">
        <Box paddingTop={4}>
          <Link to="/auth/forgot-password">
            <Text small>{formatMessage({ id: 'Auth.link.forgot-password' })}</Text>
          </Link>
        </Box>
      </Row>
    </UnauthenticatedLayout>
  );
};

export default Providers;
