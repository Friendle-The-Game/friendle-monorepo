import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({ users, message: 'Success' });
});

app.get('/api/user/:id/posts', async (req, res) => {
  const { id } = req.params;

  const posts = await prisma.post
    .findMany({
      where: {
        author: { id: parseInt(id) },
      },
    });

  res.json(posts);
});

app.listen(4000, () =>
  console.log('Server ready at: http://localhost:4000')
);