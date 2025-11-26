// const Notification = ({ message }) => {
//   if (message === null) {
//     return null
//   }

//   return <div className="error">{message}</div>
// }

// export default Notification

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return <div style={style}>render here notification...</div>
}

export default Notification