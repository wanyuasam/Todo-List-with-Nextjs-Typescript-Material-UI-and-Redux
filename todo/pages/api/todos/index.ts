import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
  } else if (req.method === 'POST') {
    const { title } = req.body;
    if (typeof title !== 'string' || title.length === 0) {
      res.status(400).json({ error: 'Invalid title' });
      return;
    }
    const todo = await prisma.todo.create({
      data: { title, complete: false },
    });
    res.status(201).json(todo);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
