import React from 'react';

import { Box, DataChart, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const data = [];
for (let i = 1; i < 12; i += 1) {
  const v = Math.sin(i / 2.0);
  data.push({
    date: `2020-${((i % 12) + 1).toString().padStart(2, 0)}-01`,
    percent: Math.round(Math.abs(v * 100)),
  });
}

export const LineChart = () => (
  <Box margin={{ horizontal: 'large', vertical: 'large' }} pad="small">
    <center><Text style={{ color: 'white' }}>asdadsasdads</Text></center>
    <DataChart

      style={{ color: 'lightgrey' }}
      data={data}
      series={['date', 'percent']}
      chart={[
        { property: 'percent', thickness: 'xxsmall', type: 'line', "color": "graph-2", },
        {
          property: 'percent',
          thickness: 'medium',
          type: 'point',
          point: 'diamond',
        },
      ]}
      guide={{ x: { granularity: 'fine' }, y: { granularity: 'medium', color: 'lightgrey' } }}
      size={{ width: 'fill' }}
      detail
    />
  </Box>
);