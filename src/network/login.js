import {request} from "@/network/index.js";

export function getLoginStatus(){
	return request({
		url:`/login/status`
	})
}

export function phoneLogin(data){
	return request({
		url:'/login/cellphone',
		method:'POST',
		data
	})
}


export function getKey(){
	return request({
		url:'/login/qr/key',
		params:{
			timestamp:Date.now()
		}
	})
}


export function createLogin(key){
	return request({
		url:'/login/qr/create',
		params:{
			key,
			timestamp:Date.now()
		}
	})
}


export function checkLogin(key){
	return request({
		url:`/login/qr/check`,
		params:{
			key,
			timestamp:Date.now()
		}
	})
}

export function getInfo(){
	return request({
		url:`/user/account`
	})
}

export function getLogout(){
	return request({
		url:`/logout`
	})
}
