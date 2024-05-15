import axios from 'axios'
import { notification } from 'antd'

/**
 * 请求所需的公共参数
 */
export const DEFAULTFRTCHPORPS: any = {
  // source: '2',
  // localeStr: 'zh'
}

const ResFailTemplate = {
  success: false,
  message: 'axios request fail',
  content: '',
  errorCode: 'axios request fail',
}

export const axiosInstance = axios.create();
axiosInstance.defaults.timeout = 30000;
axiosInstance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axiosInstance.interceptors.response.use(
  res => {
    if (res.status === 401) {
      window.location.href = `${__HOSTLOGIN}${encodeURIComponent(window.location.href)}`;
    }
    if (res.status !== 200) {
      notification.error({
        message: '请求失败',
        duration: 3
      });
      return ResFailTemplate
    } else if (!res.data.success) {
      notification.error({
        message: res.data.errorTitle + '错误：' + res.data.message
      });
      return ResFailTemplate
    }
    return res.data ? res.data : ResFailTemplate;
  },
  error => {
    let errText = '';
    if (error instanceof Error) errText = error.toString();
    if (error?.response?.status == 401) {
      notification.error({
        message: '登录状态失效，请重新登录！',
        duration: 3,
        onClose: () => {
          window.location.href = `${__HOSTLOGIN}${encodeURIComponent(window.location.href)}`;
        }
      });
    } else if (errText.indexOf('timeout') > -1) {
      notification.error({
        message: '请求超时，请刷新页面重新发起请求。',
        duration: 5
      });
      return ResFailTemplate
    } else {
      notification.error({
        message: '异常：' + error
      });
      return ResFailTemplate
    }
  }
);

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  function(config: any) {
    // 给request请求加上固定参数
    if (
      config.url.indexOf('/yip_pub/') > -1 ||
      config.url.indexOf('/yip_pub_vcp/upload') > -1 ||
      config.url.indexOf('/yip_pub_shop/') > -1 ||
      config.url.indexOf('/yip_pub_erp/') > -1
      // ||
      // config.url.indexOf('/estimateExport/') > -1
    ) {
      return config;
    }
    if (config.data) {
      const keys = Object.keys(DEFAULTFRTCHPORPS);
      keys.forEach(item => (config.data[item] ? '' : (config.data[item] = DEFAULTFRTCHPORPS[item])));
    } else {
      config.data = Object.assign({}, DEFAULTFRTCHPORPS);
    }
    config.data = [config.data];
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default function(config: any) {
  if (config.errorTitle) {
    if (!config.transformResponse) {
      config.transformResponse = [];
    }
    config.transformResponse.push((data: string) => ({
      ...JSON.parse(data),
      errorTitle: config.errorTitle
    }));
  }

  return axiosInstance(config).catch(function(res) {
    return res;
  });
}
