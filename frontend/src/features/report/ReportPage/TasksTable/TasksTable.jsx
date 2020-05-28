import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import {
  Table,
  Icon,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableCell,
  TableRow,
} from '@binarycapsule/ui-capsules';
import { formatTotalTime } from '../../../../helpers/timeHelpers';

const ScopeRow = styled(TableRow)`
  background: ${props => props.theme.neutral100} !important;
  color: ${props => props.theme.neutral600};
  font-weight: 700;
`;

const TaskRow = styled(TableRow)`
  background: #fff !important;

  > td:first-child {
    padding-left: 32px;
  }
`;

const TasksTable = ({ data }) => {
  return (
    <Table>
      <TableHead>
        <TableHeaderCell>Tasks</TableHeaderCell>
        <TableHeaderCell textAlign="center">Completed</TableHeaderCell>
        <TableHeaderCell>Time</TableHeaderCell>
      </TableHead>
      <TableBody>
        {data.map(
          scope =>
            scope.tasks.length > 0 && (
              <React.Fragment key={scope.id}>
                <ScopeRow>
                  <TableCell>{scope.scopeTitle}</TableCell>
                  <TableCell />
                  <TableCell noWrap>{formatTotalTime(scope.time)}</TableCell>
                </ScopeRow>
                {scope.tasks.map(({ id, title, completed, time }, index) => (
                  <TaskRow key={id} isEven={index % 2}>
                    <TableCell>{title}</TableCell>
                    <TableCell textAlign="center">
                      {completed ? <Icon icon="check" /> : ''}
                    </TableCell>
                    <TableCell noWrap>{formatTotalTime(time)}</TableCell>
                  </TaskRow>
                ))}
              </React.Fragment>
            ),
        )}
      </TableBody>
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
