import React, { useState } from 'react'
import { Button, Input, Box, Flex, Text } from '@chakra-ui/react'
import { useAppDispatch } from '../hooks'
import { parseRepoUrl } from '../api/github'
import { setRepoKey } from '../store/slices/issuesSlice'

interface RepoInputProps {
  onLoad: (owner: string, repo: string) => void
}

const RepoInput: React.FC<RepoInputProps> = ({ onLoad }) => {
  const dispatch = useAppDispatch()
  const [url, setUrl] = useState('')

  const handleLoad = () => {
    try {
      const { owner, repo } = parseRepoUrl(url)
      dispatch(setRepoKey(`${owner}/${repo}`))
      onLoad(owner, repo)
    } catch (e) {
      alert('Please enter a valid repository URL!!')
    }
  }

  return (
    <Box mb={4}>
      <Flex gap={2}>
        <Input
          placeholder="Enter repo URL (e.g. https://github.com/facebook/react)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={handleLoad}>Load issues</Button>
      </Flex>
    </Box>
  )
}

export default RepoInput
