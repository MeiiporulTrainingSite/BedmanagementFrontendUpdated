import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Dmort from "./Dashboardmort";
import Dsani from "./Dashboardsan";
import Das12 from "./Dash12";
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';

const Dashboard = () => {
  // Step 1: Create state variables to store the data
  const [data, setData] = useState([]);

  // Step 2: Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/patient');
        const jsonData = await response.json();
        // Update the state with fetched data
        setData(jsonData.patientOutcomeMetrics);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", backgroundColor: "#f5f5f5", width: "100%" }}>
      <div style={{ width: "100%", padding: "10px" }}>
        {/* Place the common styles for all charts here */}

        <Grid container spacing={3}>
          <Grid item xs={4.5} sx={{ height: "500px", width: "200px", marginTop:"50px"}}>
            <Dmort />
          </Grid>
          <Grid item xs={4.5} sx={{ height: "500px", width: "200px", marginLeft:"900px",marginTop:"-480px"}}>
            <Dsani />
          </Grid>
          <Grid item xs={4.5} sx={{ height: "500px", width: "200px",marginTop:"220px" }}>
            <Das12 />
          </Grid>
          <Grid item xs={4.5} sx={{ height: "500px", width: "200px", marginTop:"-590px", marginLeft:"980px"}}>
            <div style={{ width: '45%', padding: '10px' }}>
              <h2 style={{ whiteSpace: 'nowrap',textOverflow: 'ellipsis', marginTop:"100px", marginLeft:'-50px' }}>Mortality Rate</h2>
              <Typography 
                variant="h6" 
                style={{ 
                  textAlign: 'center', 
                  fontFamily: "Montserrat", 
                  fontSize: "20px",
                  whiteSpace: "nowrap", // Prevent text wrapping
                  textOverflow: "ellipsis",// Add ellipsis for overflowed text
                  marginBottom: '10px',
                  marginLeft:'80px'
                }}
              >
                This chart displays the mortality rate.
              </Typography>
              <div
                style={{
                  height: '500px',
                  width: '600px',
                  marginTop:"20px",
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
                        x: new Date(item.date), // Assigning date as x value
                        y: item.mortalityRate,
                      })),
                    },
                  ]}
                  margin={{ top: 70, right: 110, bottom: 50, left: 60 }}
                  xScale={{ type: 'time', format: '%Y-%m-%d' }}
                  yScale={{ type: 'linear', min: 0, max: 'auto', stacked: true, reverse: false }}
                  axisBottom={{
                    format: value => {
                      const date = new Date(value);
                      const day = date.getDate().toString().padStart(2, '0');
                      const month = (date.getMonth() + 1).toString().padStart(2, '0');
                      const year = date.getFullYear().toString();
                      return `${day}-${month}-${year}`;
                    },
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Mortality Rate',
                    legendOffset: -50,
                    legendPosition: 'middle',
                  }}
                  pointSize={10}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'Color' }}
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
                      itemWidth: 140,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: 'circle',
                      symbolBorderColor: 'rgba(0, 0, 0, 20%)',
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
          </Grid>
          <Grid item xs={4.5} sx={{ height: "500px", width: "200px", marginTop:"40px"}}>
            <div style={{ width: '45%', padding: '10px' }}>
              <h2 style={{ whiteSpace: 'nowrap',textOverflow: 'ellipsis', marginTop:"100px" }}>
                Readmission Rate and Avg Length of Stay Over Time
              </h2>
              <Typography 
                variant="h6" 
                style={{ 
                  textAlign: 'center', 
                  fontFamily: "Montserrat", 
                  fontSize: "20px",
                  whiteSpace: "nowrap", // Prevent text wrapping
                  textOverflow: "ellipsis",// Add ellipsis for overflowed text
                  marginLeft:"20px",
                  marginBottom: '20px'
                }}
              >
                The bar charts showing patient outcome metrics like readmission rate, average length of stay.
              </Typography>
              <div
                style={{
                  height: '500px',
                  width: '820px',
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
                  axisBottom={{
                    format: value => {
                      const date = new Date(data[value].date);
                      const day = date.getDate().toString().padStart(2, '0');
                      const month = (date.getMonth() + 1).toString().padStart(2, '0');
                      const year = date.getFullYear().toString();
                      return `${day}-${month}-${year}`;
                    },
                  }}
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
                      itemWidth: 140, // Increase the width of legend items
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
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;


