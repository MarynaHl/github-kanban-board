import React from 'react'
import { Droppable } from '@hello-pangea/dnd'
import { Issue } from '../store/slices/issuesSlice'
import IssueCard from './IssueCard'
import { Box, Heading } from '@chakra-ui/react'

interface ColumnProps {
  columnId: string
  title: string
  issues: Issue[]
}

function Column({ columnId, title, issues }: ColumnProps) {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          bg="gray.100"
          p={4}
          flex="1"
          minH="400px"
        >
          <Heading size="md" mb={4}>
            {title}
          </Heading>
          {issues.map((issue, index) => (
            <IssueCard key={issue.id} issue={issue} index={index} />
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  )
}

export default Column
