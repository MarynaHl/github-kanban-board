import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Issue } from '../store/slices/issuesSlice'

interface IssueCardProps {
  issue: Issue
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  return (
    <Box border="1px solid #999" borderRadius="md" p={2} bg="white">
      <Text fontWeight="bold">{issue.title}</Text>
      <Text>#{issue.number} opened {Math.floor((Date.now() - new Date(issue.created_at).getTime()) / (1000*60*60*24))} days ago</Text>
      <Text>Assignee: {issue.assignee?.login || 'None'}</Text>
      <Text>Comments: {issue.comments}</Text>
      <Text>State: {issue.state}</Text>
    </Box>
  )
}

export default IssueCard
