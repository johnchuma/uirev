export let  primaryColor = '#893DF7';
export let secondaryColor = '#0AD1A1';
export let backgroundColor = '#000000';
export let textColor = '#ffffff';
export let mutedText = '#ffffff70';
export let mutedBackground = "#ffffff10"
export let waitingColor = "#6FC5E0"
export let completeColor = "yellow"
export let cardColor = "#1B1B1B"
export let colors = ["red",primaryColor,"orange","green","orange"]
export const vibrantColors = ['#2ECC40', '#FFDC00', '#0074D9', '#FF851B', '#7FDBFF', '#B10DC9', '#39CCCC', '#F012BE', '#01FF70', '#85144b', '#3D9970', '#FF4136', '#001f3f', '#AAAAAA'];

export let randomColor = ()=>{
return Math.floor(Math.random()*vibrantColors.length)
}



