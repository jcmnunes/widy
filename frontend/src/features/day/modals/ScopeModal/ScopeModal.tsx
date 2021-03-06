import React from 'react';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Text,
} from '@binarycapsule/ui-capsules';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { ScopeDto, ScopeOption } from '../../api/useScopesQuery';
import { useUpsertScopeMutation } from '../../api/useUpsertScopeMutation';
import { InputField, ShortCodeWrapper } from './ScopeModal.styles';

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Enter the scope's name"),
  shortCode: Yup.string().required('Enter a code'),
});

interface Props {
  scope?: ScopeDto;
  closeModal(): void;
  onUpsertScope?(scope: ScopeOption): void;
}

export const ScopeModal: React.FC<Props> = ({ scope, closeModal, onUpsertScope }) => {
  const { mutate: upsertScope, status, error } = useUpsertScopeMutation();
  const upsertScopeError = error as AxiosError | undefined;

  const formik = useFormik({
    initialValues: {
      name: scope ? scope.name : '',
      shortCode: scope ? scope.shortCode : '',
    },
    validationSchema,
    onSubmit: ({ name, shortCode }) => {
      upsertScope(
        { name, shortCode, id: scope?.id },
        {
          onSuccess(newScope) {
            onUpsertScope &&
              onUpsertScope({
                value: newScope.id,
                label: newScope.name,
                shortCode: newScope.shortCode,
              });
            closeModal();
          },
        },
      );
    },
  });

  return (
    <Modal isOpen onRequestClose={closeModal} contentLabel="Create scope modal" size="small">
      <ModalHeader>{scope ? 'Edit scope' : 'Create new scope'}</ModalHeader>

      <ModalCloseButton onClick={closeModal} />

      <form onSubmit={formik.handleSubmit}>
        <ModalBody>
          {status === 'error' && upsertScopeError && (
            <Alert
              variant="error"
              message={upsertScopeError?.response?.data?.error || 'Something went wrong'}
              mb="12"
            />
          )}

          <Box mb="12">
            <Text variant="label">Name</Text>
            <Input
              placeholder="Scope name"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.errors.name && formik.touched.name ? formik.errors.name : ''}
            />
          </Box>

          <InputField>
            <Text variant="label">Short Code</Text>
            <Text variant="helper" mb="4">
              Choose a short code to identify this scope.
            </Text>
            <ShortCodeWrapper>
              <Input
                placeholder="Scope code"
                id="shortCode"
                name="shortCode"
                onChange={formik.handleChange}
                onBlur={evt => {
                  const { shortCode } = formik.values;
                  const newShortCode = shortCode
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .replace(/[^a-zA-Z0-9-]/g, '')
                    .toUpperCase();
                  formik.setFieldValue('shortCode', newShortCode);
                  formik.handleBlur(evt);
                }}
                value={formik.values.shortCode}
                error={
                  formik.errors.shortCode && formik.touched.shortCode ? formik.errors.shortCode : ''
                }
              />
            </ShortCodeWrapper>
          </InputField>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" variantColor="neutral" size="large" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" size="large" isLoading={status === 'loading'}>
            {scope ? 'Save Changes' : 'Create Scope'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
