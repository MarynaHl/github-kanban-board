import React from 'react'
import { Droppable, Draggable } from '@hello-pangea/dnd'
import { Box, Text } from '@chakra-ui/react'
import { Issue } from '../store/slices/issuesSlice'
import IssueCard from './IssueCard'

interface ColumnProps {
  columnId: 'todo' | 'inProgress' | 'done'
  title: string
  issues: Issue[]
}

const Column: React.FC<ColumnProps> = ({ columnId, title, issues }) => {
  return (
    <Box flex="1" border="1px solid #ccc" borderRadius="md" p={2}>
      <Text fontSize="xl" mb={2}>{title}</Text>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            minH="200px"
          >
            {issues.map((issue, index) => (
              <Draggable key={issue.id} draggableId={issue.id.toString()} index={index}>
                {(providedDrag) => (
                  <Box
                    ref={providedDrag.innerRef}
                    {...providedDrag.draggableProps}
                    {...providedDrag.dragHandleProps}
                    mb={2}
                  >
                    <IssueCard issue={issue} />
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  )
}

export default Column
