import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';

const initialData = {
  patientOutcomeMetrics: [
    { mortalityRate: 0.03, readmissionRate: 0.12, avgLengthOfStay: 6.5 },
    // Add more patient outcome metrics...
  ],
};

const Dashboard = () => {
  // Step 1: Create a state variable to store the data
  const [data] = useState(initialData.patientOutcomeMetrics); // Removed unused 'setData'

  return (
    <div style={{ display: 'flex', backgroundColor: '#f5f5f5', justifyContent: 'space-around' }}>
      {/* Line chart for Mortality Rate */}
      <div style={{ width: '45%', padding: '10px' }}>
        <h2>Mortality Rate Over Time</h2>
        <div
          style={{
            height: '400px',
            background: '#ffff',
            borderRadius: '30px',
            boxShadow: '5px 10px 6px rgba(0, 0, 0, 0.2)',
          }}
        >
          <ResponsiveLine
            data={[
              {
                id: 'Mortality Rate',
                color: 'hsl(49, 70%, 50%)',
                data: data.map((item, index) => ({
                  x: index, // Assigning index as x value
                  y: item.mortalityRate,
                })),
              },
            ]}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: true,
              reverse: false,
            }}
            axisBottom={null}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Mortality Rate',
              legendOffset: -40,
              legendPosition: 'middle',
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
      {/* Bar chart for Readmission Rate and Average Length of Stay */}
      <div style={{ width: '45%', padding: '10px' }}>
        <h2>Readmission Rate and Avg Length of Stay Over Time</h2>
        <div
          style={{
            height: '400px',
            background: '#ffff',
            borderRadius: '30px',
            boxShadow: '5px 10px 6px rgba(0, 0, 0, 0.2)',
          }}
        >
          <ResponsiveBar
            data={data.map((item, index) => ({
              index, // Assigning index as x value
              'Readmission Rate': item.readmissionRate,
              'Avg Length of Stay': item.avgLengthOfStay,
            }))}
            keys={['Readmission Rate', 'Avg Length of Stay']}
            indexBy="index"
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            padding={0.3}
            colors={['#61a6f7', '#65e887']}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisBottom={null}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Value',
              legendOffset: -40,
              legendPosition: 'middle',
            }}
            enableLabel={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;