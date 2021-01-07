import { post, get } from '@/utils/http';

/**
 * **商户列表**
 * 1. lastid: 做分页 最后一项uid
 * @param {Object} params
 * @param {int} params.lastid
 * @return {Pormise}
 */
export function api_showShop(params = {}) {
    return get(`/agency/myshop`, params);
  }
  /**
   * **商户列表** 新的 图表
   * @param {Object} params
   * @param {int} params.lastid
   * @return {Pormise}
   */
  export function api_userShowShop(params = {}) {
    params = {
      ...params,
      action: 'page_user_info',
    };
    return post(`/agency/user`, params);
  }