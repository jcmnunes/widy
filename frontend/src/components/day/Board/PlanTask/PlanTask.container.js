import { connect } from 'react-redux';
import PlanTask from './PlanTask';
import {
  handlePlanTaskClick,
  handlePlanTaskLaunch,
  handlePlanTaskRename,
} from './PlanTask.actions';
import { scopesSelector } from '../../../../selectors/scopes/scopesSelectors';
import { findScopeCode } from '../../../../helpers/scopes';

const mapStateToProps = (state, ownProps) => {
  const task = state.tasks.byId[ownProps.taskId];
  const scopes = scopesSelector(state);

  return {
    selectedTaskId: state.tasks.selected,
    taskTitle: task ? task.title : '',
    scopeCode: findScopeCode(task.scopeId, scopes),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handlePlanTaskClick: handlePlanTaskClick(dispatch, ownProps),
  handlePlanTaskRename: handlePlanTaskRename(dispatch),
  handlePlanTaskLaunch: handlePlanTaskLaunch(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanTask);
