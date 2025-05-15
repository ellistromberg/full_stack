const Notification = ({ notification, type }) => {
  if (notification === null) {
    return null
  }
  
  if (type === 'error') {
    return <div className='error'>{notification}</div>
  } else {
      return <div className='ok'>{notification}</div>
  }
}

export default Notification