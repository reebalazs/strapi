import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Stack, Row, Divider, TableLabel, Box, Link, Text } from '@strapi/parts';
import { useIntl } from 'react-intl';
import BaseLogin from '../../../../../../admin/src/pages/AuthPage/components/Login/BaseLogin';
import { useAuthProviders } from '../../../../hooks';
import UnauthenticatedLayout, {
  LayoutContent,
} from '../../../../../../admin/src/layouts/UnauthenticatedLayout';
import SSOProviders from '../Providers/SSOProviders';

const DividerFull = styled(Divider)`
  flex: 1;
`;

const Login = loginProps => {
  const ssoEnabled = strapi.features.isEnabled(strapi.features.SSO);
  const { isLoading, data: providers } = useAuthProviders({ ssoEnabled });
  const { formatMessage } = useIntl();

  if (!ssoEnabled || (!isLoading && providers.length === 0)) {
    return (
      <UnauthenticatedLayout>
        <LayoutContent>
          <BaseLogin {...loginProps} />
        </LayoutContent>
      </UnauthenticatedLayout>
    );
  }

  return (
    <UnauthenticatedLayout>
      <LayoutContent>
        <BaseLogin {...loginProps} />
        <Box paddingTop={7}>
          <Stack size={7}>
            <Row>
              <DividerFull />
              <Box paddingLeft={3} paddingRight={3}>
                <TableLabel textColor="neutral600">
                  {formatMessage({ id: 'Auth.login.sso.divider' })}
                </TableLabel>
              </Box>
              <DividerFull />
            </Row>
            <SSOProviders providers={providers} displayAllProviders={false} />
          </Stack>
        </Box>
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

Login.defaultProps = {
  onSubmit: e => e.preventDefault(),
  requestError: null,
};

Login.propTypes = {
  formErrors: PropTypes.object.isRequired,
  modifiedData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  requestError: PropTypes.object,
};

export default Login;
