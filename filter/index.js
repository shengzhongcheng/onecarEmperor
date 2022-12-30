
export const timeAgo = (value) => {
	               var date = new Date(parseInt(value + '000'));
	               
	               //date.setTime(value);
	               
	               var month = date.getMonth() + 1;
	               
	               var hours = date.getHours();
	               
	               if (hours < 10)
	               
	               hours = "0" + hours;
	               
	               var minutes = date.getMinutes();
	               
	               if (minutes < 10)
	               
	               minutes = "0" + minutes;
	               
	               var time = date.getFullYear() + "-" + month + "-" + date.getDate() +
	               
	               " " + hours + ":" + minutes;
	               
	               return time;

	        }
	
	
	
	//时间戳的处理    

