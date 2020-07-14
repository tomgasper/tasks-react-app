import React from "react";
import Comment from "../../components/Comment";

import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  taskData: state.taskDetails.data,
});

const Comments = ({taskComments }) => {
  if (taskComments) {
    return ( 
      <div className='taskpage-comments-container'>
        { taskComments.slice().reverse().map( (item) => { return <Comment // CREATING SHALLOW COPY OF THE ARRAY
        author={item.author} // SO THE COMMENTS ARE SORTED BY MOST RECENT
        date={item.date}
        body={item.body}
        />}) }
      </div>
    );
  } else {
    return <div>Loading comments</div>;
  }
};

export default connect(mapStateToProps)(Comments);
