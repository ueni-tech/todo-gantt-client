import { useState, useEffect } from 'react';

type Task = {
  id: number;
  project_id: number;
  name: string;
  start_date: string;
  end_date: string;
  is_completed: boolean;
};

const useTasks = (initialUrl: string) => {
  const [tasks, setTasks] = useState([]);

  // タスクリストを取得して更新する関数
  const fetchTasks = async () => {
    const response = await fetch(initialUrl);
    const data = await response.json();
    setTasks(data);
  };

  // コンポーネントのマウント時にタスクリストを取得
  useEffect(() => {
    fetchTasks();
  }, []);

  // タスクを追加する関数
  const addTask = async (task: Task) => {
    await fetch(initialUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    // タスク追加後にリストを再取得
    fetchTasks();
  };

  return { tasks, addTask };
};

export default useTasks;
