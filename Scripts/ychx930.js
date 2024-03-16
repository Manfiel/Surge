
let $ = new nobyda();

let verifycode = $.read('verifycode') || 'zcdm';

let cookie = $.read('CookieYC');

let user = {};

(async function() {
    await seckill();
    $.done();
})();

async function seckill() {
    const num = 100;
    const exchangeUrl = {
        url: 'https://psbc.huajifen.com/gateway/merchant/order/createOrder',
        headers: {
            'Host': 'psbc.huajifen.com',
            'Accept': 'application/json, text/plain, */*',
            'utmSource': 'mobileAppBank',
            'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
            'Content-Type': 'application/json;charset=UTF-8',
            'Origin': 'https://psbc.huajifen.com',
            'bankCode': '6100',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 /sa-sdk-ios/sensors-verify/ibfp.psbc.com?credit  CreditCardAppNew',
            'Referer': 'https://psbc.huajifen.com/merchantFront/orderConfirmCup/102298/20050',
            'Cookie': cookie
        },
        body: JSON.stringify({
            'productType': '2',
            'productId': 102298,
            'promotionId': 20050,
            'buyType': '1',
            'buyQty': 1,
            'storeId': '',
            'tokenValue': '686989',
            'authCode': verifycode,
            'smsCode': '',
            'cupBrandId': '',
            'city': '\u626C\u5DDE\u5E02',
            'showLie': '\u8BA2\u5355\u8BE6\u60C5\u9875'
        })
    };

    for (let i = 0; i < num; i++) {
        const run = await startExchange(exchangeUrl, i);
        if (run) {
            break;
        }
    }
}

async function startseckill(url, item) {
    try {
        const response = await $.post(url);
        const body = JSON.parse(response);
        console.log(`\n第${item + 1}次`);
        console.log(body);
        return true;
    } catch (error) {
        console.log(`\n抢购失败: 第${item + 1}次\n失败原因: ${error.message}`);
        return false;
    }
}
