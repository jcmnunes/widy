import React from 'react';
import * as Yup from 'yup';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from '@binarycapsule/ui-capsules';
import { useFormik } from 'formik';
import { queryCache } from 'react-query';
import { produce } from 'immer';
import {
  InputField,
  ShortCodeHelper,
  ShortCodeLabel,
  ShortCodeWrapper,
} from '../../../settings/Page/Scopes/ScopeModal/ScopeModal';
import { ScopeDto, ScopeOption } from '../../api/useScopes';
import { useUpsertScope } from '../../api/useUpsertScope';

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter the scope's name"),
  shortCode: Yup.string().required('Please enter a code'),
});

interface Props {
  scope?: ScopeDto;
  closeModal(): void;
  onUpsertScope(scope: ScopeOption): void;
}

export const ScopeModal: React.FC<Props> = ({ scope, closeModal, onUpsertScope }) => {
  const [createScope, { status }] = useUpsertScope();
  const formik = useFormik({
    initialValues: {
      name: scope ? scope.name : '',
      shortCode: scope ? scope.shortCode : '',
    },
    validationSchema,
    onSubmit: ({ name, shortCode }) => {
      createScope(
        { name, shortCode },
        {
          onSuccess(newScope) {
            queryCache.setQueryData<ScopeDto[] | undefined>('scopes', scopes => {
              if (!scopes) return scopes;
              return produce(scopes, draftState => {
                draftState.push(newScope);
              });
            });
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
    <Modal isOpen onRequestClose={closeModal} contentLabel="Create scope modal" width="384px">
      <form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <ModalTitle>{scope ? 'Edit scope' : 'Create new scope'}</ModalTitle>
          <InputField>
            Name
            <Input
              placeholder="Scope name"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.errors.name && formik.touched.name ? formik.errors.name : ''}
            />
          </InputField>
          <InputField>
            <ShortCodeLabel>Short Code</ShortCodeLabel>
            <ShortCodeHelper>Choose a short code to identify this scope.</ShortCodeHelper>
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
          <Button
            appearance="secondary"
            size="large"
            onClick={closeModal}
            isDisabled={formik.isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" appearance="primary" size="large" isLoading={status === 'loading'}>
            {scope ? 'Save Changes' : 'Create Scope'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
