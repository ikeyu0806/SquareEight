export const MERCHANT_GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${process.env.GOOGLE_AUTH_MERCHANT_USER_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_AUTH_MERCHANT_USER_REDIRECT_URL}&scope=email&access_type=offline&approval_prompt=force`

export const END_USER_GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${process.env.GOOGLE_AUTH_END_USER_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_AUTH_END_USER_REDIRECT_URL}&scope=email&access_type=offline&approval_prompt=force`
