import { Component, Input, OnInit } from '@angular/core';
import { NgxApexchartsModule } from 'ngx-apexcharts';

@Component({
  selector: 'app-player-skills-chart',
  standalone: true,
  imports: [NgxApexchartsModule],
  templateUrl: './player-skills-chart.component.html',
  styleUrls: ['./player-skills-chart.component.css']
})
export class PlayerSkillsChartComponent implements OnInit {
  @Input() playerSkills: any;

  chartOptions: any = {
    chart: {
      type: 'bar',
      height: 210,
      toolbar: {
        show: false,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: true
        },
        style: {
          colors: ['#000']
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 4,
        dataLabels: {
          position: 'top'
        },
        
      },
      style: {
        colors: ['#ffffff']
      }
    },
    series: [
      {
        name: 'Player Skills',
        data: []
      }
    ],
    xaxis: {
      categories: ['Ritmo', 'Tiro', 'Pase', 'Regate', 'Defensa', 'Físico'],
      
      labels: {
        style: {
          colors: '#ffffff', 
          fontSize: '14px'
        }
      }
    },
    yaxis: {

      min: 0,
      max: 100,
      labels: {
        style: {
          colors: '#ffffff', 
          fontSize: '14px'
        }
      }
    },
    grid: {
      show: false
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(0);
      },
      offsetY: 0,
      offsetX: 0,
      
    },
    fill: {
      opacity: 0.7,
      colors: ['#37023a']
    },
    stroke: {
      width: 2,
      colors: ['#37023a']
    },
    tooltip: {
      enabled: true,
      custom: function() { return ''; }
    }
  };

  ngOnInit(): void {
    if (this.playerSkills) {
      this.updateChartData();
    }
  }

  updateChartData() {
    this.chartOptions.series[0].data = [
      this.playerSkills.pace,
      this.playerSkills.shooting,
      this.playerSkills.passing,
      this.playerSkills.dribbling,
      this.playerSkills.defending,
      this.playerSkills.physic
    ];
  }
  
}
