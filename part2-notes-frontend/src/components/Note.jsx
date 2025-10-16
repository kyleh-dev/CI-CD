const Note = ({ note, toggleImportance }) => {
  const label = note.important 
    ? 'make not important' : 'make important'
  return (
    <li>
      <div className = "personItem">{note.name} {note.number}</div>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
