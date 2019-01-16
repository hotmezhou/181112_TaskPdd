/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'
const BASE_DDURL = ''

// 测试、获取PDD-API商品信息
export const reqGoods = () => ajax(BASE_URL+'/v5/goods/328915476')

// 发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_DDURL+'/api/v1/sms/send', {phone}, 'POST')
// 手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASE_DDURL+'/api/v1/smsLogin', {phone, code}, 'POST')
// 用户名密码登陆
export const reqPwdLogin = (phone, pwd) => ajax(BASE_DDURL+'/api/v1/pwdLogin', {phone, pwd}, 'POST')
// 获取用户账户相关资料
export const reqMyBuyerAccount = () => ajax(BASE_DDURL+'/api/v1/myBuyerAccount')
// 验证token获取指定用户信息
export const reqUserInfo = () => ajax(BASE_DDURL+'/api/v1/userInfo')
// 用户登出
export const reqLogout = () => ajax(BASE_DDURL+'/api/v1/logout')


/*任务中心*/
// 获取任务中心列表
export const reqTaskList = (limit, page) => ajax(BASE_DDURL+'/api/v1/taskList',{limit,page})
// 获取买手任务订单 状态分类总数
export const reqMyOrderCounts = () => ajax(BASE_DDURL+'/api/v1/myOrderCounts')
// 获取买手任务订单列表
export const reqMyOrderList = (limit,page,status) => ajax(BASE_DDURL+'/api/v1/myOrderList',{limit,page,status})
// 发起接单请求 reqSendTakeTask
export const reqSendTakeTask = (pddTaskId) => ajax(BASE_DDURL+'/api/v1/takeTask',{pddTaskId},'POST')
// 获取买手指定订单详情
export const reqOrderDetail = (orderId) => ajax(BASE_DDURL+'/api/v1/myTaskDetail',{orderId},'POST')

/*订单操作*/
// 1、提交Pdd订单信息
export const reqPddOrderMsg = (pddOrderNumber, pddOrderConsignee, orderId) => ajax(BASE_DDURL+'/api/v1/sendPddOrderMsg',{pddOrderNumber, pddOrderConsignee, orderId},'POST')
// 修改已提交的订单信息
export const reqUpdatePddOrderMsg = (pddOrderNumber, pddOrderConsignee, orderId) => ajax(BASE_DDURL+'/api/v1/updatePddOrderMsg',{pddOrderNumber, pddOrderConsignee, orderId},'POST')
// 2、买手确认签收
export const reqSignOrder = (orderId) => ajax(BASE_DDURL+'/api/v1/signOrder',{orderId},'POST')
// 买手取消订单
export const reqCancelOrder = (orderId) => ajax(BASE_DDURL+'/api/v1/cancelOrder',{orderId},'POST')


/*获取记录信息*/
//1、获取账单记录
export const reqRecordBill = (limit, page) =>ajax(BASE_DDURL+'/api/v1/getRecordBillList',{limit, page},'POST')
//2、获取充值记录
export const reqRecordRecharge = (limit, page) =>ajax(BASE_DDURL+'/api/v1/getRecordRechargeList',{limit, page},'POST')
//3、获取提现记录
export const reqRecordCash = (limit, page) =>ajax(BASE_DDURL+'/api/v1/getRecordCashList',{limit, page},'POST')

/*用户提现申请*/
export const reqCash = (money) =>ajax(BASE_DDURL+'/api/v1/cash',{money},'POST')


// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE_URL+'/index_category')
// 3、根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax(BASE_URL+'/shops', {longitude, latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL+'/search_shops', {geohash, keyword})
