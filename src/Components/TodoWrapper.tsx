import {useState} from 'react';
import {MdDelete, MdOutlineCheckBoxOutlineBlank, MdCheckBox} from 'react-icons/md';
import {IconContext} from 'react-icons';
import styles from './todowrapper.module.css';
import 'animate.css';
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
    const [showCompleted, setShowCompleted] = useState<boolean>(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const handleNewItem = (): void => {

        if (!newItem.trim()) {
            return;
        }
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

        if (updatedTodos[index].checked) {
            setTimeout(() => {
                const filteredTodos = allTodos.filter((todo, i) => i !== index);
                setAllTodos(filteredTodos);
            }, 500);
        }

    };


    const handleDelete = (index: number): void => {
        const updatedTodos = [...allTodos];
        updatedTodos.splice(index, 1);
        setAllTodos(updatedTodos);
        console.log(allTodos);
    }

    return (
        <div className={styles.wrapper}>
            <h1 className="animate__animated animate__pulse">TODO</h1>
            <input
                className={styles.todoInput}
                type="text"
                placeholder="add new todo..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />

            <button className={styles.Button} onClick={handleNewItem}>
                add
            </button>

            <div className={styles.bottomBtn}>
                <button
                    className={`${styles.Button} ${showCompleted ? '' : styles.activeButton}`}
                    onClick={() => setShowCompleted(false)}
                >
                    working on
                </button>
                <button
                    className={`${styles.Button} ${showCompleted ? styles.activeButton : ''}`}
                    onClick={() => setShowCompleted(true)}
                >
                    completed
                </button>
            </div>


            <div className={styles.todoList}>

                {

                    !showCompleted &&
                    allTodos.map((todo, index) => (
                        <IconContext.Provider
                            value={{className: 'icons', size: '30', color: todo.color}}
                            key={index}
                        >
                            <div
                                className={`${styles.todoItemContainer} ${hoveredIndex === index ? 'animate__animated animate__pulse' : ''}`}
                                style={{
                                    backgroundColor: `${todo.color}30`,
                                    border: `1px solid ${todo.color}20`,
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className={styles.todo} onClick={() => handleToggleCheck(index)}>
                                    {todo.checked ? <MdCheckBox/> : <MdOutlineCheckBoxOutlineBlank />}
                                    <h3>{todo.text}</h3>
                                </div>
                                <div>
                                    <MdDelete onClick={() => handleDelete(index)}/>
                                </div>
                            </div>
                        </IconContext.Provider>
                    ))}
            </div>


        </div>
    );
}

export default TodoWrapper;
