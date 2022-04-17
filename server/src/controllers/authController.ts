import { ControllerType } from '../index.d';
import authService from '../services/authService';

const authController: ControllerType = {
    register: async (req, res) => {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            res.status(400).send({ error: 'Invalid request body' });
            return;
        }
        const response = await authService.register(req.body);
        if (response.error) {
            res.status(400).send(response);
            return;
        }
        res.status(202).send(response.data);
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(403).send({ error: 'Invalid credentials' });
            return;
        }
        const response = await authService.login(username, password);
        if (response.error) {
            res.status(403).send(response);
            return;
        }
        res.status(200).send(response.data);
    },
    confirmRegistration: async (req, res) => {
      const { token } = req.body;
      if (!token) {
          res.status(403).send({ error: 'No token in request body' });
          return;
      }
      const response = await authService.confirmRegistration(token);
      if (response.error) {
          res.status(403).send(response.data);
          return;
      }
      res.status(200).send(response.data);
    },
    forgotPassword: async (req, res) => {
        const response = await authService.forgotPassword(req.body.email);
        res.send(response.data);
    },
    resetPassword: async (req, res) => {
        const response = await authService.resetPassword(req.body.newPassword, req.body.token);
        res.send(response.data);
    },
};

export default authController;