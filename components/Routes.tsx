const Routes = {
    auth: {
        login: '/{lang}/auth/login',
        sendOtp: '/{lang}/auth/send-otp',
        validateOtp: '/{lang}/auth/validate-otp',
        validateAccount: '/{lang}/auth/validate-account',
        resetAccess: '/{lang}/auth/reset-access',
        signUp: '/{lang}/auth/sign-up',
    },
    dashboard: {
        home: '/{lang}/dashboard',
        sendMoney: '/{lang}/dashboard/send-money',
    }
}

export default Routes;