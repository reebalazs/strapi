import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import AddIcon from '@strapi/icons/AddIcon';
import { HeaderLayout, Button, Main } from '@strapi/parts';
import { getTrad } from '../../utils';
import LocaleList from '../../components/LocaleList';

const LocaleSettingsPage = ({
  canReadLocale,
  canCreateLocale,
  canDeleteLocale,
  canUpdateLocale,
}) => {
  const { formatMessage } = useIntl();
  const [isOpenedCreateModal, setIsOpenedCreateModal] = useState(false);

  const handleToggleModalCreate = canCreateLocale
    ? () => setIsOpenedCreateModal(s => !s)
    : undefined;

  return (
    <Main labelledBy="title">
      <HeaderLayout
        id="title"
        primaryAction={
          <Button startIcon={<AddIcon />} onClick={handleToggleModalCreate}>
            {formatMessage({ id: getTrad('Settings.list.actions.add') })}
          </Button>
        }
        title={formatMessage({ id: getTrad('plugin.name') })}
        subtitle={formatMessage({ id: getTrad('Settings.list.description') })}
      />

      {canReadLocale ? (
        <LocaleList
          canUpdateLocale={canUpdateLocale}
          canDeleteLocale={canDeleteLocale}
          onToggleCreateModal={handleToggleModalCreate}
          isCreating={isOpenedCreateModal}
        />
      ) : null}
    </Main>
  );
};

LocaleSettingsPage.propTypes = {
  canReadLocale: PropTypes.bool.isRequired,
  canCreateLocale: PropTypes.bool.isRequired,
  canUpdateLocale: PropTypes.bool.isRequired,
  canDeleteLocale: PropTypes.bool.isRequired,
};

export default LocaleSettingsPage;
