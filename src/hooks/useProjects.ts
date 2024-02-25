import axios from 'axios';
import useSWR from 'swr';
import { ProjectType } from '../../types/types';

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
}

const useProjects = (url: string) => {
  const { data: projects, mutate, error } = useSWR(url, fetcher);

  // プロジェクトを追加する関数
  const addProject = async (project: ProjectType) => {
    await axios.post(url, project)
      .then(() => {
        mutate();
      })
      .catch(error => console.error('プロジェクトの追加に失敗しました', error));
  };

  // プロジェクトを削除する関数
  const deleteProject = async (id: string | undefined) => {
    await axios.delete(`${url}/${id}`)
      .then(() => {
        mutate();
      })
      .catch(error => console.error('プロジェクトの削除に失敗しました', error));
  }

  // プロジェクトを更新する関数
  const updateProject = async (project: ProjectType) => {
    await axios.put(`${url}/${project.id}`, project)
      .then(() => {
        mutate();
      })
      .catch(error => console.error('プロジェクトの更新に失敗しました', error));
  }

  return { projects, error, addProject, deleteProject, updateProject };
};

export default useProjects;
