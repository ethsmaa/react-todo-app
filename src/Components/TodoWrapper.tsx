import  {useState} from 'react';
import {MdDelete, MdOutlineCheckBoxOutlineBlank, MdCheckBox} from 'react-icons/md';
import {IconContext} from 'react-icons';
import styles from './todowrapper.module.css';

interface Todo {
    text: string;
    color: string;
    checked: boolean;
}

function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function TodoWrapper(): JSX.Element {
    const [allTodos, setAllTodos] = useState<Todo[]>([]);
    const [newItem, setNewItem] = useState<string>('');

    const handleNewItem = (): void => {
        const newTodo: Todo = {
            text: newItem,
            color: getRandomColor(),
            checked: false,
        };

        setAllTodos([...allTodos, newTodo]);
        setNewItem('');
    };

    const handleToggleCheck = (index: number): void => {
        const updatedTodos = [...allTodos];
        updatedTodos[index].checked = !updatedTodos[index].checked;
        setAllTodos(updatedTodos);
    };

    return (
        <div className={styles.wrapper}>
            <h1> TODO </h1>

            <input
                className={styles.todoInput}
                type="text"
                placeholder="Yeni öğe ekle"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />

            <button className={styles.addButton} onClick={handleNewItem}>
                Ekle
            </button>

            <div className={styles.todoList}>
                {allTodos.map((todo, index) => (
                    <IconContext.Provider
                        value={{className: 'icons', size: '30', color: todo.color}}
                        key={index}
                    >
                        <div
                            className={styles.todoItemContainer}
                            style={{
                                backgroundColor: `${todo.color}30`,
                                border: `1px solid ${todo.color}20`,
                            }}
                        >
                            <div className={styles.todo} onClick={() => handleToggleCheck(index)}>
                                {todo.checked ? <MdCheckBox/> : <MdOutlineCheckBoxOutlineBlank/>}
                                <h3>{todo.text}</h3>
                            </div>
                            <div>
                                <MdDelete/>
                            </div>
                        </div>
                    </IconContext.Provider>
                ))}
            </div>
        </div>
    );
}

export default TodoWrapper;
