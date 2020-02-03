import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Table, Icon20 } from '@binarycapsule/ui-capsules';
import { formatTotalTime } from '../../../../helpers/pomodoro';

const ScopeRow = styled(Table.Row)`
  background: ${props => props.theme.neutral100} !important;
  color: ${props => props.theme.neutral600};
  font-weight: 700;
`;

const TaskRow = styled(Table.Row)`
  background: #fff !important;

  > td:first-child {
    padding-left: 32px;
  }
`;

const TasksTable = ({ data }) => {
  return (
    <Table>
      <Table.Head>
        <Table.HeaderCell>Tasks</Table.HeaderCell>
        <Table.HeaderCell textAlign="center">Completed</Table.HeaderCell>
        <Table.HeaderCell>Time</Table.HeaderCell>
      </Table.Head>
      <Table.Body>
        {data.map(
          scope =>
            scope.tasks.length > 0 && (
              <React.Fragment key={scope.id}>
                <ScopeRow>
                  <Table.Cell>{scope.scopeTitle}</Table.Cell>
                  <Table.Cell />
                  <Table.Cell style={{ whiteSpace: 'nowrap' }}>
                    {formatTotalTime(scope.time)}
                  </Table.Cell>
                </ScopeRow>
                {scope.tasks.map(({ id, title, completed, time }, index) => (
                  <TaskRow key={id} isEven={index % 2}>
                    <Table.Cell>{title}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {completed ? <Icon20 icon="CHECK" /> : ''}
                    </Table.Cell>
                    <Table.Cell style={{ whiteSpace: 'nowrap' }}>
                      {formatTotalTime(time)}
                    </Table.Cell>
                  </TaskRow>
                ))}
              </React.Fragment>
            ),
        )}
      </Table.Body>
    </Table>
  );
};

TasksTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      scopeTitle: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      tasks: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          completed: PropTypes.bool.isRequired,
          time: PropTypes.number.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

export default TasksTable;
