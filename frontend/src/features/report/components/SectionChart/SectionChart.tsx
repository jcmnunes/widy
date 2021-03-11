import React from 'react';
import useMedia from 'react-use/lib/useMedia';
import { useSectionChart } from './useSectionChart';
import { StackedBar } from '../../../../components/charts/StackedBar/StackedBar';
import { formatTotalTime } from '../../../../helpers/timeHelpers';
import { Box, Flex, Text, Wrapper, WrapperProps } from '@binarycapsule/ui-capsules';
import { Cell, ChartWrapper, HeadCell } from './SectionChart.styles';

export const SectionChart: React.FC<WrapperProps> = props => {
  const { data } = useSectionChart();

  const isWide = useMedia('(min-width: 720px)');

  if (!data) {
    return null;
  }

  return (
    <Wrapper {...props}>
      <ChartWrapper>
        <Box m="16">
          <StackedBar data={data} formatter={formatTotalTime} />
        </Box>

        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <HeadCell>
                <Text variant="smallCaps" color="neutral.700">
                  Sections
                </Text>
              </HeadCell>

              {isWide && (
                <HeadCell style={{ textAlign: 'center' }}>
                  <Text variant="smallCaps">Tasks</Text>
                </HeadCell>
              )}

              <HeadCell>
                <Text variant="smallCaps">Time</Text>
              </HeadCell>
            </tr>
          </thead>

          <tbody>
            {data.map(({ value, label, color, taskCount }) => (
              <tr>
                <Cell>
                  <Flex alignItems="center">
                    <Box bg={color} width={12} height={12} mr="8" />
                    {label}
                  </Flex>
                </Cell>

                {isWide && <Cell style={{ textAlign: 'center' }}>{taskCount}</Cell>}

                <Cell>{formatTotalTime(value)}</Cell>
              </tr>
            ))}
          </tbody>
        </table>
      </ChartWrapper>
    </Wrapper>
  );
};
