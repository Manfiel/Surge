let body = JSON.parse($response.body);
if ("limitCode" in body) {
    delete body.limitCode;
}
if ("limitMsg" in body) {
    delete body.limitMsg;
}
body = JSON.stringify(body);
$done({body});
