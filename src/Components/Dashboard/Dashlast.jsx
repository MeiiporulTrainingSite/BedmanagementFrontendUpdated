import React, { useEffect, useState } from "react";

import { HeatMap } from "@nivo/heatmap";

import Dashboardmort from "./Dashboardmort";
import Dash8sample from "./Dash8sample";
import PatientFlow from "./PatientFlow";
import Dash1 from "./Dash1";
import Dash6 from "./Dash6";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DashHeat from "./DashHeat";

const Dashboard = () => {
    
    return (
        
      <div style={{ display: "flex", backgroundColor: "#f5f5f5" }}>
        <div style={{ width: "80%", padding: "10px", marginLeft: "50px" }}>
          <div
            style={{
              background: "#ffff",
              padding: "10px",
              height: "50px",
              marginBottom: "10px",
              width: "105%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginLeft: "-5%",
            }}
          >
            {/* <Typography
              variant="h3"
              gutterBottom
              style={{ color: "#61AFF7", fontWeight: "bold", marginTop: "15px" }}
            >
              Good Care Hospital
            </Typography> */}
            {/* <PersonIcon style={{ fontSize: 50, marginRight: "10px" }} /> */}
          </div>
          
  

  
            {/* Create a container for "Ward B" */}
  
  
            {/* <Grid item xs={6}>
              {" "} */}
              {/* This grid item will contain the first bar chart */}
              {/* <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "400px",
                  background: "#ffff",
                  borderRadius: "30px",
                  boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                }} */}
            
                {/* <Typography variant="h6" style={{ marginTop: "50px" }}>
                  Specific time period
                </Typography>
                <ResponsiveBar
                  data={chartData}
                  indexBy="ward"
                  keys={[
                    "Occupied This Week",
                    "Occupied This Month",
                    "Available Beds",
                  ]}
                  margin={{ top: 10, right: 170, bottom: 100, left: 60 }}
                  padding={0.3}
                  axisBottom={{
                    tickRotation: -45,
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  legends={[
                    {
                      dataFrom: "keys",
                      anchor: "top-right",
                      direction: "column",
                      translateX: 120,
                      itemWidth: 100,
                      itemHeight: 20,
                    },
                  ]}
                />
              </div>
            </Grid> */}
  
            {/* <Grid item xs={6}>
              {" "} */}
              {/* This grid item will contain the second bar chart */}
              {/* <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "400px",
                  background: "#ffff",
                  borderRadius: "30px",
                  boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                }}
              > */}
                {/* <Typography variant="h6" style={{ marginTop: "50px" }}>
                  Bed Occupancy Trends
                </Typography>
                <ResponsiveBar
                  data={chartDatab}
                  keys={["Admissions"]}
                  indexBy="date"
                  margin={{ top: 10, right: 60, bottom: 100, left: 60 }}
                  padding={0.1}
                  colors={{ scheme: "category10" }}
                  axisBottom={{
                    tickRotation: -45,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Total Admission",
                    legendPosition: "middle",
                    legendOffset: -40,
                    tickValues: [0, 1, 2, 3, 4, 5],
                  }}
                  enableGridX={false}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                />
              </div>
            </Grid> */}
  
            <Grid item xs={6}>
              <Dash1></Dash1>
            </Grid>
  
            {/* <Grid item xs={6}>
              <Dashboardsan></Dashboardsan >
            </Grid> */}
  
            {/* <Grid item xs={6}>
              {" "}
              {/* This grid item will contain the second bar chart */}
              {/* <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "400px",
                  background: "#ffff",
                  borderRadius: "30px",
                  boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Typography variant="h6" style={{ marginTop: "50px" }}>
                  Display Bed Availability Board
                </Typography>
  
                <ResponsiveHeatMap
                  data={datah}
                  margin={{ top: 10, right: 90, bottom: 100, left: 90 }}
                  valueFormat={0}
                  axisTop={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -90,
                    legend: "",
                    legendOffset: 46,
                  }}
                  axisRight={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "WARD",
                    legendPosition: "middle",
                    legendOffset: 70,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "WARD",
                    legendPosition: "middle",
                    legendOffset: -72,
                  }}
                  colors={{
                    type: "diverging",
                    scheme: "red_yellow_blue",
                    diverge: 0.5,
                    minValue: 0,
                    maxValue: 10,
                  }}
                  emptyColor="#555555"
                  legends={[
                    {
                      anchor: "bottom",
                      translateX: 0,
                      translateY: 30,
                      itemCount: 10,
                      itemWidth: 100,
                      itemHeight: 12,
                      itemDirection: "left-to-right",
                      itemsSpacing: 5,
                      itemTextColor: "#333",
                      symbolSize: 12,
                      symbolShape: "square",
                    },
                  ]}
                />
              </div> */}
            {/* </Grid>  */}
            <Grid container spacing={3}>

            <Grid item xs={ 4.5} sm={1} sx={{marginTop:"500px",marginLeft:"-10px",height:"400px",width:"50px"
                      }}>
   
   
         <Dash6></Dash6>
               </Grid>
            </Grid>
            <Grid container spacing={3}>
              <div>
            <Grid item xs={ 4.5} sm={1} sx={{marginTop:"-250px",marginLeft:"79px",height:"410px",width:"290px"
                      }}>   
                    
<DashHeat></DashHeat>
</Grid>
</div>
   </Grid>
            
  
            
            
<Grid item xs={6}>
  <div>
            <Grid item xs={ 4.5} sm={1} sx={{marginTop:"-880px",marginLeft:"120px",height:"300px",width:"120px"}}>
           <PatientFlow></PatientFlow>
            </Grid>
            </div>
            </Grid>
            <Grid item xs={6}>
              <div>
             <Grid item xs={ 4.5} sm={1} sx={{marginTop:"290px",marginLeft:"780px",
             marginRight:"1000px",width:"70px",height:"100px"}}>

                <Dash8sample></Dash8sample>
                </Grid>    
                </div>
</Grid> 
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  
  
  