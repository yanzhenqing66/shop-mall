import {request} from './request';
 
export function getDetail(iid) {
	return getDetail ({
		url: '/detail',
		params: {
			iid
		}
	})
}