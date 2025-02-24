import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { DragDropContext } from '@hello-pangea/dnd'
import { RootState } from '../store/store'
import { moveIssue, setIssues } from '../store/slices/issuesSlice'
import Column from './Column'
import { loadIssuesState, saveIssuesState } from '../utils/localStorage'
import { useAppDispatch } from '../hooks'

const KanbanBoard: React.FC = () => {
  const dispatch = useAppDispatch()
  const { todo, inProgress, done, repoKey } = useSelector((state: RootState) => state.issues)

  useEffect(() => {
    if (repoKey) {
      const saved = loadIssuesState(repoKey)
      if (saved) {
        dispatch(setIssues(saved))
      }
    }
  }, [repoKey, dispatch])

  useEffect(() => {
    if (repoKey) {
      saveIssuesState(repoKey, { todo, inProgress, done })
    }
  }, [repoKey, todo, inProgress, done])

  const onDragEnd = (result: any) => {
    const { source, destination } = result
    if (!destination) return

    const sourceColumn = source.droppableId as keyof Omit<RootState['issues'], 'repoKey'>
    const destColumn = destination.droppableId as keyof Omit<RootState['issues'], 'repoKey'>

    if (sourceColumn === destColumn && source.index === destination.index) return

    dispatch(moveIssue({
      sourceColumn,
      destColumn,
      sourceIndex: source.index,
      destIndex: destination.index,
    }))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Column columnId="todo" title="ToDo" issues={todo} />
        <Column columnId="inProgress" title="In Progress" issues={inProgress} />
        <Column columnId="done" title="Done" issues={done} />
      </div>
    </DragDropContext>
  )
}

export default KanbanBoard
