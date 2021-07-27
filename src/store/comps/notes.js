import { connect } from 'react-redux'

const mapStateToProps = state => ({
  notes: state.notes
})

const Todo = ({ completed, text }) => (
  <li
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)

const TodoList = ({ notes }) => (
  <ul>
    {notes.map(note =>
      <Todo
        key={note.id}
        {...note}
      />
    )}
  </ul>
)

export default connect(mapStateToProps)(TodoList)
