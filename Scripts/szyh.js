let body = JSON.parse($response.body);

let currentDate = new Date();
let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let day = days[currentDate.getUTCDay()];
let date = currentDate.getUTCDate();
let month = months[currentDate.getUTCMonth()];
let year = currentDate.getUTCFullYear();
let time = "15:30:00 GMT";

body.headers = body.headers || {};
body.headers.date = `${day}, ${date} ${month} ${year} ${time}`;

// 转换为字符串
body = JSON.stringify(body);
$done({ body });
