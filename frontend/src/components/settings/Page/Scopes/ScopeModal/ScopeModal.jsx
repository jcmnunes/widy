import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import {
  Modal,
  ModalBody,
  ModalTitle,
  Input,
  ModalFooter,
  Button,
} from '@binarycapsule/ui-capsules';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createScope, updateScope } from './ScopeModal.actions';

export const InputField = styled.label`
  display: block;
  margin-bottom: 16px;
  font-size: 16px;
`;

export const ShortCodeLabel = styled.div`
  line-height: 18px;
`;

export const ShortCodeHelper = styled.div`
  color: ${props => props.theme.neutral300};
  font-size: 12px;
  line-height: 14px;
  margin-bottom: 4px;
`;

export const ShortCodeWrapper = styled.div`
  width: 128px;
`;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter the scope's name"),
  shortCode: Yup.string().required('Please enter a code'),
});

const ScopeModal = ({ scope, closeModal, onCreateScope }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: scope ? scope.name : '',
      shortCode: scope ? scope.shortCode : '',
    },
    validationSchema,
    onSubmit: (values, { setFieldError, setSubmitting }) => {
      if (scope) {
        dispatch(updateScope(scope.id, values, { closeModal, setFieldError, setSubmitting }));
      } else {
        dispatch(createScope(values, { closeModal, setFieldError, setSubmitting, onCreateScope }));
      }
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
          <Button type="submit" appearance="primary" size="large" isLoading={formik.isSubmitting}>
            {scope ? 'Save Changes' : 'Create Scope'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

ScopeModal.defaultProps = {
  scope: null,
  onCreateScope: () => {},
};

ScopeModal.propTypes = {
  scope: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    shortCode: PropTypes.string,
  }),
  closeModal: PropTypes.func.isRequired,
  onCreateScope: PropTypes.func,
};

export default ScopeModal;
