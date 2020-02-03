import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Select } from '@binarycapsule/ui-capsules';
import CustomLabel from './components/CustomLabel';
import {
  allScopesSelector,
  scopesOptionsSelector,
} from '../../../selectors/scopes/scopesSelectors';
import { selectedTaskSelector } from '../../../selectors/tasks/tasksSelectors';
import { updateTask } from '../../../actions/tasks';
import ScopeModal from '../../settings/Page/Scopes/ScopeModal/ScopeModal';

const ScopeSelect = () => {
  const [isScopeModalOpen, setIsScopeModalOpen] = useState(false);

  const scopesOptions = useSelector(scopesOptionsSelector);
  const task = useSelector(selectedTaskSelector);
  const scopes = useSelector(allScopesSelector);
  const scope = scopes.find(({ id }) => id === task.scopeId);

  const dispatch = useDispatch();

  const filterScopes = ({ data: { label, shortCode } }, input) => {
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
        isClearable
        value={scope ? { id: scope.id, label: scope.name, shortCode: scope.shortCode } : null}
        options={scopesOptions}
        placeholder="No scope"
        onChange={opt => dispatch(updateTask(task.id, { scopeId: opt ? opt.value : null }))}
        formatOptionLabel={CustomLabel}
        menuPortalTarget={document.body}
        filterOption={filterScopes}
      />
      <Button onClick={() => setIsScopeModalOpen(true)} appearance="none" size="small">
        + Create new scope
      </Button>

      {isScopeModalOpen && (
        <ScopeModal
          closeModal={() => setIsScopeModalOpen(false)}
          onCreateScope={({ id }) => dispatch(updateTask(task.id, { scopeId: id }))}
        />
      )}
    </>
  );
};

export default ScopeSelect;
