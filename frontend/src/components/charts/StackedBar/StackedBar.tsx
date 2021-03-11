import React, { useMemo, useState } from 'react';
import { Box, Text, Tooltip } from '@binarycapsule/ui-capsules';

interface TooltipContentProps {
  label: string;
  value: string;
  color: string;
}

const TooltipContent: React.FC<TooltipContentProps> = ({ label, value, color }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width={8} height={8} bg={color} mr="4" />

      <Text color="neutral.100" fontSize="small" mr="4">
        {`${label}:`}
      </Text>

      <Text color="neutral.100" fontSize="small" fontWeight={600}>
        {value}
      </Text>
    </Box>
  );
};

export interface StackedBarProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
  formatter?(val: number): string;
}

export const StackedBar: React.FC<StackedBarProps> = ({ data, formatter }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const total = useMemo(() => {
    return data.reduce((acc, { value }) => acc + value, 0);
  }, [data]);

  return (
    <Box
      display="flex"
      flexDirection="row"
      height={24}
      width="100%"
      style={{ overflow: 'hidden', borderRadius: 4 }}
    >
      {data.map(({ label, value, color }, index) => {
        return (
          <Tooltip
            key={label}
            content={
              <TooltipContent
                label={label}
                value={formatter ? formatter(value) : value.toString()}
                color={color}
              />
            }
            placement="top"
            delay={0}
          >
            <Box
              bg={color}
              flex={value / total}
              height={32}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              style={{ opacity: hovered !== null && hovered !== index ? 0.3 : 1 }}
            />
          </Tooltip>
        );
      })}
    </Box>
  );
};
