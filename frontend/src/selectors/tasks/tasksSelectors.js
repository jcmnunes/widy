import { createSelector } from 'reselect';

const selectedTaskIdSelector = state => state.tasks.selected;
const tasksByIdSelector = state => state.tasks.byId;
const planSectionIdSelector = state => state.sections.order[0];
const sectionsByIdSelector = state => state.sections.byId;
export const activeTaskSelector = state => state.activeTask;

export const selectedTaskSelector = createSelector(
  selectedTaskIdSelector,
  tasksByIdSelector,
  (selectedTaskId, tasksById) => (selectedTaskId ? tasksById[selectedTaskId] : null),
);

export const selectedTaskTitleSelector = createSelector(
  selectedTaskIdSelector,
  tasksByIdSelector,
  (selectedTaskId, tasksById) => (selectedTaskId ? tasksById[selectedTaskId].title : ''),
);

export const isSelectedTaskInPlanSelector = createSelector(
  selectedTaskIdSelector,
  planSectionIdSelector,
  sectionsByIdSelector,
  (selectedTaskId, planSectionId, sectionsById) => {
    if (selectedTaskId && planSectionId) {
      return sectionsById[planSectionId].tasks.includes(selectedTaskId);
    }
    return false;
  },
);

export const isSelectedTaskCompletedSelector = createSelector(
  selectedTaskIdSelector,
  tasksByIdSelector,
  (selectedTaskId, tasksById) => (selectedTaskId ? tasksById[selectedTaskId].completed : false),
);

export const isSelectedTaskActiveSelector = createSelector(
  selectedTaskIdSelector,
  activeTaskSelector,
  (selectedTaskId, activeTask) => selectedTaskId === activeTask.taskId,
);

export const hasSelectedTaskLoggedTimeSelector = createSelector(
  selectedTaskIdSelector,
  tasksByIdSelector,
  (selectedTaskId, tasksById) => (selectedTaskId ? tasksById[selectedTaskId].time > 0 : false),
);

export const noTasksSelector = createSelector(
  tasksByIdSelector,
  tasksById => Object.keys(tasksById).length === 0,
);

export const canRegisterTimeSelector = createSelector(
  isSelectedTaskInPlanSelector,
  isSelectedTaskActiveSelector,
  isSelectedTaskCompletedSelector,
  (isSelectedTaskInPlan, isSelectedTaskActive, isSelectedTaskCompleted) =>
    !(isSelectedTaskInPlan || isSelectedTaskActive || isSelectedTaskCompleted),
);

export const canScheduleTaskSelector = createSelector(
  isSelectedTaskActiveSelector,
  isSelectedTaskCompletedSelector,
  hasSelectedTaskLoggedTimeSelector,
  (isSelectedTaskActive, isSelectedTaskCompleted, hasSelectedTaskLoggedTime) =>
    !(isSelectedTaskActive || isSelectedTaskCompleted || hasSelectedTaskLoggedTime),
);
