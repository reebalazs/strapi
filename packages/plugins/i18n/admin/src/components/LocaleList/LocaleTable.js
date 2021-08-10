import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Text,
  TableLabel,
  VisuallyHidden,
  Row,
  Box,
  IconButton,
} from '@strapi/parts';
import EditIcon from '@strapi/icons/EditIcon';
import DeleteIcon from '@strapi/icons/DeleteIcon';
import { useIntl } from 'react-intl';
import { getTrad } from '../../utils';

const LocaleTable = ({ locales, onDeleteLocale, onEditLocale }) => {
  const { formatMessage } = useIntl();

  return (
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
                {onEditLocale && (
                  <IconButton
                    onClick={() => onEditLocale(locale)}
                    label={formatMessage({ id: getTrad('Settings.list.actions.edit') })}
                    icon={<EditIcon />}
                    noBorder
                  />
                )}
                {onDeleteLocale && !locale.isDefault && (
                  <Box paddingLeft={onEditLocale ? 1 : 0}>
                    <IconButton
                      onClick={() => onDeleteLocale(locale)}
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
  );
};

LocaleTable.defaultProps = {
  locales: [],
  onDeleteLocale: undefined,
  onEditLocale: undefined,
};

LocaleTable.propTypes = {
  locales: PropTypes.array,
  onDeleteLocale: PropTypes.func,
  onEditLocale: PropTypes.func,
};

export default LocaleTable;
