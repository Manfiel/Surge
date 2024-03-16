const cookieName = '222'
const cookieKey = '111'
const chavy = init()

seckill()

function seckill() {
  let url = { url: 'https://psbc.huajifen.com/gateway/merchant/order/createOrder', headers: {} }
  url.headers['Accept-Encoding'] = 'gzip, deflate, br'
  url.headers['Origin'] = 'https://n.dongqiudi.com'
  url.headers['Connection'] = 'keep-alive'
  url.headers['Accept'] = 'application/json, text/plain, */*'
  url.headers['Referer'] = 'https://psbc.huajifen.com/merchantFront/orderConfirmCup/106956/20790'
  url.headers['Host'] = 'api.dongqiudi.com'
  url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 /sa-sdk-ios/sensors-verify/ibfp.psbc.com?credit  CreditCardAppNew'
  url.headers['Accept-Language'] = 'zh-CN,zh-Hans;q=0.9'
  url.headers['Cookie'] = 'MSESSIONID=b2bd25e0-f5c9-407b-a569-a45f5162806d'
  url.body = JSON.stringify({
    "productType": "1",
    "productId": 106956,
    "promotionId": 20790,
    "buyType": "1",
    "buyQty": 1,
    "storeId": "",
    "tokenValue": "103846",
    "authCode": "ed8z",
    "smsCode": "",
    "cupBrandId": "",
    "city": "扬州市",
    "showLie": "订单详情页"
  })
  chavy.post(url, (error, response, data) => {
    let result = JSON.parse(data)
    chavy.log(result.data)
  })
  chavy.done()
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
