import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  private data = [
    {City: 'Caracas', Population: '1600000', Census: '2020'},
    {City: 'Valencia', Population: '900000', Census: '2019'},
    {City: 'Marcaibo', Population: '500000', Census: '2020'},
    {City: 'Yaracuy', Population: '100000', Census: '2019'},
    {City: 'Mérida', Population: '75000', Census: '2020'},
    {City: 'Vargas', Population: '50000', Census: '2020'}
  ];

  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
  }

  private createSvg(): void {
    this.svg = d3.select('figure#bar')
    .append('svg')
    .attr('width', this.width + (this.margin * 2))
    .attr('height', this.height + (this.margin * 2))
    .append('g')
    .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.City))
    .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append('g')
    .attr('transform', 'translate(0,' + this.height + ')')
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', 'translate(-10,0)rotate(-45)')
    .style('text-anchor', 'end');

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, 200000])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g')
    .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll('bars')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => x(d.City))
    .attr('y', d => y(d.Population))
    .attr('width', x.bandwidth())
    .attr('height', (d) => this.height - y(d.Population))
    .attr('fill', '#d04a35');
  }

}
