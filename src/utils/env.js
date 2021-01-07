export default {
  isDev: process.env.NODE_ENV !== 'production', // 是开发环境
  notDev: process.env.NODE_ENV === 'production', 
  isProd: process.env.NODE_ENV === 'production', //是生产环境
  notProd: process.env.NODE_ENV !== 'production',
};
