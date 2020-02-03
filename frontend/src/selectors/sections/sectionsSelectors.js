import { createSelector } from 'reselect';

const sectionsByIdSelector = state => state.sections.byId;
const selectedSectionIdSelector = state => state.sections.selected;
const sectionsOrderSelector = state => state.sections.order;
const selectedTaskIdSelector = state => state.tasks.selected;

export const normalSectionsRadiosSelector = createSelector(
  sectionsByIdSelector,
  sectionsOrderSelector,
  (sectionsById, order) =>
    order.reduce((acc, cur, index) => {
      if (index === 0) return acc;
      const curSection = sectionsById[cur];
      return [...acc, { id: curSection.id, label: curSection.title }];
    }, []),
);

export const selectedTaskIndexSelector = createSelector(
  selectedTaskIdSelector,
  selectedSectionIdSelector,
  sectionsByIdSelector,
  (selectedTaskId, selectedSectionId, sectionsById) =>
    selectedTaskId && selectedSectionId
      ? sectionsById[selectedSectionId].tasks.indexOf(selectedTaskId)
      : null,
);
