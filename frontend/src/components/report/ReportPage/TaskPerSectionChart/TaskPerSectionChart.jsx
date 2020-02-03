import React from 'react';
import PropTypes from 'prop-types';
import { theme } from '@binarycapsule/ui-capsules';
import { ResponsivePie } from '@nivo/pie';
import { formatTotalTime } from '../../../../helpers/pomodoro';

const TaskPerSectionChart = ({ data }) => {
  return (
    <ResponsivePie
      data={data}
      innerRadius={0.5}
      colors={[theme.blue100, theme.blue200]}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
      cornerRadius={3}
      padAngle={3}
      enableRadialLabels
      radialLabelsTextColor={theme.neutral600}
      radialLabelsLinkColor={theme.blue300}
      radialLabel={d => (
        <>
          <tspan x="0" dy="-0.6em" style={{ fontFamily: 'Source Sans Pro', fontSize: 14 }}>
            {d.label}
          </tspan>
          <tspan
            x="0"
            dy="1.2em"
            style={{ fontFamily: 'Source Sans Pro', fontSize: 16, fontWeight: 700 }}
          >
            {formatTotalTime(d.value)}
          </tspan>
        </>
      )}
      isInteractive={false}
      enableSlicesLabels={false}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
    />
  );
};

TaskPerSectionChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default TaskPerSectionChart;
