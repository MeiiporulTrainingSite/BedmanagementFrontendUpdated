
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
//import PersonIcon from "@mui/icons-material/Person";
import LinearProgress from "@mui/material/LinearProgress";
//import SideNavbar from "../Navbar/SideNavbar";
import axios from "axios";
//import Dash6 from "./Dash6";

import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { ResponsiveLine } from "@nivo/line";
import Dash8 from "./Dash8";

import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import Dash12 from "./Dash12";
import { ResponsiveSankey } from "@nivo/sankey";
import Button from "@mui/material/Button";
const Dashboard = () => {
  const [hospitals, setHospitals] = useState([]);
  const [totalDischarges, setTotalDischarges] = useState(0);
  const [totalAdmissions, setTotalAdmissions] = useState(0);
  const [totalTransfer, setTotalTransfer] = useState(0);
  const [chartDatab, setChartData] = useState([]);
  const [chartData, setChart] = useState([]);

  // useEffect(() => {
  //   // Fetch data from the API
  //   fetch("http://localhost:9000/bed1d")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Extract the bed status data from the API response
  //       const bedStatusData = data.bedStatusPerWard;

  //       // Transform the data to match the format expected by the chart
  //       const transformedData = Object.keys(bedStatusData).map((ward) => ({
  //         ward,
  //         "Occupied This Week": bedStatusData[ward].occupiedThisWeekBeds,
  //         "Occupied This Month": bedStatusData[ward].occupiedThisMonthBeds,
  //         "Available Beds": bedStatusData[ward].availableBeds,
  //       }));
  //       setChart(transformedData);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:9000/bedGet")
      .then((response) => {
        setHospitals(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("http://localhost:9000/Disget")
      .then((response) => {
        const total = response.data.length;
        setTotalDischarges(total);
      })
      .catch((error) => {
        console.error("Error fetching discharges:", error);
      });

    axios
      .get("http://localhost:9000/transferGet")
      .then((response) => {
        const total = response.data.length;
        setTotalTransfer(total);
      })
      .catch((error) => {
        console.error("Error fetching discharges:", error);
      });

    axios
      .get("http://localhost:9000/patientGet")
      .then((response) => {
        const total = response.data.length;
        console.log(response.data); // Calculate the total number of admissions
        setTotalAdmissions(total);
      })
      .catch((error) => {
        console.error("Error fetching admissions:", error);
      });
  }, []);

   const maximumDischargeCapacity = 100;
   const maximumAdmissionCapacity = 100;
   const maximumTransferCapacity = 100;
   const [data, setDatal] = useState([]);

   // Step 2: Use useEffect to fetch data from the API
   useEffect(() => {
     // Fetch data from the API endpoint
     fetch("http://localhost:9000/admdis")
       .then((response) => response.json())
       .then((responseData) => {
         // Assuming the API returns data in a format similar to your initial data
         setDatal(responseData.admissionsDischargesTrend);
         console.log(responseData);
       })
       .catch((error) => {
         console.error("Error fetching data:", error);
       });
   }, []);

    const [datap, setDatap] = useState([]);
    const [datas, setDatas] = useState([]);


    useEffect(() => {
      // Fetch data from your API
      fetch("http://localhost:9000/riskGet")
        .then((response) => response.json())
        .then((responseData) => {
          // Map and format your API data
          const formattedData = responseData.map((patient) => ({
            x: patient.medicalAcuity,
            y: patient.riskScore,
            patientName: patient.patientName,
            patientId: patient.patientId,
          }));
          setDatas(formattedData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
    return (
      <div style={{ background: "#f5f5f5", height: "100vh", fontFamily: "Montserrat" }}>
      <div style={{ padding: "10px", marginLeft: "2px", background: "#ffffff", borderRadius: "10px", boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)" }}>
         
      <div
          style={{
            background: "#ffff",
            padding: "10px",
            height: "90px",
            marginBottom: "10px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            {/* <Typography
              variant="h3"
              gutterBottom
              style={{ color: "#61AFF7", fontWeight: "bold", marginTop: "15px" }}
            >
              Good Care Hospital
            </Typography> */}
            {/* <PersonIcon style={{ fontSize: 50, marginRight: "10px" }} /> */}
          </div>
          <Grid container spacing={2}>
            <Grid item xs={2} style={{ textAlign: "center" }}>
              <div
                style={{
                  background: "white",
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Total Discharges
                </div>
                <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                  {totalDischarges}
                </div>
                <LinearProgress
                  variant="determinate"
                  value={(totalDischarges / maximumDischargeCapacity) * 100}
                  style={{ height: "10px", marginTop: "5px" }}
                />
              </div>
            </Grid>
  
            <Grid item xs={2} style={{ textAlign: "center" }}>
              <div
                style={{
                  background: "white",
                  padding: "10px",
                  borderRadius: "10px",
                  boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Total Admission
                </div>
                <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                  {totalAdmissions}
                </div>
                <LinearProgress
                  variant="determinate"
                  value={(totalAdmissions / maximumAdmissionCapacity) * 100}
                  style={{ height: "10px", marginTop: "5px" }}
                />
              </div>
            </Grid>
            <Grid item xs={2} style={{ textAlign: "center" }}>
              <div
                style={{
                  background: "white",
                  padding: "10px",
                  borderRadius: "10px",
                  boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Total Transfer
                </div>
                <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                  {totalTransfer}
                </div>
                <LinearProgress
                  variant="determinate"
                  value={(totalTransfer / maximumTransferCapacity) * 100}
                  style={{ height: "10px", marginTop: "5px" }}
                />
              </div>
            </Grid>
  
            {/* Create a container for "Ward A" */}
            <Grid item xs={3} style={{ textAlign: "center" }}>
              {hospitals.map((hospital) => (
                <div key={hospital.id}>
                  {hospital.wards.map((ward) => {
                    if (ward.name === "Ward A") {
                      return (
                        <div key={ward.id} style={{ marginBottom: "20px" }}>
                          <div
                            style={{
                              background: "white",
                              padding: "10px",
                              borderRadius: "10px",
                              boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                            }}
                          >
                            <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                              {ward.name} Available Beds
                            </div>
                            <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                              {" "}
                              {
                                ward.beds.filter(
                                  (bed) => bed.status === "available"
                                ).length
                              }{" "}
                              / {ward.beds.length}
                            </div>
                            <LinearProgress
                              variant="determinate"
                              value={
                                (ward.beds.filter(
                                  (bed) => bed.status === "available"
                                ).length /
                                  ward.beds.length) *
                                100
                              }
                              style={{ height: "10px", marginTop: "5px" }}
                            />
                          </div>
                        </div>
                      );
                    }
                    return null; // Return null for other wards
                  })}
                </div>
              ))}
            </Grid>
  
            {/* Create a container for "Ward B" */}
  
            <Grid item xs={3} style={{ textAlign: "center" }}>
              {hospitals.map((hospital) => (
                <div key={hospital.id}>
                  {hospital.wards.map((ward) => {
                    if (ward.name === "Ward B") {
                      return (
                        <div key={ward.id} style={{ marginBottom: "20px" }}>
                          <div
                            style={{
                              background: "white",
                              padding: "10px",
                              borderRadius: "10px",
                              boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                            }}
                          >
                            <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                              {ward.name} Available Beds
                            </div>
                            <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                              {" "}
                              {
                                ward.beds.filter(
                                  (bed) => bed.status === "available"
                                ).length
                              }{" "}
                              / {ward.beds.length}
                            </div>
                            <LinearProgress
                              variant="determinate"
                              value={
                                (ward.beds.filter(
                                  (bed) => bed.status === "available"
                                ).length /
                                  ward.beds.length) *
                                100
                              }
                              style={{ height: "10px", marginTop: "5px" }}
                            />
                          </div>
                        </div>
                      );
                    }
                    return null; // Return null for other wards
                  })}
                </div>
              ))}
            </Grid>
            
            <Grid container spacing={2}>
            <Grid item xs={6} style={{ marginRight: '90px' }}> {/* Adjust the size of this Grid item */}

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#ffff", borderRadius: "30px", boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)", width: "100%", marginTop: "30px", marginLeft: "50px" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#ffff", borderRadius: "30px", boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)", padding: "40px", width: "100%", height: "380px" }}>
                <Typography variant="h5" style={{ marginBottom: "10px", fontFamily: "Montserrat",fontSize:"22px" }}>
                  Admissions and Discharges Trend Dashboard
                </Typography>
                <Typography variant="h6" style={{ marginBottom: "20px", fontFamily: "Montserrat",fontsize:"18px" }}>
                  This graph shows total admissions and discharge count for specified period
                </Typography>
                <ResponsiveLine
                  data={[
                    {
                      id: "Admissions",
                      color: "hsl(49, 70%, 50%)",
                      data: data.map((item) => ({
                        x: item.date,
                        y: item.admissions,
                      })),
                    },
                    {
                      id: "Discharges",
                      color: "hsl(199, 70%, 50%)",
                      data: data.map((item) => ({
                        x: item.date,
                        y: item.discharges,
                      })),
                    },
                  ]}
  margin={{ top: 50, right: 110, bottom: 100, left: 110 }}
  xScale={{ type: "point" }}
  yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
  yFormat=" >-.2f"
  axisTop={null}
  axisRight={null}
  axisBottom={{
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "Date",
    legendOffset: 36,
    legendPosition: "middle",
  }}
  axisLeft={{
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "Total Admission and Discharge",
    legendOffset: -40,
    legendPosition: "middle",
  }}
  pointSize={10}
  pointColor={{ theme: "background" }}
  pointBorderWidth={2}
  pointBorderColor={{ from: "serieColor" }}
  pointLabelYOffset={-12}
  useMesh={true}
  legends={[
    {
      anchor: "bottom-right",
      direction: "column",
      justify: false,
      translateX: 100,
      translateY: 0,
      itemsSpacing: 0,
      itemDirection: "left-to-right",
      itemWidth: 80,
      itemHeight: 20,
      itemOpacity: 0.75,
      symbolSize: 12,
      symbolShape: "circle",
      symbolBorderColor: "rgba(0, 0, 0, .5)",
      effects: [{ on: "hover", style: { itemBackground: "rgba(0, 0, 0, .03)", itemOpacity: 1 } }],
    },
  ]}
  theme={{
    line: {
      strokeWidth: 4, // Adjust this value to increase the line width
    },
    crosshair: {
      line: {
        stroke: "#ff0000", // Color of the crosshair lines
        strokeWidth: 1, // Width of the crosshair lines
        strokeOpacity: 0.75, // Opacity of the crosshair lines
      },
    },
    tooltip: {
      container: {
        background: "white", // Background color of the tooltip container
        padding: "12px 16px", // Padding of the tooltip container
        borderRadius: "6px", // Border radius of the tooltip container
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)", // Box shadow of the tooltip container
      },
    },
    lineSpacing: 10, // Adjust this value to add spacing between the lines
  }}
/>

              </div>
            </div>
            <div style={{ position: "absolute", left: "120px", textAlign: "right", marginBottom: "390px", fontFamily: "Montserrat", color: "#252B42" }}>
              <Typography variant="h6" style={{ marginTop: "-40px", marginRight: "-150", fontFamily: "Montserrat", color: "#252B42", fontSize: "19px" }}>
                X axis: specified Date and Y axis: admission and discharge count
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6} style={{ marginLeft: '60px' }}> {/* Adjust the size of this Grid item and add marginLeft */}
  <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "420px", background: "#ffff", borderRadius: "50px", boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)", paddingRight: "50px", marginTop: "-10px", marginLeft: "auto" }}>
    <Typography variant="h5" style={{ marginTop: "120px", fontFamily: "Montserrat", color: "#252B42", fontSize: "22px" }}>
      Patient Risk Assessment Dashboard
    </Typography>
    <Typography variant="h6" style={{ marginTop: "20px", fontFamily: "Montserrat", color: "#252B42", fontSize: "18px" }}>
    It calculates the risk score of a patient 

    </Typography>
    <ResponsiveScatterPlot
      data={[
        {
          id: "scatterplot",
          data: datas,
        },
      ]}
      margin={{ top: 90, right: 40, bottom: 160, left: 110 }}
      xScale={{ type: "point", padding: 0.5 }}
      yScale={{ type: "linear", min: 0, max: 1 }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Medical Acuity",
        legendPosition: "middle",
        legendOffset: 36, // Decrease the offset to move the label inside
        tickTextAnchor: "start", // Align tick text at the start of the tick
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Risk Score",
        legendPosition: "middle",
        legendOffset: -70, // Decrease the offset to move the label inside
        tickTextAnchor: "end", // Align tick text at the end of the tick
      }}
      tooltip={({ node }) => (
        <div>
          Patient Name: {node.data.patientName}
          <br />
          Patient ID: {node.data.patientId}
          <br />
          Medical Acuity: {node.data.x}
          <br />
          Risk Score: {node.data.y}
          <br />
        </div>
      )}
      colors={{ scheme: "category10" }} // Adjust the color scheme here
      blendMode="multiply"
      nodeSize={10}
      nodeOpacity={0.7} // Adjust the opacity of the points
      nodeBorderWidth={2}
      nodeBorderColor={{
        from: "color",
        modifiers: [["darker", 0.7]],
      }}
    />
    {/* <div style={{ position: "absolute", bottom: "-5px", right: "30px", textAlign: "left", fontFamily: "Montserrat", color: "#252B42" }}>
      <Typography variant="h6" style={{ marginTop: "-30px", marginLeft: "90", fontFamily: "Montserrat", color: "#252B42", fontSize: "19px" }}>
        X axis: Medical Acuity  and Y axis: Risk Score 
      </Typography>
    </div> */}
    <div style={{ position: "absolute", bottom: "-5px", left: "30px", fontFamily: "Montserrat", color: "#252B42" }}>
  <Typography variant="h6" style={{ marginTop: "-30px", marginLeft: "10px", fontFamily: "Montserrat", color: "#252B42", fontSize: "19px" }}>
    X axis: Medical Acuity  and Y axis: Risk Score 
  </Typography>
</div>

  </div>
</Grid>

  {/* <Grid container spacing={2} justifyContent="flex-end">
    <Grid item xs={12} sm={6} sx={{ marginTop: "-840px", marginRight: "-70px" }}>
      <div style={{ width: '90%', height: '200px', background: 'white', borderRadius: '10px', boxShadow: '5px 10px 6px rgba(0, 0, 0, 0.2)' }}>
        <Dash8 />
      </div>
    </Grid>
  </Grid> */}
<Grid container spacing={2} justifyContent="flex-end">
  <Grid item xs={6}  sx={{ marginBottom:"-1850px", marginRight: "-60px" }}>
    {/* This grid item will contain the bed turnaround time line chart */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100px",
        width:"100%",
        background: "#ffff",
        borderRadius: "30px",
        boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
        // marginTop: "-200px", 
        marginTop: "-720px", // Adjust the marginTop value to move the container upwards
        // Adjust the marginTop value to move the chart upwards
      }}
    ><Typography variant="h5" style={{ marginTop: "-10px", fontFamily: "Montserrat", color: "#252B42", fontSize: "18px" }}>
   BedTurnaroundTime 
 </Typography>

      
      <Typography variant="h6" style={{ marginTop: "10px", fontFamily: "Montserrat", color: "#252B42", fontSize: "18px" }}>
      The dashboard shows turnaround time for each ward over time
   </Typography>
     
      <div style={{ width: '100%', height: '200px', background: 'white', borderRadius: '10px', boxShadow: '5px 10px 6px rgba(0, 0, 0, 0.2)' }}>
        <Dash8 />
      </div><div style={{ position: "absolute", bottom: "-35px", right: "180px", fontFamily: "Montserrat", color: "#252B42" }}>
  <Typography variant="h6" style={{ marginTop: "30px", marginLeft: "10px", fontFamily: "Montserrat", color: "#252B42", fontSize: "19px" }}>
    X axis: Ward with Date and Y axis:TurnaroundTime
  </Typography>
</div>

    </div>
  </Grid>
  </Grid>
</Grid>


        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
