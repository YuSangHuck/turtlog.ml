// const API_KEY = 'AIzaSyBG9oWjGPR9cl99uPgRQQznuiPKyt4zYvM';
const CALLBACK_NAME = 'ogInfoCallback';

let initialized = !!window.ogtagInfos;
let resolveInitPromise;
let rejectInitPromise;

const initPromise = new Promise((resolve, reject) => {
  resolveInitPromise = resolve;
  rejectInitPromise = reject;
});

export default function init() {
  console.log('init called');
  if (initialized) return initPromise;

  initialized = true;
  // window[CALLBACK_NAME] = () => resolveInitPromise(window.google);
  window[CALLBACK_NAME] = () => resolveInitPromise(window.ogtagInfos);

  const script = document.createElement('script');
  script.async = true;
  script.defer = true;
  // script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK_NAME}`;
  script.src = 'https://og-tag.s3.ap-northeast-2.amazonaws.com/og-tag.js';
  script.onerror = rejectInitPromise;
  document.querySelector('head').appendChild(script);

  console.log('return initPromise');
  return initPromise;
}
