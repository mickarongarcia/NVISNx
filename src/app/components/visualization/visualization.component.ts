import { Component, OnInit } from "@angular/core";
import * as d3 from 'd3';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-visualization-component',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements OnInit {
  color: string;
  dataRetrieved: boolean =  false;
  selectedChartType: string = "Donut";

  // START D3 - Pie
  // sampleData = [
  //   {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
  //   {"Framework": "React", "Stars": "150793", "Released": "2013"},
  //   {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
  //   {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
  //   {"Framework": "Ember", "Stars": "21471", "Released": "2011"}
  // ];
  sampleData = [];

  private svg;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;
  // END - D3 - Pie

  // START D3 - Donut
  private svgDonut;
  // private radius = Math.min(width, height) / 2 - margin
  private widthDonut = 750;
  private heightDonut = 600;
  private marginDonut = 50;
  // END - D3 - Donut

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get<Object[]>('https://jsonplaceholder.typicode.com/albums')
      .subscribe((data) => {
        console.log(data);
        this.sampleData = data;
      });
  }

  getColor(event) {
    this.color = event.target.value;
    console.log(this.color);
  }

  getData() {
    this.dataRetrieved = true;

    this.createSvg();
    this.createDonutSvg();

    this.createColors();

    this.drawChart();
    this.drawDonutChart();
  }

  selectType(type) {
    this.selectedChartType = type;
  }

  createSvg() {
    this.svg = d3.select("figure#pie")
      .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
      .append("g")
        .attr(
          "transform",
          "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
  }

  createDonutSvg() {
    this.svgDonut = d3.select("figure#donut")
      .append("svg")
        .attr("width", this.widthDonut)
        .attr("height", this.heightDonut)
      .append("g")
        .attr("transform", "translate(" + this.widthDonut / 2 + "," + this.heightDonut / 2 + ")");
  }

  createColors() {
    this.colors = d3.scaleOrdinal()
      .domain(this.sampleData.map(d => d.userId.toString()))
      .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
  }

  drawChart() {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.userId));

    // Build the pie chart
    this.svg
      .selectAll('pieces')
      .data(pie(this.sampleData))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d, i) => (this.colors(i)))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.sampleData))
      .enter()
      .append('text')
      .text(d => d.data.userId)
      .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 15);
  }

  drawDonutChart() {
    const pie = d3.pie<any>().value((d: any) => Number(d.userId));

    this.svgDonut
      .selectAll('whatever')
      .data(pie(this.sampleData))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(100)         // This is the size of the donut hole
        .outerRadius(this.radius)
      )
      .attr('fill', (d, i) => (this.colors(i)))
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
  }
}
