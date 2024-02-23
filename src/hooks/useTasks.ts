import axios from 'axios';
import useSWR from 'swr';

type Task = {
  id: string;
  project_id: number;
  name: string;
  start_date: string;
  end_date: string;
  is_completed: boolean;
};

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
}

const useTasks = (url: string) => {
  const { data: tasks, mutate, error } = useSWR(url, fetcher);

  // タスクを追加する関数
  const addTask = async (task: Task) => {
    await axios.post(url, task)
      .then(() => {
        mutate();
      })
      .catch(error => console.error('タスクの追加に失敗しました', error));
  };

  const deleteTask = async (id: number) => {
    await axios.delete(`${url}/${id}`)
      .then(() => {
        mutate();
      })
      .catch(error => console.error('タスクの削除に失敗しました', error));
  }

  return { tasks, error, addTask, deleteTask };
};

export default useTasks;
