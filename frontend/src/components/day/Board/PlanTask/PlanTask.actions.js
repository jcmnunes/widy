import { storeSelectedSectionId } from '../../../../actions/sections';
import { storeSelectedTaskId } from '../../../../actions/tasks';
import { openModal } from '../../../../actions/modals';
import { LAUNCH_TASK, RENAME_TASK } from '../../../modals/types';

export const handlePlanTaskClick = (dispatch, ownProps) => () => {
  const { sectionId, taskId } = ownProps;
  dispatch(storeSelectedSectionId(sectionId));
  dispatch(storeSelectedTaskId(taskId));
};

export const handlePlanTaskRename = dispatch => () => {
  dispatch(openModal(RENAME_TASK));
};

export const handlePlanTaskLaunch = dispatch => () => {
  dispatch(openModal(LAUNCH_TASK));
};
