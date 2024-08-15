import type { NextApiRequest, NextApiResponse } from 'next';
import { getTodos, addTodo } from '../../../src/data/todos';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(getTodos());
  } else if (req.method === 'POST') {
    const { id, title, complete } = req.body;
    addTodo({ id, title, complete });
    res.status(201).json({ id, title, complete });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
