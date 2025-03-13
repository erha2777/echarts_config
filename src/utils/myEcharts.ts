import * as echarts from 'echarts';
export default function myEcharts(id:string,option:any):void{
	if (document.getElementById(id) != null) {
		let myChart = echarts.init(document.getElementById(id) as HTMLElement);
		// myChart.setOption(option,true);
		myChart.setOption(option,true);
		window.addEventListener("resize", function () {
			myChart.resize();
		});
	}
}
