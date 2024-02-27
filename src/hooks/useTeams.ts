import axios from 'axios';
import useSWR from 'swr';
import { TeamType } from '../../types/types';


const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
}

const useTeams = (url: string) => {
  const { data: teams, mutate, error } = useSWR(url, fetcher);

  // チームを追加する関数
  const addTeam = async (team: TeamType) => {
    await axios.post(url, team)
      .then(() => {
        mutate();
      })
      .catch(error => console.error('チームの作成に失敗しました', error));
  };

  // チームを削除する関数
  const deleteTeam = async (id: string | undefined) => {
    await axios.delete(`${url}/${id}`)
      .then(() => {
        mutate();
      })
      .catch(error => console.error('チームの削除に失敗しました', error));
  }

  // チームを更新する関数
  const updateTeam = async (team: TeamType) => {
    await axios.put(`${url}/${team.id}`, team)
      .then(() => {
        mutate();
      })
      .catch(error => console.error('チームの更新に失敗しました', error));
  }

  return { teams, error, addTeam, deleteTeam, updateTeam };
};

export default useTeams;
