import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  ContentLayout,
  Text,
  TableLabel,
  VisuallyHidden,
  Row,
  Box,
  IconButton,
  Loader,
  EmptyStateLayout,
  Button,
} from '@strapi/parts';
import EditIcon from '@strapi/icons/EditIcon';
import DeleteIcon from '@strapi/icons/DeleteIcon';
import AddIcon from '@strapi/icons/AddIcon';
import EmptyStateDocument from '@strapi/icons/EmptyStateDocument';
import useLocales from '../../hooks/useLocales';
import { getTrad } from '../../utils';
import ModalEdit from '../ModalEdit';
import ModalDelete from '../ModalDelete';
import ModalCreate from '../ModalCreate';

const LocaleList = ({ canUpdateLocale, canDeleteLocale, onToggleCreateModal, isCreating }) => {
  const [localeToDelete, setLocaleToDelete] = useState();
  const [localeToEdit, setLocaleToEdit] = useState();
  const { locales, isLoading } = useLocales();
  const { formatMessage } = useIntl();

  if (isLoading) {
    return (
      <Row justifyContent="center">
        <Box paddingTop={10} paddingBottom={10}>
          <Loader>Loading the locales...</Loader>
        </Box>
      </Row>
    );
  }

  if (locales?.length > 0) {
    return (
      <>
        <ContentLayout>
          <EmptyStateLayout
            icon={<EmptyStateDocument width="" height="" />}
            content={formatMessage({ id: getTrad('Settings.list.empty.title') })}
            action={
              onToggleCreateModal ? (
                <Button variant="secondary" startIcon={<AddIcon />} onClick={onToggleCreateModal}>
                  {formatMessage({ id: getTrad('Settings.list.actions.add') })}
                </Button>
              ) : null
            }
          />
        </ContentLayout>

        <ModalCreate isOpened={isCreating} onClose={onToggleCreateModal} />
      </>
    );
  }

  // Delete actions
  const closeModalToDelete = () => setLocaleToDelete(undefined);
  const handleDeleteLocale = canDeleteLocale ? setLocaleToDelete : undefined;

  // Edit actions
  const closeModalToEdit = () => setLocaleToEdit(undefined);
  const handleEditLocale = canUpdateLocale ? setLocaleToEdit : undefined;

  return (
    <>
      <ContentLayout>
        <Table colCount={4} rowCount={locales.length + 1}>
          <Thead>
            <Tr>
              <Th>
                <TableLabel textColor="neutral600">ID</TableLabel>
              </Th>
              <Th>
                <TableLabel textColor="neutral600">Display name</TableLabel>
              </Th>
              <Th>
                <TableLabel textColor="neutral600">Default</TableLabel>
              </Th>
              <Th>
                <VisuallyHidden>Actions</VisuallyHidden>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {locales.map(locale => (
              <Tr key={locale.id}>
                <Td>
                  <Text textColor="neutral800">{locale.id}</Text>
                </Td>
                <Td>
                  <Text textColor="neutral800">{locale.name}</Text>
                </Td>
                <Td>
                  <Text textColor="neutral800">
                    {locale.isDefault
                      ? formatMessage({ id: getTrad('Settings.locales.row.default-locale') })
                      : null}
                  </Text>
                </Td>
                <Td>
                  <Row justifyContent="flex-end">
                    {canUpdateLocale && (
                      <IconButton
                        onClick={() => handleEditLocale(locale)}
                        label={formatMessage({ id: getTrad('Settings.list.actions.edit') })}
                        icon={<EditIcon />}
                        noBorder
                      />
                    )}
                    {canDeleteLocale && !locale.isDefault && (
                      <Box paddingLeft={canUpdateLocale ? 1 : 0}>
                        <IconButton
                          onClick={() => handleDeleteLocale(locale)}
                          label={formatMessage({ id: getTrad('Settings.list.actions.delete') })}
                          icon={<DeleteIcon />}
                          noBorder
                        />
                      </Box>
                    )}
                  </Row>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </ContentLayout>

      <ModalCreate
        isOpened={isCreating}
        onClose={onToggleCreateModal}
        alreadyUsedLocales={locales}
      />
      <ModalDelete localeToDelete={localeToDelete} onClose={closeModalToDelete} />
      <ModalEdit localeToEdit={localeToEdit} onClose={closeModalToEdit} locales={locales} />
    </>
  );
};

LocaleList.defaultProps = {
  onToggleCreateModal: undefined,
};

LocaleList.propTypes = {
  canUpdateLocale: PropTypes.bool.isRequired,
  canDeleteLocale: PropTypes.bool.isRequired,
  onToggleCreateModal: PropTypes.func,
  isCreating: PropTypes.bool.isRequired,
};

export default LocaleList;
