import React from 'react';
import {
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
} from '@binarycapsule/ui-capsules';
import useMedia from 'react-use/lib/useMedia';
import { formatTotalTime } from '../../../../helpers/timeHelpers';
import { IconTableCell, ScopeRow, TaskRow } from './TasksTable.styles';
import { ReportTask } from '../../api/useReport';

interface Props {
  data: {
    scopeTitle: string;
    id: string;
    time?: number;
    tasks: Pick<ReportTask, 'id' | 'title' | 'completed' | 'time'>[];
  }[];
}

export const TasksTable: React.FC<Props> = ({ data }) => {
  const isWide = useMedia('(min-width: 720px)');

  return (
    <Table>
      <TableHead>
        <TableHeaderCell>Tasks</TableHeaderCell>
        {isWide && <TableHeaderCell textAlign="center">Completed</TableHeaderCell>}
        <TableHeaderCell>Time</TableHeaderCell>
      </TableHead>
      <TableBody>
        {data.map(
          scope =>
            scope.tasks.length > 0 && (
              <React.Fragment key={scope.id}>
                <ScopeRow>
                  <TableCell>{scope.scopeTitle}</TableCell>
                  {isWide && <TableCell />}
                  <TableCell noWrap>{scope.time ? formatTotalTime(scope.time) : ''}</TableCell>
                </ScopeRow>
                {scope.tasks.map(({ id, title, completed, time }) => (
                  <TaskRow key={id}>
                    <TableCell>{title}</TableCell>
                    {isWide && (
                      <IconTableCell textAlign="center">
                        {completed ? <Icon icon="check" size={18} /> : ''}
                      </IconTableCell>
                    )}
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
