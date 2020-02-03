import { openModal } from '../../../../actions/modals';
import { REGISTER_TIME, RENAME_TASK } from '../../../modals/types';

export const handleTaskRename = dispatch => () => {
  dispatch(openModal(RENAME_TASK));
};

export const handleRegisterTimeClick = dispatch => () => {
  dispatch(openModal(REGISTER_TIME));
};
