import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    padding: 5
  }
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification