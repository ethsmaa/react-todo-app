import React, {useState} from 'react';
import styles from './todowrapper.module.css';

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function TodoWrapper() {
    const [allTodos, setAllTodos] = useState<{ text: string; color: string }[]>([]);
    const [newItem, setNewItem] = useState<string>('');

    const handleNewItem = () => {
        const newTodo = {
            text: newItem,
            color: getRandomColor(),
        };

        setAllTodos([...allTodos, newTodo]);
        setNewItem('');
    };

    return (
        <div className={styles.wrapper}>
            <h1> TODO </h1>

            <input className={styles.todoInput}
                   type="text"
                   placeholder="add new item"
                   value={newItem}
                   onChange={(e) => setNewItem(e.target.value)}
            />

            <button className={styles.addButton} onClick={handleNewItem}>Add</button>

            <div className={styles.todoList}>
                {allTodos.map((todo, index) => (
                    <div
                        className={styles.todo}
                        key={index}
                        style={{
                            backgroundColor: `${todo.color}30`,
                            border: `1px solid ${todo.color}20`, // Border rengini ekledim
                        }}
                    >
                        <h3>{todo.text}</h3>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default TodoWrapper;
