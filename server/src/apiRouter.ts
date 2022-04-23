import { Router } from "express";
import { FiveLetterWord, PrismaClient } from '@prisma/client';
import axios from 'axios';
import authController from './controllers/authController';
import gameService from "./services/gameService";

export const apiRouter = Router();
const prisma = new PrismaClient();

apiRouter.post('/register', authController.register);
apiRouter.post('/login', authController.login);
apiRouter.post('/confirm-registration', authController.confirmRegistration);
apiRouter.post('/forgot-password', authController.forgotPassword);
apiRouter.post('/reset-password', authController.resetPassword);

apiRouter.post('/start-game', async (req, res) => {
    const response = await gameService.startGame()
    res.json(response.data);
  });

apiRouter.post('/check-guess', async(req, res) => {
  const response = await gameService.checkGuess(req)
  res.json(response.data);
  });

  
apiRouter.get('/update-words', async (req, res) => {
    const allWords = await axios.get('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt');
    const wordsArray = allWords.data.split('\n').map((word: string) => word.trim()).filter((word: string) => word.length === 5);
    const existingWords = await prisma.fiveLetterWord.findMany().then(words => words.map(({ word }) => word));
    for (const word of wordsArray) {
      if (existingWords.includes(word)) continue;
      await prisma.fiveLetterWord.create({
        data: { word },
      });
    };
  
    res.json({ message: 'success' });
  });
