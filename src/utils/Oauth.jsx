const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?
client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth
?response_type=code
&redirect_uri=${GOOGLE_REDIRECT_URI}
&client_id=${GOOGLE_CLIENT_ID}
&scope=email profile
&access_type=offline`