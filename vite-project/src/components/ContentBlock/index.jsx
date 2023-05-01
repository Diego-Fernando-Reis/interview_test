function ContentBlock(props){
  return(
    <div className="newPost">
        <h3>{props.title}</h3>
        <form action="" onSubmit={props.onsubmit}>
          <label htmlFor="">Title</label>
          <input type="text" placeholder="Hello world" value={props.valueTitle} onChange={props.onchangeTitle}/>
          <label htmlFor="">Content</label>
          <textarea name="" id="" cols="30" rows="10" placeholder="Content here" value={props.valueContent} onChange={props.onchangeContent}></textarea>
          <div className="button">
            {props.children}
          </div>
        </form>
      </div>

  );
}

export default ContentBlock;