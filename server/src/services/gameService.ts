import { FiveLetterWord, PrismaClient } from '@prisma/client';
import { ServiceType } from '../index.d';
const prisma = new PrismaClient();

const gameService: ServiceType = {

    startGame: async () =>  {
        const [{ id }]: FiveLetterWord[] = await prisma.$queryRaw`SELECT * FROM "FiveLetterWord" ORDER BY RANDOM() LIMIT 1;`;
        const game = await prisma.fiveLetterGame.create({
          data: { word: { connect: { id } } },
        });
        return({data: { gameId: game.id, message: 'Success' } });
    },
    checkGuess: async (req) => {
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
        return {data: guessWithColors};
    },

};

export default gameService;