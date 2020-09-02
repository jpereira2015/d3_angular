import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit {

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
    this.drawPlot();
  }

  private createSvg(): void {
    this.svg = d3.select('figure#scatter')
    .append('svg')
    .attr('width', this.width + (this.margin * 2))
    .attr('height', this.height + (this.margin * 2))
    .append('g')
    .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawPlot(): void {
    // Add X axis
    const x = d3.scaleLinear()
    .domain([2009, 2017])
    .range([ 0, this.width ]);
    this.svg.append('g')
    .attr('transform', 'translate(0,' + this.height + ')')
    .call(d3.axisBottom(x).tickFormat(d3.format('d')));

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, 200000])
    .range([ this.height, 0]);
    this.svg.append('g')
    .call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');
    dots.selectAll('dot')
    .data(this.data)
    .enter()
    .append('circle')
    .attr('cx', d => x(d.Census))
    .attr('cy', d => y(d.Population))
    .attr('r', 7)
    .style('opacity', .5)
    .style('fill', '#69b3a2');

    // Add labels
    dots.selectAll('text')
    .data(this.data)
    .enter()
    .append('text')
    .text(d => d.Framework)
    .attr('x', d => x(d.Census))
    .attr('y', d => y(d.Population));
  }

}
