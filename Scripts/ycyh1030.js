const $ = new Env('邮储银行');
$.verifycode = $.getdata('verifycode');
$.cookie = $.getdata('cookieYC');
$.num = $.getdata('numYC');

!(async () => {
  $.log('', `🔔 ${$.name}, 开始!`, '');
  for (let i = 1; i <= $.num; i++) {
    await seckill(i);
  }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '');
  })
  .finally(() => {
    $.msg($.name, $.subt, ''), $.log('', `🔔 ${$.name}, 结束!`, ''), $.done();
  });

function seckill(index) {
  return new Promise((resolve) => {
    const url = {
      url: 'https://psbc.huajifen.com/gateway/merchant/order/createOrder',
      headers: {},
      body: JSON.stringify({
        'productType': '1',
        'productId': 106956,
        'promotionId': 20790,
        'buyType': '1',
        'buyQty': 1,
        'storeId': '',
        'tokenValue': '686989',
        'authCode': $.verifycode,
        'smsCode': '',
        'cupBrandId': '',
        'city': '\u626C\u5DDE\u5E02',
        'showLie': '\u8BA2\u5355\u8BE6\u60C5\u9875'
      })
    };

    url.headers['Host'] = 'psbc.huajifen.com';
    url.headers['Referer'] = 'https://psbc.huajifen.com/merchantFront/orderConfirmCup/102298/20050';
    url.headers['Accept'] = 'application/json, text/plain, */*';
    url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 /sa-sdk-ios/sensors-verify/ibfp.psbc.com?credit  CreditCardAppNew';
    url.headers['utmSource'] = 'mobileAppBank';
    url.headers['Accept-Language'] = 'zh-CN,zh-Hans;q=0.9';
    url.headers['Origin'] = 'https://psbc.huajifen.com';
    url.headers['bankCode'] = '6100';
    url.headers['Content-Type'] = 'application/json;charset=UTF-8';
    url.headers['cookie'] = $.cookie;


    $.post(url, (error, response, data) => {
      try {
        if (error) throw new Error(error);
        // 直接打印响应数据
        $.log(`第 ${index} 次抢购结果：${data}`);
      } catch (e) {
        $.log(`❗️ ${$.name}, 执行失败!`, ` error = ${error || e}`, `response = ${JSON.stringify(response)}`, '');
      } finally {
        resolve();
      }
    });
  });
}

// prettier-ignore
function Env(t){this.name=t,this.logs=[],this.isSurge=(()=>"undefined"!=typeof $httpClient),this.isQuanX=(()=>"undefined"!=typeof $task),this.log=((...t)=>{this.logs=[...this.logs,...t],t?console.log(t.join("\n")):console.log(this.logs.join("\n"))}),this.msg=((t=this.name,s="",i="")=>{this.isSurge()&&$notification.post(t,s,i),this.isQuanX()&&$notify(t,s,i);const e=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t&&e.push(t),s&&e.push(s),i&&e.push(i),console.log(e.join("\n"))}),this.getdata=(t=>this.isSurge()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):void 0),this.setdata=((t,s)=>this.isSurge()?$persistentStore.write(t,s):this.isQuanX()?$prefs.setValueForKey(t,s):void 0),this.get=((t,s)=>this.send(t,"GET",s)),this.wait=((t,s=t)=>i=>setTimeout(()=>i(),Math.floor(Math.random()*(s-t+1)+t))),this.post=((t,s)=>this.send(t,"POST",s)),this.send=((t,s,i)=>{if(this.isSurge()){const e="POST"==s?$httpClient.post:$httpClient.get;e(t,(t,s,e)=>{s&&(s.body=e,s.statusCode=s.status),i(t,s,e)})}this.isQuanX()&&(t.method=s,$task.fetch(t).then(t=>{t.status=t.statusCode,i(null,t,t.body)},t=>i(t.error,t,t)))}),this.done=((t={})=>$done(t))}
