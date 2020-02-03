import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components/macro';
import { SizeMe } from 'react-sizeme';
import { Button, theme } from '@binarycapsule/ui-capsules';
import Days from './Days';
import LoadingNavigation from './LoadingNavigation';
import { Heading1 } from '../../common/Typography';
import { IconWidy, IconWidyText } from '../../../icons/widy';
import { storeSelectedDay, getDays, getDay, createDay } from '../../../actions/days';
import { storeSelectedTaskId } from '../../../actions/tasks';
import settings from '../../../helpers/settings';

const { DAYS_LIST_MIN_WIDTH } = settings();

const StyledNavigation = styled.div`
  background: ${props => props.theme.neutral050};
  padding: 36px 10px 24px;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
    padding: 0 4px;
  }

  @media (min-width: ${props => props.theme.bp_xlarge}) {
    padding: 36px 24px 24px;

    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding: 0;
    }
  }
`;

const Brand = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: flex-end;

  svg:last-child {
    margin-left: 8px;
  }
`;

class Navigation extends Component {
  componentDidMount() {
    this.props.getDays();
  }

  handleDayClick = id => {
    const { selected } = this.props;
    if (id === selected) return;
    this.props.storeSelectedDay(id);
    this.props.getDay(id);
  };

  createDay = () => {
    this.props.storeSelectedTaskId('');
    this.props.createDay();
  };

  render() {
    const { loading, days, daysOrder, selected, createDayLoading } = this.props;
    const today = moment().format('YYYY-MM-DD');
    const isTodayCreated = !!daysOrder.find(id => days[id].day === today);
    return (
      <SizeMe>
        {({ size }) => (
          <StyledNavigation>
            <Brand>
              <IconWidy size={30} yesterdayColor={theme.blue600} />
              <IconWidyText size={60} textColor={theme.blue600} />
            </Brand>
            <div className="header">
              <Heading1>Days</Heading1>
              <Button
                isLoading={createDayLoading}
                isDisabled={isTodayCreated || loading}
                onClick={this.createDay}
                appearance="primary"
                iconBefore="PLUS"
                isBlock={size.width === DAYS_LIST_MIN_WIDTH}
              >
                {size.width > DAYS_LIST_MIN_WIDTH ? 'Add Day' : ''}
              </Button>
            </div>
            {loading ? (
              <LoadingNavigation />
            ) : (
              <Days
                days={days}
                order={daysOrder}
                selected={selected}
                isSmall={size.width === DAYS_LIST_MIN_WIDTH}
                handleDayClick={this.handleDayClick}
              />
            )}
          </StyledNavigation>
        )}
      </SizeMe>
    );
  }
}

Navigation.propTypes = {
  loading: PropTypes.bool.isRequired,
  days: PropTypes.shape({
    [PropTypes.string]: PropTypes.object,
  }).isRequired,
  daysOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  createDayLoading: PropTypes.bool.isRequired,
  getDay: PropTypes.func.isRequired,
  getDays: PropTypes.func.isRequired,
  storeSelectedDay: PropTypes.func.isRequired,
  storeSelectedTaskId: PropTypes.func.isRequired,
  createDay: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  loading: state.days.loading,
  days: state.days.byId,
  daysOrder: state.days.order,
  selected: state.days.selected,
  createDayLoading: state.days.createDayLoading,
});

export default connect(mapStateToProps, {
  getDays,
  getDay,
  storeSelectedDay,
  createDay,
  storeSelectedTaskId,
})(Navigation);
