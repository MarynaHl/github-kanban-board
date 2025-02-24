import axios from 'axios'
import { Issue } from '../store/slices/issuesSlice'

export function parseRepoUrl(url: string): { owner: string, repo: string } {
  const parts = url.split('github.com/')[1]?.split('/')
  if (!parts || parts.length < 2) {
    throw new Error('Incorrect repository URL')
  }
  return { owner: parts[0], repo: parts[1] }
}

export async function fetchRepoIssues(owner: string, repo: string): Promise<Issue[]> {
  const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/issues`, {
    params: {
      state: 'all',
      per_page: 50,
    },
  })
  return response.data.filter((item: any) => !item.pull_request)
    .map((item: any) => ({
      id: item.id,
      number: item.number,
      title: item.title,
      state: item.state,
      assignee: item.assignee,
      comments: item.comments,
      created_at: item.created_at,
    }))
}
