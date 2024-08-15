"use client";
import React, { useState } from 'react';
import { Checkbox, IconButton, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  onChange: (id: string, complete: boolean) => void;
  onDelete: (id: string) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ id, title, complete, onChange, onDelete }) => {
  const [checked, setChecked] = useState(complete);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    onChange(id, isChecked);
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Checkbox id={id} checked={checked} onChange={handleCheckboxChange} />
      <Typography
        htmlFor={id}
        sx={{
          textDecoration: checked ? 'line-through' : 'none',
          color: checked ? 'gray' : 'inherit',
          cursor: 'pointer',
        }}
      >
        {title}
      </Typography>
      <IconButton onClick={handleDeleteClick} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default TodoItem;
