import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ServiceType } from '../index.d';
import emailService from './emailService';

const prisma = new PrismaClient();

type RegisterBodyType = {
    username: string;
    password: string;
    email: string;
    premium?: boolean;
}

const authService: ServiceType = {
    login: async (username: string, password: string) => {
        const user = await prisma.user.findFirst({ where: { username: { mode: 'insensitive', equals: username }, confirmed: true } });
        const validPassword = user?.passwordHash ? bcrypt.compareSync(password, user.passwordHash) : false;
        if (!user || !validPassword) return { error: 'Invalid credentials' };
        const token = jwt.sign({ username, email: user.email, id: user.id }, '-', { expiresIn: '1d' });
        return { data: { token } };
    },
    register: async (registerBody: RegisterBodyType) => {
        const { username, password, email, premium } = registerBody;

        const existingUsername = await prisma.user.findFirst({ where: { username: { mode: 'insensitive', equals: username } } });
        if (existingUsername) return { error: 'Username is already in use' };
        const existingEmail = await prisma.user.findFirst({ where: { email: { mode: 'insensitive', equals: email } } });
        if (existingEmail) return { error: 'Email is already in use' };

        const hashedPassword = bcrypt.hashSync(password, 10);
        try {
            await prisma.user.create({ data:
                {
                    username,
                    passwordHash: hashedPassword,
                    email,
                    premium
                }
            });
            await emailService.sendConfirmationEmail(email, username);
        } catch (e) {
            return { error: 'Something went wrong' };
        };
        return { data: 'Email sent' };
    },
    confirmRegistration: async (token: string) => {
        const payload = jwt.verify(token, '-');
        const invalidTokenError = { error: 'Invalid token' };
        if (typeof payload === 'string') return invalidTokenError;
        const { email, confirmed } = payload;
        if (!email || !confirmed) return invalidTokenError;
        const user = await prisma.user.findFirst( { where: { email: { mode: 'insensitive', equals: email } } });
        if (!user) return invalidTokenError;
        if (user.confirmed) return { error: 'Registration already confirmed' };
        try {
            await prisma.user.update({ where: { email: user.email }, data: { confirmed } });
        } catch (e) {
            return { error: 'Something went wrong' };
        };
        return { data: 'Registration confirmed' };
    },
    forgotPassword: async (email: string) => {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return { error: 'User with that email does not exist' };
        return { data: 'Email sent' };
    },
    resetPassword: async (newPassword: string, token: string) => {
        if (!token) return { error: 'Invalid token' };
        return { data: 'Password changed' };
    },
};

export default authService;
