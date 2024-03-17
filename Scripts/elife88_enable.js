let body = JSON.parse($response.body);
if ("limit" in body) {
    delete body.limit;
}
if ("limit_code" in body) {
    delete body.limit_code;
}
body = JSON.stringify(body);
$done({body});
