import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const API_TOKEN = publicRuntimeConfig.TOKEN;
