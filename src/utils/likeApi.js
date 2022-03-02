import tokenService from "./tokenService";

const BASE_URL = '/api';

export function create(postId){
	return fetch(`${BASE_URL}/posts/${postId}/likes`, { // <- this end point is communicating with the create route in /routes/likes.js on express server
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + tokenService.getToken() // <- the jwt contains the user who is sending the like
		}
	}).then(res => {
		if (res.ok) return res.json();
		throw new Error('Error in creating the like, Check your express terminal!')
	})
}

export function removeLike(likesId){
	return fetch(`${BASE_URL}/likes/${likesId}`, {
		method: 'DELETE',
	    headers: {
			'Authorization': 'Bearer ' + tokenService.getToken() // <- the jwt contains the user who is sending the like
		}	
	}).then(res => {
		if(res.ok) return res.json();
		throw new Error('Error in deleting the like, check your express terminal!')
	})
}