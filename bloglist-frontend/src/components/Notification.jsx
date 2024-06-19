const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message[1] ? 'error' : 'success'}>
      {message[0]}
    </div>
  )
}

export default Notification