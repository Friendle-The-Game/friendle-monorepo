import { Router } from "express";
import { FiveLetterWord, PrismaClient } from '@prisma/client';
import axios from 'axios';
import authController from './controllers/authController';
import feedbackController from './controllers/feedbackController';
import gameService from './services/gameService';

export const apiRouter = Router();
const prisma = new PrismaClient();

apiRouter.post('/register', authController.register);
apiRouter.post('/login', authController.login);
apiRouter.post('/confirm-registration', authController.confirmRegistration);
apiRouter.post('/forgot-password', authController.forgotPassword);
apiRouter.post('/reset-password', authController.resetPassword);

apiRouter.post('/send-feedback', feedbackController.handleFeedback)

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

apiRouter.get('/get-words', async (req, res) => {
  const allWords = await axios.get('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt');
  const wordsArray = allWords.data.split('\n').map((word: string) => word.trim()).filter((word: string) => word.length === 5);
  let counter = 0;
  for (let i = 0; i < wordsArray.length - 1; i++) {
    for (let j = i + 1; j < wordsArray.length; j++) {
      if (wordsArray[i].split('').some((letter: string) => wordsArray[j].includes(letter))) continue;
      console.log(wordsArray[i], wordsArray[j]);
      counter++;
    }
    if (counter > 1000000) break;
  }
  console.log(counter);

  res.json({ message: 'success' });
});

apiRouter.get('/count-words', async (req, res) => {
  const allWords = await axios.get('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt');
  const wordsArray = allWords.data.split('\n').map((word: string) => word.trim()).filter((word: string) => word.length >= 4 && word.length <= 7);
  const fourCount = wordsArray.filter((word: string) => word.length === 4).length;
  const fiveCount = wordsArray.filter((word: string) => word.length === 5).length;
  const sixCount = wordsArray.filter((word: string) => word.length === 6).length;
  const sevenCount = wordsArray.filter((word: string) => word.length === 7).length;
  console.log(4, fourCount);
  console.log(5, fiveCount);
  console.log(6, sixCount);
  console.log(7, sevenCount);
  console.log('total', wordsArray.length)

  res.json({ message: 'success' });
});