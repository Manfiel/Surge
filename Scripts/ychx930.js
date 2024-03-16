/*
哔哩哔哩漫画, 积分商城自动抢购脚本

脚本兼容: Surge, QuantumultX, Loon

*************************
【 抢购脚本注意事项 】:
*************************

该脚本需要使用签到脚本获取Cookie后方可使用.
默认兑换积分商城中的"积分兑换", 兑换数量为用户积分可兑换的最大值 (可于BoxJs内修改)
默认执行时间为中午12:00:10、12:00:20、12:00:30

BoxJs订阅地址: https://raw.githubusercontent.com/NobyDa/Script/master/NobyDa_BoxJs.json

*************************
【 Surge & Loon 脚本配置 】:
*************************

[Script]
cron "59 29 15 * * *" script-path=https://raw.githubusercontent.com/Manfiel/Surge/master/Scripts/ychx930.js, wake-system=1, timeout=60

*************************
【 QX 1.0.10+ 脚本配置 】 :
*************************

[task_local]
10,20,30 0 12 * * * https://raw.githubusercontent.com/Manfiel/Surge/master/Scripts/ychx930.js, tag=邮储, enabled=true

*/

// 新建一个实例对象, 把兼容函数定义到$中, 以便统一调用
let $ = new nobyda();

// 读取循环抢购次数, 默认100次; 该接口为BoxJs预留, 以便修改
let verifycode = $.read('verifycode') || '验证码';

// 读取哔哩哔哩漫画签到脚本所使用的Cookie
let cookie = $.read('CookieYC');

// 预留的空对象, 便于函数之间读取数据
let user = {};

(async function() {
    // 直接执行抢购逻辑
    await ExchangeProduct();
    $.done();
})();

function ExchangeProduct() {
    return new Promise(async (resolve) => {
        // 兑换商品数量
        const num = parseInt(productNum || (user.point / user.list.real_cost));
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
        for (let i = 0; i < parseInt(exchangeNum); i++) {
            const run = await startExchange(exchangeUrl, i);
            if (run) {
                break;
            }
        }
        resolve();
    });
}

function startExchange(url, item) {
    return new Promise((resolve) => {
        $.post(url, (error, resp, data) => {
            try {
                if (error) {
                    throw new Error(error);
                } else {
                    const body = JSON.parse(data);
                    console.log(`\n第${item + 1}次`);
                    console.log(body); // 直接打印 body 的内容
                    resolve(true);
                }
            } catch (e) {
                console.log(`\n抢购失败: 第${item + 1}次\n失败原因: ${e.message}`);
                resolve();
            }
        })
    })
}
