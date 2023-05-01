function Post(props){
  return(
    <div className="postArea">
      <div className="headerPost">
        <h2>My first Post at CodeLeap Network!</h2>
        <div className="buttons">
          <div className="delete" onClick={props.onclickDelete}>
            <i className="fa-sharp fa-solid fa-trash"></i>
          </div>
          <div className="edit" onClick={props.onclickEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
          </div>
        </div>
      </div>
      <div className="post">
        <div className="autorData">
          <div className="autor">
            <p>{props.autor}</p>
          </div>
          <div className="date">
            <p>{props.date}</p>
          </div>
        </div>
        <div className="content">
          <p>{props.content}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;