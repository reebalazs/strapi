import React from 'react';
import PropTypes from 'prop-types';
import { Row, Link, Text, Box } from '@strapi/parts';
import { useIntl } from 'react-intl';
import BaseLogin from './BaseLogin';
import UnauthenticatedLayout, { LayoutContent } from '../../../../layouts/UnauthenticatedLayout';

const Login = loginProps => {
  const { formatMessage } = useIntl();

  return (
    <UnauthenticatedLayout>
      <LayoutContent>
        <BaseLogin {...loginProps} />
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
