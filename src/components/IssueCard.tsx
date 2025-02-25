import React from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { Box, Text } from '@chakra-ui/react'
import { Issue } from '../store/slices/issuesSlice'

interface IssueCardProps {
  issue: Issue
  index: number
}

function IssueCard({ issue, index }: IssueCardProps) {
  return (
    <Draggable draggableId={issue.id.toString()} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          bg="white"
          p={2}
          mb={2}
          borderRadius="md"
          boxShadow="md"
        >
          <Text fontWeight="bold">
            #{issue.number} {issue.title}
          </Text>
          <Text fontSize="sm">
            Opened {new Date(issue.created_at).toDateString()}
          </Text>
          <Text fontSize="sm">Comments: {issue.comments}</Text>
          <Text fontSize="sm">By: {issue.user.login}</Text>
        </Box>
      )}
    </Draggable>
  )
}

export default IssueCard
