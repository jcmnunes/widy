import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import { Button } from '@binarycapsule/ui-capsules';
import Task from '../Task/Task.container';
import PlanTask from '../PlanTask/PlanTask.container';
import { Heading2 } from '../../../common/Typography';
import { IllustrationPlan } from '../../../../icons/Illustrations';
import { SectionWithNoTasks, StyledSection, Tasks } from './Section.styles';

class Section extends Component {
  renderSection = provided => {
    const { section } = this.props;
    return (
      <Tasks ref={provided.innerRef} {...provided.droppableProps}>
        {section.tasks.map((taskId, index) => {
          if (section.isPlan) {
            return <PlanTask key={taskId} taskId={taskId} index={index} sectionId={section.id} />;
          }
          return <Task key={taskId} taskId={taskId} index={index} sectionId={section.id} />;
        })}
        {provided.placeholder}
      </Tasks>
    );
  };

  renderEmptySection = (provided, snapshot) => {
    const { section, noTasks, openCreateTaskModal } = this.props;
    return (
      <SectionWithNoTasks
        ref={provided.innerRef}
        {...provided.droppableProps}
        isDraggingOver={snapshot.isDraggingOver}
        isPlan={section.isPlan}
        onClick={openCreateTaskModal}
        noTasks={noTasks}
      >
        {section.isPlan && (
          <>
            {noTasks && <IllustrationPlan />}
            {noTasks ? (
              <span>Start by adding tasks here to plan your day.</span>
            ) : (
              <span>No tasks in Plan.</span>
            )}
          </>
        )}
        {!section.isPlan &&
          (snapshot.isDraggingOver ? (
            <span>Add task to section &quot;{section.title}&quot;</span>
          ) : (
            <span>No tasks in section &quot;{section.title}&quot;</span>
          ))}
      </SectionWithNoTasks>
    );
  };

  render() {
    const { section, openCreateTaskModal } = this.props;
    return (
      <StyledSection>
        <Heading2>{section.title}</Heading2>
        <Droppable droppableId={section.id}>
          {(provided, snapshot) =>
            section.tasks.length > 0
              ? this.renderSection(provided)
              : this.renderEmptySection(provided, snapshot)
          }
        </Droppable>
        <Button
          appearance="minimal"
          iconBefore="PLUS"
          onClick={openCreateTaskModal}
          style={{ marginTop: 8 }}
          data-test="add-task-button"
        >
          {section.isPlan ? 'Add to Plan' : 'Add task'}
        </Button>
      </StyledSection>
    );
  }
}

Section.propTypes = {
  noTasks: PropTypes.bool.isRequired,
  section: PropTypes.shape({
    id: PropTypes.string,
    tasks: PropTypes.array,
    title: PropTypes.string,
    isPlan: PropTypes.bool,
  }).isRequired,
  openCreateTaskModal: PropTypes.func.isRequired,
};

export default Section;
