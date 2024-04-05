// import React, { useState } from "react";
// import Grid from "@mui/material/Grid";
// import PersonIcon from "@mui/icons-material/Person";
// import Typography from "@mui/material/Typography";
// import { ResponsiveLine } from "@nivo/line";

// const initialData = {
//   patientCensus: [
//     { ward: "Ward A", time: "08:00 AM", patientCount: 2 },
//     { ward: "Ward A", time: "12:00 PM", patientCount: 5 },
//     { ward: "Ward B", time: "08:00 AM", patientCount: 3 },
//     { ward: "Ward B", time: "12:00 PM", patientCount: 6 },
//     // Add more patient census data as needed
//   ],
// };

// const Trend = () => {
//   const [data] = useState(initialData.patientCensus);

//   return (
//     <div style={{ display: "flex" }}>
//       {/* <div style={{ width: "100%", padding: "10px", marginLeft: "50px" }}> */}
//         <div
//           style={{
//             // background: "#ffff",
//             padding: "5px",
//             height: "80px",
//             marginBottom: "90px",
//             width: "200%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             marginLeft: "3%",
//             marginTop:"1200px"
//           }}
//         >
          
         
//         </div>
        
//         <Grid container spacing={1}>
//           <Grid item xs={2}>
//             <div
//               style={{
//                 height: "390px",
//                 width: "640px",
//                 background: "#ffff",
//                 borderRadius: "30px",
//                 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
//               }}
//             >
//               <ResponsiveLine
//                 data={[
//                   {
//                     id: "Ward A",
//                     color: "hsl(49, 70%, 50%)",
//                     data: data
//                       .filter((item) => item.ward === "Ward A")
//                       .map((item) => ({
//                         x: item.time,
//                         y: item.patientCount,
//                       })),
//                   },
//                   {
//                     id: "Ward B",
//                     color: "hsl(199, 70%, 50%)",
//                     data: data
//                       .filter((item) => item.ward === "Ward B")
//                       .map((item) => ({
//                         x: item.time,
//                         y: item.patientCount,
//                       })),
//                   },
//                 ]}
//                 margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//                 xScale={{ type: "point" }}
//                 yScale={{
//                   type: "linear",
//                   min: "auto",
//                   max: "auto",
//                 }}
//                 yFormat=" >-.2f"
//                 axisTop={null}
//                 axisRight={null}
//                 axisBottom={{
//                   tickSize: 5,
//                   tickPadding: 5,
//                   tickRotation: 0,
//                   legend: "Time",
//                   legendOffset: 36,
//                   legendPosition: "middle",
//                 }}
//                 axisLeft={{
//                   tickSize: 5,
//                   tickPadding: 5,
//                   tickRotation: 0,
//                   legend: "Patient Count",
//                   legendOffset: -40,
//                   legendPosition: "middle",
//                 }}
//                 pointSize={10}
//                 pointBorderWidth={2}
//                 pointBorderColor={{ from: "color" }}
//                 pointLabelYOffset={-12}
//                 useMesh={true}
//                 legends={[
//                   {
//                     anchor: "bottom-right",
//                     direction: "column",
//                     justify: false,
//                     translateX: 100,
//                     translateY: 0,
//                     itemsSpacing: 0,
//                     itemDirection: "left-to-right",
//                     itemWidth: 80,
//                     itemHeight: 20,
//                     itemOpacity: 0.75,
//                     symbolSize: 12,
//                     symbolShape: "circle",
//                     symbolBorderColor: "rgba(0, 0, 0, .5)",
//                     effects: [
//                       {
//                         on: "hover",
//                         style: {
//                           itemBackground: "rgba(0, 0, 0, .03)",
//                           itemOpacity: 1,
//                         },
//                       },
//                     ],
//                   },
//                 ]}
//               />
//             </div>
//           </Grid>
//         </Grid>
//       </div>
//     // </div>
//   );
// };

// export default Trend;

//Dash12.jsx
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ResponsiveLine } from "@nivo/line";

const Trend = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9000/paces");
        const jsonData = await response.json();
        setData(jsonData.patientCounts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '800px', height: '600px', margin: 'auto'}}>
      <h2>Patient Census Dashboard</h2>
      <Typography variant="h6" style={{ textAlign: 'center', marginBottom: '20px', fontFamily: "Montserrat",fontsize:"18px" }}>
      The line chart showing the patient census trend over a specified period
    </Typography>
      <div
        style={{
          padding: "5px",
          height: "80px",
          marginBottom: "90px",
          width: "300%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: "3%",
          marginTop: "-190px"
        }}
      ></div>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <div
            style={{
              height: "450px",
              width: "830px",
              background: "#ffff",
              borderRadius: "30px",
              boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <ResponsiveLine
              data={[
                {
                  id: "Ward A",
                  color: "hsl(49, 70%, 50%)",
                  data: data
                    .filter((item) => item.wardName === "Ward A")
                    .map((item) => ({
                      x: `${item.admissionDate}-${item.admissionTime}`,
                      y: item.patientCount,
                    })),
                },
                {
                  id: "Ward B",
                  color: "hsl(199, 70%, 50%)",
                  data: data
                    .filter((item) => item.wardName === "Ward B")
                    .map((item) => ({
                      x: `${item.admissionDate}-${item.admissionTime}`,
                      y: item.patientCount,
                    })),
                },
              ]}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
              }}
              yFormat=" >-.2f"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Time and Date",
                legendOffset: 36,
                legendPosition: "middle",
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Patient Count",
                legendOffset: -40,
                legendPosition: "middle",
              }}
              pointSize={10}
              pointBorderWidth={2}
              pointBorderColor={{ from: "color" }}
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
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Trend;

