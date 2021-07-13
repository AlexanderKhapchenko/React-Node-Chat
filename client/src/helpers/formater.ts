
const formatTime = (date: Date):string => {
	let hours = date.getHours().toString();
	let minutes = date.getMinutes().toString();

	if(date.getHours() < 10) {
		hours = '0' + hours;
	}

	if(date.getMinutes() < 10) {
		minutes = '0' + minutes;
	}
	return `${hours}:${minutes}`;
}

export default formatTime;