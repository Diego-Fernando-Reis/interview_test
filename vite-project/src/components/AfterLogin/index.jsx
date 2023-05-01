import './style.css'
import {useEffect, useState } from 'react';
import Post from '../post';
import ContentBlock from '../ContentBlock';
import axios from 'axios';
import { selectUser } from '../../userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../userSlice';

function AfterLogin(){
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [active, setActive] = useState(true);
  const [showDeleteArea, setShowDeleteArea] = useState(false);
  const [showEditArea, setShowEditArea] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const navigateTo = useNavigate();
  const {user} = useSelector(selectUser)
  const dispatch = useDispatch()
  console.log(user);

  const handleLogout = () =>{
    dispatch(logout())
    navigateTo("/");
  }
  
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setActive(event.target.value === '' || content === '');
  }

  const handleContentChange = (event) => {
    setContent(event.target.value);
    setActive(event.target.value === '' || title === '');
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const now = new Date().toISOString(); 
    const postData = {
      title: title,
      content: content,
      username: user,
      created_datetime: now
    };

    axios
      .post('https://dev.codeleap.co.uk/careers/', postData)
      .then((response) => {
        console.log(response.data);
        setTitle('');
        setContent('');
        setPosts([response.data, ...posts]);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const handleDeleteClick = (postId) => {
    setShowDeleteArea(true);
    setPostIdToDelete(postId);
  };

  const handleCancelClick = () => {
    setShowDeleteArea(false);
  };

  const handleEditClick = () => {
    setShowEditArea(true);
  };

  const handleCancelClick2 = () => {
    setShowEditArea(false);
  };

  const handleSubmitDelete = () => {
    axios
      .delete(`https://dev.codeleap.co.uk/careers/${postIdToDelete}/`)
      .then((response) => {
        console.log(response.data);
        setShowDeleteArea(false);
        setPosts(posts.filter((post) => post.id !== postIdToDelete));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios.get('https://dev.codeleap.co.uk/careers/')
      .then(response => {
        setPosts(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return(
    <div className="AfterLogin">
      <div className="header">
        <h2>CodeLeap Network</h2>
        <h2>{user}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <ContentBlock title={`What's on your mind?`} onsubmit={handleSubmit} valueTitle={title} onchangeTitle={handleTitleChange} valueContent={content} onchangeContent={handleContentChange}>
        <button className={active ? 'disabled-button' : ''} disabled={active}>Create</button>
      </ContentBlock>


      {posts?.map(post => (
        <Post key={post.id} onclickDelete={() => handleDeleteClick(post.id)} onclickEdit={handleEditClick} autor={`@${post.username}`} date={post.created_datetime} content={post.content}/>
      ))}

      {showDeleteArea && (
        <div className="deleteArea">
          <div className="intern">
            <div className="title">
              <h3>Are you sure you want to delete this item?</h3>
            </div>
            <div className="buttons">
              <button className='cancel' onClick={handleCancelClick}>Cancel</button>
              <button className='delete' onClick={handleSubmitDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {showEditArea && (
        <div className="editArea">
          <ContentBlock title={`Edit item`} onsubmit={handleSubmit} valueTitle={title} onchangeTitle={handleTitleChange} valueContent={content} onchangeContent={handleContentChange}>
            <button onClick={handleCancelClick2}>Cancel</button>
            <button className={active ? 'disabled-button' : ''} disabled={active}>Save</button>
          </ContentBlock>
        </div>
      )}
    </div>
  )
}
export default AfterLogin;