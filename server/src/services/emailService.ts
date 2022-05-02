import nodemailer from 'nodemailer';
import config from '../config';
import templateService from './templateService';

const transporter = nodemailer.createTransport({
    host: config.nodemailerHost,
    port: config.nodemailerPort,
    secure: true,
    auth: {
        user: config.nodemailerUsername,
        pass: config.nodemailerPassword,
    },
});

const sendEmail = async (from: string, to: string, subject: string, body: string, isHtml = false) => {
    const emailBody = isHtml ? { html: body } : { text: body };
    await transporter.sendMail({
        ...emailBody,
        from,
        to,
        subject,
    });
}

const emailService = {
    sendConfirmationEmail: async (email: string, username: string) => {
        const subject = 'Confirm your email address';
        const { body, isHtml } = templateService.getConfirmationEmailTemplate(email, username);
        await sendEmail(`Friendle <${config.nodemailerUsername}>`, email, subject, body, isHtml);
    },
    sendFeedbackEmail: async (email: string, subject: string, message: string) => {
        const { body, isHtml } = templateService.getFeedbackEmailTemplate(email, subject, message);
        try {
            await sendEmail(config.nodemailerUsername, config.nodemailerUsername, subject, body, isHtml);
            return { data: 'Success' };
        } catch (error) {
            return { error };
        }
    }
}

export default emailService;
