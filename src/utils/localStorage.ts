import { Issue } from '../store/slices/issuesSlice'

export function loadIssuesState(repoKey: string) {
  const saved = localStorage.getItem(`issues_state_${repoKey}`)
  if (saved) {
    return JSON.parse(saved)
  }
  return null
}

export function saveIssuesState(repoKey: string, data: {
  todo: Issue[],
  inProgress: Issue[],
  done: Issue[]
}) {
  localStorage.setItem(`issues_state_${repoKey}`, JSON.stringify(data))
}
