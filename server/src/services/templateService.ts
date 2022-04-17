import jwt from 'jsonwebtoken';

const templateService = {
    getConfirmationEmailTemplate: (email: string, username: string) => {
        const token = jwt.sign({ email, confirmed: true }, '-', { expiresIn: '3d' });
        const cancelTrim = `<span style="display: none;">${new Date().toString()}</span>`
        return ({
            body: `
                <div style="padding: 20px; background-color: #111; color: #ccc;">
                    <span style="color: #ccc !important; font-size: 20px;">
                        Hello, ${username},
                    </span>
                    <br />
                    <span style="color: #ccc !important; font-size: 20px;">
                        Please confirm your registration on Friendle platform by clicking this URL:
                    </span>
                    <br />
                    <a style="font-weight: bold; color: #090 !important; font-size:20px;" target="_blank" href="https://friendle.xyz/confirm-registration?token=${token}">
                        Confirm registration
                    </a>
                    ${cancelTrim}
                </div>
            `,
            isHtml: true
        });
    },
};

export default templateService;