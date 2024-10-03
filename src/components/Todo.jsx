// src/components/Todo.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, editTodo } from '../redux/todoSlice';
import styled from 'styled-components';

const TodoContainer = styled.div`
  padding: 50px;
  max-width: 600px;
  margin: auto;
`;

const Form = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
`;

const AddButton = styled.button`
  padding: 10px;
  background-color: #17a2b8;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #138496;
  }
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TodoItem = styled.li`
  background-color: #f1f1f1;
  margin-bottom: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  border-radius: 4px;
`;

const TodoText = styled.span`
  flex: 1;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  cursor: pointer;
`;

const EditInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 6px 12px;
  margin-left: 5px;
  background-color: ${(props) => props.bg || '#dc3545'};
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: ${(props) => props.hoverBg || '#c82333'};
  }
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  padding: 6px 12px;
  margin-right: 10px;
  background-color: ${(props) => (props.active ? '#ffc107' : '#6c757d')};
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? '#e0a800' : '#5a6268')};
  }
`;

const Todo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [todoText, setTodoText] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!todoText.trim()) {
      alert('Please enter a todo.');
      return;
    }
    dispatch(addTodo({ id: Date.now(), text: todoText, completed: false }));
    setTodoText('');
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (id, currentText) => {
    setEditingId(id);
    setEditedText(currentText);
  };

  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    if (!editedText.trim()) {
      alert('Todo cannot be empty.');
      return;
    }
    dispatch(editTodo({ id, newText: editedText }));
    setEditingId(null);
    setEditedText('');
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <TodoContainer>
      <h2>My Todos</h2>
      <Form onSubmit={handleAddTodo}>
        <Input
          type="text"
          placeholder="Add a new todo"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <AddButton type="submit">Add</AddButton>
      </Form>

      <FilterContainer>
        <FilterButton
          active={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          All
        </FilterButton>
        <FilterButton
          active={filter === 'completed'}
          onClick={() => setFilter('completed')}
        >
          Completed
        </FilterButton>
        <FilterButton
          active={filter === 'pending'}
          onClick={() => setFilter('pending')}
        >
          Pending
        </FilterButton>
      </FilterContainer>

      <TodoList>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id}>
            {editingId === todo.id ? (
              <form onSubmit={(e) => handleEditSubmit(e, todo.id)} style={{ display: 'flex', flex: 1 }}>
                <EditInput
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  autoFocus
                />
                <Button type="submit" bg="#28a745" hoverBg="#218838">
                  Save
                </Button>
                <Button type="button" onClick={() => setEditingId(null)} bg="#6c757d" hoverBg="#5a6268">
                  Cancel
                </Button>
              </form>
            ) : (
              <>
                <TodoText
                  completed={todo.completed}
                  onClick={() => handleToggle(todo.id)}
                >
                  {todo.text}
                </TodoText>
                <Button onClick={() => handleEdit(todo.id, todo.text)} bg="#ffc107" hoverBg="#e0a800">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(todo.id)}>Delete</Button>
              </>
            )}
          </TodoItem>
        ))}
      </TodoList>
    </TodoContainer>
  );
};

export default Todo;
