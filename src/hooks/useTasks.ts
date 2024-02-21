import { useState } from 'react';

type Task = {
  id: number;
  name: string;
  project_id: number;
  is_completed: boolean;
  start_date: string;
  end_date: string;
};

const useTasks = (initialUrl: string) => {
  const [tasks, setTasks] = useState([]);

  // タスクリストを取得して更新
  const fetchTasks = async () => {
    const response = await fetch(initialUrl);
    const data = await response.json();
    setTasks(data);
  };

  // タスクを追加
  const addTask = async (task: Task) => {
    const response = await fetch(initialUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (response.ok) { // HTTPステータスコードが成功を示している場合
      fetchTasks(); // タスクリストを再取得して更新
    }
  };

  return { fetchTasks, tasks, addTask };
};

export default useTasks;
