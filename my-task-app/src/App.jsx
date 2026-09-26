import { useEffect, useState } from 'react';
import './App.css';

const initialTasks = [
  { id: 1, title: 'Reactのコンポーネントを復習する', done: true },
  { id: 2, title: '課題のデザインを考える', done: false },
  { id: 3, title: '買い物リストを作る', done: false },
  { id: 4, title: '本を30分読む', done: true },
  { id: 5, title: '明日の予定を確認する', done: false },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('my-task-app-tasks');
      return savedTasks ? JSON.parse(savedTasks) : initialTasks;
    } catch {
      return initialTasks;
    }
  });
  const [taskText, setTaskText] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('my-task-app-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.done;
    if (filter === 'completed') return task.done;
    return true;
  });

  const addTask = (event) => {
    event.preventDefault();
    const title = taskText.trim();
    if (!title) return;

    setTasks((currentTasks) => [
      { id: crypto.randomUUID(), title, done: false },
      ...currentTasks,
    ]);
    setTaskText('');
  };

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const deleteTask = (taskId) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  };

  const filters = [
    { value: 'all', label: 'すべて' },
    { value: 'active', label: '未完了' },
    { value: 'completed', label: '完了済み' },
  ];

  return (
    <main className="task-app">
      <section className="task-panel" aria-labelledby="page-title">
        <header className="page-header">
          <p className="eyebrow">MY DAILY LIST</p>
          <h1 id="page-title">タスク管理</h1>
          <p className="subtitle">今日やることを、ひとつずつ。</p>
        </header>

        <form className="task-form flex gap-2" onSubmit={addTask}>
          <input
            className="task-input"
            type="text"
            value={taskText}
            onChange={(event) => setTaskText(event.target.value)}
            placeholder="新しいタスクを入力..."
            aria-label="新しいタスク"
          />
          <button className="add-button inline-flex items-center justify-center" type="submit">
            追加
          </button>
        </form>

        <div className="task-summary" aria-live="polite">
          <span>タスク一覧</span>
          <span className="task-count">
            {tasks.filter((task) => !task.done).length} 件 未完了
          </span>
        </div>

        <div className="filter-list" role="group" aria-label="タスクの絞り込み">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`filter-button${filter === item.value ? ' is-selected' : ''}`}
              aria-pressed={filter === item.value}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li className="task-item" key={task.id}>
              <label className={`task-label${task.done ? ' is-completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="task-title">{task.title}</span>
              </label>
              <div className="task-actions">
                <span className={`status-dot${task.done ? ' is-done' : ''}`} aria-hidden="true" />
                <button
                  className="delete-button"
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`${task.title}を削除`}
                  title="削除"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>

        {filteredTasks.length === 0 && (
          <p className="empty-state">この条件に当てはまるタスクはありません。</p>
        )}

        <footer className="panel-footer">
          タスクはこのブラウザーに自動保存されます。
        </footer>
      </section>
    </main>
  );
}

export default App;