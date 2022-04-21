import { ControllerType } from '../index.d';
import emailService from '../services/emailService';

const authController: ControllerType = {
    handleFeedback: async (req, res) => {
        const { email, subject, message } = req.body;
        if (!email || !subject || !message) {
            res.status(400).send({ error: 'Invalid request body' });
            return;
        }
        const response = await emailService.sendFeedbackEmail(email, subject, message);
        if (response.error) {
            res.status(400).send(response);
            return;
        }
        res.status(200).send(response.data);
    },
};

export default authController;