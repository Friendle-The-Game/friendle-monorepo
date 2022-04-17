const config = {
    nodemailerHost: process.env.NODEMAILER_HOST || '',
    nodemailerPort: parseInt(process.env.NODEMAILER_PORT || '465'),
    nodemailerUsername: process.env.NODEMAILER_USERNAME || '',
    nodemailerPassword: process.env.NODEMAILER_PASSWORD || '',
    restApiPort: parseInt(process.env.REST_API_PORT || '4000'),
};

export default config;
