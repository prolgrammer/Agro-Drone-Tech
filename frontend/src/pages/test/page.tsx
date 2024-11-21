// import { saveAs } from "file-saver";
// import * as d3 from "d3";
// import ExcelJS from "exceljs";
// import { useEffect, useRef, useState } from "react";

// interface BarChartProps {
//   data: { label: string; value: number }[];
//   chartWidth?: number;
//   chartHeight?: number;
//   barHeight?: number;
//   gradientDefs?: { start: string; end: string }[];
//   fontSize?: string;
//   downloadButtonText?: string;
// }

// export const HorizontalBarChart = ({
//   data,
//   chartWidth = 700,
//   chartHeight = 500,
//   barHeight = 30,
//   gradientDefs = [
//     { start: "#003f5c", end: "#2a7db8" },
//     { start: "#58508d", end: "#8e44ad" },
//     { start: "#bc5090", end: "#e74c3c" },
//     { start: "#ff6361", end: "#ff8c42" },
//     { start: "#ffa600", end: "#ffdd27" },
//     { start: "#374c80", end: "#5478c0" },
//   ],
//   fontSize = "12px",
//   downloadButtonText = "Download Excel",
// }: BarChartProps) => {
//   const chartRef = useRef<SVGSVGElement | null>(null);
//   const [chartReady, setChartReady] = useState(false);

//   const createChart = () => {
//     if (!chartRef.current) return;
//     d3.select(chartRef.current).selectAll("*").remove();
  
//     const margin = { top: 50, right: 200, bottom: 30, left: 100 };
//     const width = chartWidth - margin.left - margin.right;
//     const height = chartHeight - margin.top - margin.bottom;
  
//     const svg = d3
//       .select(chartRef.current)
//       .attr("width", chartWidth)
//       .attr("height", chartHeight)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);
  
//     const defs = svg.append("defs");
//     gradientDefs.forEach((gradient, i) => {
//       const linearGradient = defs
//         .append("linearGradient")
//         .attr("id", `gradient-${i}`)
//         .attr("x1", "0%")
//         .attr("y1", "0%")
//         .attr("x2", "100%")
//         .attr("y2", "0%");
//       linearGradient.append("stop").attr("offset", "0%").attr("stop-color", gradient.start);
//       linearGradient.append("stop").attr("offset", "100%").attr("stop-color", gradient.end);
//     });
  
//     // Вычисляем общую сумму значений
//     const totalValue = d3.sum(data, (d) => d.value);
    
//     // Если общая сумма равна 0, установим 1, чтобы избежать деления на 0
//     const maxValue = totalValue || 1;
  
//     const xScale = d3.scaleLinear().domain([0, maxValue]).range([0, width]);
  
//     const yScale = d3
//       .scaleBand()
//       .domain(data.map((d) => d.label))
//       .range([0, height])
//       .padding(0.1);
  
//     const xAxis = d3.axisTop(xScale)
//       .tickValues(d3.range(0, maxValue + maxValue / 10, maxValue / 10))
//       .tickFormat((d) => `${Math.round((d as number) * 100 / maxValue)}%`);
  
//     svg
//       .append("g")
//       .attr("class", "x-axis")
//       .call(xAxis)
//       .selectAll("text")
//       .style("font-size", fontSize);
  
//     svg.select(".x-axis").attr("transform", `translate(0, -20)`);
  
//     svg
//       .selectAll(".bar")
//       .data(data)
//       .enter()
//       .append("rect")
//       .attr("class", "bar")
//       .attr("x", 0)
//       .attr("y", (d) => yScale(d.label) || 0)
//       .attr("width", (d) => xScale(d.value))
//       .attr("height", yScale.bandwidth())
//       .attr("fill", (_, i) => `url(#gradient-${i % gradientDefs.length})`);
  
//     svg
//       .selectAll(".value-label")
//       .data(data)
//       .enter()
//       .append("text")
//       .attr("class", "value-label")
//       .attr("x", (d) => xScale(d.value) + 5)
//       .attr("y", (d) => (yScale(d.label) || 0) + yScale.bandwidth() / 2)
//       .attr("dy", "0.35em")
//       .text((d) => `${Math.round((d.value * 100) / maxValue)}%`)
//       .style("font-size", fontSize)
//       .style("fill", "#333");
  
//     svg
//       .selectAll(".label")
//       .data(data)
//       .enter()
//       .append("text")
//       .attr("class", "label")
//       .attr("x", -10)
//       .attr("y", (d) => (yScale(d.label) || 0) + yScale.bandwidth() / 2)
//       .attr("dy", "0.35em")
//       .text((d) => d.label)
//       .style("font-size", fontSize)
//       .style("fill", "#000")
//       .style("text-anchor", "end");
  
//     // Легенда
//     const legend = svg.append("g").attr("transform", `translate(${width + 50}, 0)`);
//     data.forEach((d, i) => {
//       legend
//         .append("rect")
//         .attr("x", 0)
//         .attr("y", i * 30)
//         .attr("width", 15)
//         .attr("height", 15)
//         .attr("fill", gradientDefs[i % gradientDefs.length].end);
  
//       legend
//         .append("text")
//         .attr("x", 20)
//         .attr("y", i * 30 + 12)
//         .text(d.label)
//         .style("font-size", fontSize)
//         .style("fill", "#000");
  
//       legend
//         .append("text")
//         .attr("x", 100)
//         .attr("y", i * 30 + 12)
//         .text(d.value)
//         .style("font-size", fontSize)
//         .style("fill", "#000");
//     });
  
//     setChartReady(true);
//   };
  
  

//   useEffect(() => {
//     createChart();
//   }, [data]);

//   const downloadExcel = async () => {
//     if (!chartReady || !chartRef.current) return;

//     const svgElement = chartRef.current;
//     const svgData = new XMLSerializer().serializeToString(svgElement);

//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     const img = new Image();
//     canvas.width = chartWidth;
//     canvas.height = chartHeight;

//     img.onload = async () => {
//       ctx?.drawImage(img, 0, 0);
//       const imageData = canvas.toDataURL("image/png");

//       const workbook = new ExcelJS.Workbook();
//       const worksheet = workbook.addWorksheet("Data");

//       worksheet.columns = [
//         { header: "Label", key: "label" },
//         { header: "Value", key: "value" },
//       ];
//       worksheet.addRows(data);

//       const imageId = workbook.addImage({
//         base64: imageData,
//         extension: "png",
//       });

//       worksheet.addImage(imageId, {
//         tl: { col: 0, row: data.length + 2 },
//         ext: { width: chartWidth, height: chartHeight },
//       });

//       const buffer = await workbook.xlsx.writeBuffer();
//       const blob = new Blob([buffer], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       saveAs(blob, "BarChartDataWithGraph.xlsx");
//     };

//     img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
//   };

//   return (
//     <>
//       <button onClick={downloadExcel} disabled={!chartReady}>
//         {downloadButtonText}
//       </button>
//       <div>
//         <svg ref={chartRef}></svg>
//       </div>
//     </>
//   );
// };
