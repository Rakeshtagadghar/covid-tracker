import React, { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Table, Tag, Space } from "antd";
import "antd/dist/antd.css";

am4core.useTheme(am4themes_animated);

function App(props) {
  const [covid, setCovid] = useState(null);

  useEffect(() => {
    fetch("https://api.covid19india.org/data.json")
      .then((res) => res.json())
      .then((x) => setCovid(x));
  }, []);
  console.log(covid);
  if (process.browser) {
    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = covid?.statewise;

    // Create axes

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "state";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function (dy) {
      return dy;
    });

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "active";
    series.dataFields.categoryX = "state";
    series.name = "active";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = 0.8;

    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

    const columns = [
      {
        title: "Name",
        dataIndex: "state",
        key: "state",
        render: (text) => text,
        sorter: (a, b) => a.state.length - b.state.length,
      },
      {
        title: "Active",
        dataIndex: "active",
        key: "active",
        render: (text) => text,
        sorter: {
          compare: (a, b) => a.active - b.active,
        },
      },
      {
        title: "Confirmed",
        dataIndex: "confirmed",
        key: "confirmed",
        render: (text) => text,
        sorter: {
          compare: (a, b) => a.active - b.active,
        },
      },
      {
        title: "Deaths",
        dataIndex: "deaths",
        key: "deaths",
        render: (text) => text,
        sorter: {
          compare: (a, b) => a.active - b.active,
        },
      },
      {
        title: "Recovered",
        dataIndex: "recovered",
        key: "recovered",
        render: (text) => text,
        sorter: {
          compare: (a, b) => a.active - b.active,
        },
      },
    ];

    return (
      <>
        <h1 className="text-center">Active Covid Cases India</h1>
        <Table columns={columns} dataSource={covid?.statewise} />
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
      </>
    );
  }
  return null;
}

export default App;
