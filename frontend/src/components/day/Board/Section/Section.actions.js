import { ADD_TASK } from '../../../modals/types';
import { storeCreateTaskData } from '../../../../actions/tasks';
import { openModal } from '../../../../actions/modals';

// eslint-disable-next-line import/prefer-default-export
export const openCreateTaskModal = (dispatch, ownProps) => () => {
  const { dayId, sectionId } = ownProps;
  dispatch(storeCreateTaskData(dayId, sectionId));
  dispatch(openModal(ADD_TASK));
};
