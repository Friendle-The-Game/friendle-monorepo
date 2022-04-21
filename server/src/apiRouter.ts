import { Router } from "express";
import { FiveLetterWord, PrismaClient } from '@prisma/client';
import axios from 'axios';
import authController from './controllers/authController';

export const apiRouter = Router();
const prisma = new PrismaClient();

apiRouter.post('/register', authController.register);
apiRouter.post('/login', authController.login);
apiRouter.post('/confirm-registration', authController.confirmRegistration);
apiRouter.post('/forgot-password', authController.forgotPassword);
apiRouter.post('/reset-password', authController.resetPassword);

apiRouter.post('/start-game', async (req, res) => {
    const [{ id }]: FiveLetterWord[] = await prisma.$queryRaw`SELECT * FROM "FiveLetterWord" ORDER BY RANDOM() LIMIT 1;`;
    const game = await prisma.fiveLetterGame.create({
      data: { word: { connect: { id } } },
    });
    res.json({ gameId: game.id, message: 'Success' });
  });

apiRouter.post('/check-guess', async(req, res) => {
    const originalGuess: Array<string> = req.body.guess.split('');
    const correct: Array<string> = await prisma.fiveLetterGame.findFirst({ where: { id: req.body.gameId }, include: { word: true } }).then((result) => result?.word.word.split('') || []);
    const guess = [...originalGuess];
    const correctPlaces = guess.map((g, i) => {
      if (g === correct[i]) {
        correct[i] = '';
        guess[i] = '';
        return true;
      }
      return false;
    });
    const incorrectPlaces = guess.map((g) => {
      const correctIndex = correct.indexOf(g);
      if (correctIndex === -1) return false;
      correct[correctIndex] = '';
      return true;
    });
    const guessWithColors = originalGuess.map((g, i) => ({ sign: g, color: correctPlaces[i] ? 'g' : incorrectPlaces[i] ? 'y' : 'x' }));
    res.json(guessWithColors);
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
