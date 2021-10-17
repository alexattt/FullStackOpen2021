// import React from 'react'

// const Notification = ({ message }) => {
//   if (message === null) {
//       return null
//   }

//   return (
//       <div className="notification">
//         {message}
//       </div>
//   )
// } 

// export default Notification

import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  // return (
  //   <div className="notification">
  //     {props.notification}
  //   </div>
  // )
  if (props.notification === "") {
    return (
      <div>
      </div>
    );
  } else {
    return (
      <div className="notification">
        {props.notification}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification