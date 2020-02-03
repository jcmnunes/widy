import { createSelector } from 'reselect';

const reportStateSelector = state => state.report;

export const daysLoadingSelector = createSelector(
  reportStateSelector,
  ({ daysLoading }) => daysLoading,
);
export const daysSelector = createSelector(reportStateSelector, ({ days }) => days);

export const reportLoadingSelector = createSelector(
  reportStateSelector,
  ({ reportLoading }) => reportLoading,
);
export const reportSelector = createSelector(reportStateSelector, ({ report }) => report);

export const timePerSectionSelector = createSelector(reportSelector, ({ tasks }) => {
  return tasks.reduce((acc, { section, time }) => {
    if (section.isPlan) {
      return acc;
    }

    if (section.id in acc) {
      acc[section.id].time += time;
    } else {
      acc[section.id] = {
        title: section.title,
        time,
      };
    }
    return acc;
  }, {});
});

export const timePerSectionPieChartDataSelector = createSelector(
  timePerSectionSelector,
  timePerSection =>
    Object.entries(timePerSection).map(([sectionId, section]) => ({
      id: sectionId,
      label: section.title,
      value: section.time,
    })),
);

export const tasksTableDataSelector = createSelector(reportSelector, ({ tasks }) => {
  const tasksPerScope = tasks.reduce(
    (acc, { section, time, completed, title, scope, id }) => {
      if (section.isPlan) {
        return acc;
      }

      if (time === 0) {
        return acc;
      }

      const task = { id, title, completed, time };

      if (!scope) {
        acc[0].tasks.push(task);
      } else {
        const scopeIndex = acc.findIndex(({ id: scopeId }) => scopeId === scope.id);

        if (scopeIndex === -1) {
          acc.push({
            id: scope.id,
            scopeTitle: `${scope.name} - ${scope.shortCode.toUpperCase()}`,
            tasks: [task],
          });
        } else {
          acc[scopeIndex].tasks.push(task);
        }
      }

      return acc;
    },
    [{ scopeTitle: 'No Scope', id: 'no-scope', tasks: [] }],
  );

  // Sum all tasks time and add it as the scope's time property
  return tasksPerScope.reduce((acc, scope, index) => {
    acc[index].time = scope.tasks.reduce((totalTime, { time }) => totalTime + time, 0);
    return acc;
  }, tasksPerScope);
});
