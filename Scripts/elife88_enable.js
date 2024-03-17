let body = JSON.parse($response.body);
if ("data" in body && Array.isArray(body.data)) {
    body.data.forEach(activity => {
        if ("awardList" in activity && Array.isArray(activity.awardList)) {
            activity.awardList.forEach(award => {
                if ("limitCode" in award) {
                    delete award.limitCode;
                }
                if ("limitMsg" in award) {
                    delete award.limitMsg;
                }
            });
        }
    });
}
$done({body: JSON.stringify(body)});
