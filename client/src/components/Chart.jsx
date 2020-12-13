import React from 'react';

import { Grommet, Box, Chart, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const LabelledChart = ({ color, label, value }) => (
  <Box flex={false} basis="xsmall">
    <Chart
      bounds={[
        [0, 2],
        [0, 400],
      ]}
      type="bar"
      values={[{ value: [1, value] }]}
      color={color}
      round
      size={{ height: 'xsmall', width: 'small' }}
    />

  </Box>
);

export default LabelledChart