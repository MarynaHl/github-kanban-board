import React, { useState } from 'react'
import { Button, Input, Box, Flex } from '@chakra-ui/react'
import { parseRepoUrl } from '../api/github'

interface RepoInputProps {
  onLoad: (owner: string, repo: string) => void
}

function RepoInput({ onLoad }: RepoInputProps) {
  const [url, setUrl] = useState('')

  const handleLoad = () => {
    try {
      const { owner, repo } = parseRepoUrl(url)
      onLoad(owner, repo)
    } catch {
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
