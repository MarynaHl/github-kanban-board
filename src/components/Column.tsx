import React from 'react'
import { Droppable } from '@hello-pangea/dnd'
import { Issue } from '../store/slices/issuesSlice'

interface ColumnProps {
  columnId: 'todo' | 'inProgress' | 'done'
  title: string
  issues: Issue[]
}

const Column: React.FC<ColumnProps> = ({ columnId, title, issues }) => {
  return (
    <div style={{ flex: 1, padding: '1rem', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
      <h2>{title}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {issues.map((issue, index) => (
              <IssueCard key={issue.id} issue={issue} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default Column
