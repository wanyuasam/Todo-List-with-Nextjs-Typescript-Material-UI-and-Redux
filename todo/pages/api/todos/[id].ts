import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { title, complete } = req.body;
    const todo = await prisma.todo.update({
      where: { id: String(id) },
      data: { title, complete },
    });
    res.status(200).json(todo);
  } else if (req.method === 'DELETE') {
    await prisma.todo.delete({ where: { id: String(id) } });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
