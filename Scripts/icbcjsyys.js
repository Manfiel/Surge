let body = JSON.parse($response.body);

if ("result" in body && "list" in body.result && Array.isArray(body.result.list)) {
    body.result.list.forEach(activity => {
        if ("awardList" in activity && Array.isArray(activity.awardList)) {
            activity.awardList.forEach(award => {
                award.bak2 = "0";
            });
        }
    });
}

$done({body: JSON.stringify(body)});
