import React from 'react';
import { Offline } from 'react-detect-offline';
import { Flex, IllustratedIcon, Modal, Text } from '@binarycapsule/ui-capsules';
import { useTheme } from '@emotion/react';

export const NoInternet = () => {
  const theme = useTheme();

  return (
    <Offline>
      <Modal contentLabel="Offline-modal" isOpen size="small">
        <Flex flexDirection="column" alignItems="center" p="24" pt="12">
          <IllustratedIcon
            icon="wifi_off"
            primaryColor={theme.colors.neutral['300']}
            secondaryColor={theme.colors.error['500']}
            size="138px"
          />

          <Text fontWeight={500} fontSize="h5">
            No internet connection!
          </Text>

          <Text variant="helper" textAlign="center" mt="8" px="32">
            Please, make sure you have an internet connection to continue using Widy
          </Text>
        </Flex>
      </Modal>
    </Offline>
  );
};
