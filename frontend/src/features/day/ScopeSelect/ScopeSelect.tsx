import React, { useState } from 'react';
import { Button, Select } from '@binarycapsule/ui-capsules';
import { CustomLabel } from './components/CustomLabel';
import { ScopeModal } from '../modals/ScopeModal/ScopeModal';

type ScopeOption = {
  value: string;
  label: string;
  shortCode: string;
};

interface Props {
  value: ScopeOption | null;
  options: ScopeOption[];
  onChange(opt: ScopeOption): void;
  isInsideModal?: boolean;
}

export const ScopeSelect: React.FC<Props> = ({ value, options, isInsideModal, onChange }) => {
  const [isScopesModalOpen, setIsScopesModalOpen] = useState(false);

  const filterScopes = (
    { data: { label, shortCode } }: { data: { label: string; shortCode: string } },
    input: string,
  ) => {
    if (input) {
      return (
        label.toLowerCase().includes(input.toLowerCase()) ||
        shortCode.toLowerCase().includes(input.toLowerCase())
      );
    }
    return true;
  };

  return (
    <>
      <Select
        value={value}
        options={options}
        onChange={opt => onChange(opt as ScopeOption)}
        isClearable
        placeholder="No scope"
        formatOptionLabel={CustomLabel}
        menuPortalTarget={isInsideModal ? document.body : undefined}
        filterOption={filterScopes}
      />

      <Button
        leftIcon="plus"
        size="small"
        variant="ghost"
        variantColor="neutral"
        onClick={() => setIsScopesModalOpen(true)}
        mt="4"
      >
        Create new scope
      </Button>

      {isScopesModalOpen && (
        <ScopeModal closeModal={() => setIsScopesModalOpen(false)} onUpsertScope={onChange} />
      )}
    </>
  );
};
