import React, { useState } from 'react'
import { Box, Link, Text } from '@chakra-ui/react'
import { fetchRepoIssues, parseRepoUrl } from './api/github'
import { useDispatch, useSelector } from 'react-redux'
import { setIssues, setRepoKey } from './store/slices/issuesSlice'
import { RootState } from './store/store'
import RepoInput from './components/RepoInput'
import KanbanBoard from './components/KanbanBoard'

function App() {
  const dispatch = useDispatch()
  const { repoKey } = useSelector((state: RootState) => state.issues)
  const [owner, setOwner] = useState('')
  const [repo, setRepo] = useState('')

  const handleLoad = async (owner: string, repo: string) => {
    setOwner(owner)
    setRepo(repo)
    const issues = await fetchRepoIssues(owner, repo)
    const todo = issues.filter(i => i.state === 'open' && !i.assignee)
    const inProgress = issues.filter(i => i.state === 'open' && i.assignee)
    const done = issues.filter(i => i.state === 'closed')
    dispatch(setIssues({ todo, inProgress, done }))
  }

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={2}>GitHub Kanban Board</Text>
      <RepoInput onLoad={handleLoad} />
      {repoKey && (
        <Box mb={4}>
          <Link href={`https://github.com/${owner}`} target="_blank" mr={4}>
            {owner} (User Profile)
          </Link>
          <Link href={`https://github.com/${owner}/${repo}`} target="_blank">
            {repo} (Repo)
          </Link>
        </Box>
      )}
      <KanbanBoard />
    </Box>
  )
}

export default App
