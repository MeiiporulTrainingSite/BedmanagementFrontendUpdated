// import React from 'react';
// import { ResponsiveBar } from '@nivo/bar';

// const Dashboardmort= () => {
//   const clinicalOutcomeComparisonData = [
//     { ward: 'Ward A', timeInterval: 'July 2023', mortalityRate: 0.05, infectionRate: 0.08 },
//     // Add more data as needed
//   ];

//   return (
//     <div>
//       <h2>Clinical Outcome Comparison Dashboard</h2>
//       <div style={{ height: '500px' }}>
//         <ResponsiveBar
//           data={clinicalOutcomeComparisonData}
//           keys={['mortalityRate', 'infectionRate']}
//           indexBy="ward"
//           margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
//           padding={0.3}
//           colors={{ scheme: 'nivo' }}
//           borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
//           axisTop={null}
//           axisRight={null}
//           axisBottom={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: -45,
//             legend: 'Ward',
//             legendPosition: 'middle',
//             legendOffset: 32,
//           }}
//           axisLeft={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: 'Rate',
//             legendPosition: 'middle',
//             legendOffset: -40,
//           }}
//           labelSkipWidth={12}
//           labelSkipHeight={12}
//           labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
//           legends={[
//             {
//               dataFrom: 'keys',
//               anchor: 'bottom-right',
//               direction: 'column',
//               justify: false,
//               translateX: 120,
//               translateY: 0,
//               itemsSpacing: 2,
//               itemWidth: 100,
//               itemHeight: 20,
//               itemDirection: 'left-to-right',
//               itemOpacity: 0.85,
//               symbolSize: 20,
//               effects: [
//                 {
//                   on: 'hover',
//                   style: {
//                     itemOpacity: 1,
//                   },
//                 },
//               ],
//             },
//           ]}
//           animate={true}
//           motionStiffness={90}
//           motionDamping={15}
//         />
//       </div>
//     </div>
//   );
// };

// export default Dashboardmort;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ResponsiveBar } from '@nivo/bar';

// const Dashboardmort = () => {
//   const [wardStatistics, setWardStatistics] = useState([]);

//   useEffect(() => {
//     const fetchWardStatistics = async () => {
//       try {
//         // URL encode the ward ID to handle spaces properly
//         const wardId = encodeURIComponent('Ward A1');
//         const response = await axios.get(`http://localhost:9000/${wardId}/statistics`);
        
//         // Ensure the response data matches the expected structure for the Nivo Bar chart
//         const data = [{
//           wardId: response.data.wardId,
//           infectionRate: response.data.infectionRate,
//           mortalityRate: response.data.mortalityRate
//         }];
        
//         setWardStatistics(data);
//       } catch (error) {
//         console.error('Error fetching ward statistics:', error);
//       }
//     };

//     fetchWardStatistics();
//   }, []);

//   return (
//     <div>
//       <h2>Clinical Outcome Comparison Dashboard</h2>
     
//       <div  style={{
//                 height: "70vh",
//                 width: "600px",
//                 background: "#ffff",
//                 borderRadius: "30px",
//                 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
//                 marginLeft:"20px",
//                 marginTop:"30px",
//               }} >
//         <ResponsiveBar
//           data={wardStatistics}
//           keys={['infectionRate', 'mortalityRate']}
//           indexBy="wardId"
//           margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
//           padding={0.3}
//           colors={{ scheme: 'nivo' }}
//           borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
//           axisTop={null}
//           axisRight={null}
//           axisBottom={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: -45,
//             legend: 'Ward',
//             legendPosition: 'middle',
//             legendOffset: 32,
//           }}
//           axisLeft={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: 'Rate',
//             legendPosition: 'middle',
//             legendOffset: -40,
//           }}
//           labelSkipWidth={12}
//           labelSkipHeight={12}
//           labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
//           legends={[
//             {
//               dataFrom: 'keys',
//               anchor: 'bottom-right',
//               direction: 'column',
//               justify: false,
//               translateX: 120,
//               translateY: 0,
//               itemsSpacing: 2,
//               itemWidth: 100,
//               itemHeight: 20,
//               itemDirection: 'left-to-right',
//               itemOpacity: 0.85,
//               symbolSize: 20,
//               effects: [
//                 {
//                   on: 'hover',
//                   style: {
//                     itemOpacity: 1,
//                   },
//                 },
//               ],
//             },
//           ]}
//           animate={true}
//           motionStiffness={90}
//           motionDamping={15}
//         />
//       </div>
//     </div>
//   );
// };

// export default Dashboardmort;

//Dashboardmort.jsx
//New 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from "@mui/material/Typography";
import { ResponsiveBar } from '@nivo/bar';

const Dashboardmort = () => {
  const [wardStatistics, setWardStatistics] = useState([]);

  useEffect(() => {
    const fetchWardStatistics = async () => {
      try {
        const wardIds = ['Ward A1', 'Ward B1'];
        const statisticsPromises = wardIds.map(async wardId => {
          const response = await axios.get(`http://localhost:9000/${encodeURIComponent(wardId)}/statistics`);
          return {
            wardId: response.data.wardId,
            infectionRate: parseFloat(response.data.infectionRate), // Convert to number
            mortalityRate: parseFloat(response.data.mortalityRate), // Convert to number
            timeInterval: response.data.timeInterval
          };
        });

        const wardStatisticsData = await Promise.all(statisticsPromises);
        setWardStatistics(wardStatisticsData);
      } catch (error) {
        console.error('Error fetching ward statistics:', error);
      }
    };

    fetchWardStatistics();
  }, []);

  return (
    <div>
      <h2>Clinical Outcome Comparison Dashboard</h2>
      <Typography 
  variant="h6" 
  style={{ 
    textAlign: 'center', 
    fontFamily: "Montserrat", 
    fontSize: "20px",
    whiteSpace: "nowrap", // Prevent text wrapping
    textOverflow: "ellipsis",// Add ellipsis for overflowed text
    marginLeft:"70px",
    marginBottom: '20px'
  }}
>
  The bar chart showing metrics like mortality rate and infection rate for each ward.
</Typography>
      <div style={{
        height: "500px", // Adjusted height to make it scrollable
        width: "800px", // Adjusted width
        background: "#ffffff", // Changed background to white
        borderRadius: "10px", // Reduced border radius
        boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.1)", // Adjusted box shadow
        marginLeft: "20px",
        marginTop: "40px",
        overflowY: "auto", // Added overflow for vertical scrolling
      }}>
        <ResponsiveBar
          data={wardStatistics}
          keys={['infectionRate', 'mortalityRate']}
          indexBy={d => `${d.wardId} ${d.timeInterval}`} // Combine wardId and timeInterval
          margin={{ top: 50, right: 130, bottom: 85, left: 60 }}
          padding={0.3}
          colors={{ scheme: 'nivo' }}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: 'Ward - Time Interval',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Rate',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
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
                    itemOpacity: 1,
                  },
                },
              ],
            },
            {
              anchor: 'top',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: -40,
              itemsSpacing: 5,
              itemWidth: 200,
              itemHeight: 20,
              itemOpacity: 0.85,
              symbolSize: 20,
              symbolShape: 'circle',
              itemTextColor: '#000',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: '#f7fafb',
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
  );
};

export default Dashboardmort;





