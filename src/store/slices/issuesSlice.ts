import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Issue {
  id: number
  number: number
  title: string
  state: 'open' | 'closed'
  assignee: { login: string } | null
  comments: number
  created_at: string
}

export interface IssuesState {
  todo: Issue[]
  inProgress: Issue[]
  done: Issue[]
  repoKey: string
}

const initialState: IssuesState = {
  todo: [],
  inProgress: [],
  done: [],
  repoKey: '',
}

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setRepoKey(state, action: PayloadAction<string>) {
      state.repoKey = action.payload
    },
    setIssues(state, action: PayloadAction<{ todo: Issue[]; inProgress: Issue[]; done: Issue[] }>) {
      const { todo, inProgress, done } = action.payload
      state.todo = todo
      state.inProgress = inProgress
      state.done = done
    },
    moveIssue(state, action: PayloadAction<{ sourceColumn: keyof Omit<IssuesState, 'repoKey'>; destColumn: keyof Omit<IssuesState, 'repoKey'>; sourceIndex: number; destIndex: number }>) {
      const { sourceColumn, destColumn, sourceIndex, destIndex } = action.payload
      const sourceList = state[sourceColumn] as Issue[]
      const destList = state[destColumn] as Issue[]
      const [movedIssue] = sourceList.splice(sourceIndex, 1)
      destList.splice(destIndex, 0, movedIssue)
    },
  },
})

export const { setRepoKey, setIssues, moveIssue } = issuesSlice.actions
export default issuesSlice.reducer
