let todos = [
    { id: '1', title: 'Learn Next.js', complete: false },
    { id: '2', title: 'Learn TypeScript', complete: false },
  ];
  
  export const getTodos = () => todos;
  
  export const getTodoById = (id: string) => todos.find(todo => todo.id === id);
  
  export const addTodo = (todo: { id: string, title: string, complete: boolean }) => {
    todos.push(todo);
  };
  
  export const updateTodo = (id: string, updates: { title?: string, complete?: boolean }) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      Object.assign(todo, updates);
    }
  };
  
  export const deleteTodo = (id: string) => {
    todos = todos.filter(todo => todo.id !== id);
  };
  