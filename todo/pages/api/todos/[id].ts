import type { NextApiRequest, NextApiResponse } from 'next';
import { getTodoById, updateTodo, deleteTodo } from '../../../src/data/todos';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { title, complete } = req.body;
    const todo = getTodoById(String(id));
    if (!todo) return res.status(404).end('Todo not found');
    updateTodo(String(id), { title, complete });
    res.status(200).json({ id, title, complete });
  } else if (req.method === 'DELETE') {
    deleteTodo(String(id));
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
