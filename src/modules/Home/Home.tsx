import React, { useState, useEffect } from 'react';
import Feed from '../Feed/Post/Post';
import Button from '../Button/Button';
import './Home.css';
import { db, Timestamp } from '../../config/firebase';
import FeedEdit from '../Feed/FeedEdit/FeedEdit';
import { checkUserLogIn } from '../../utils/user';

export interface Post {
  id: string;
  title: string;
  image: string;
  description: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  author: {
    id?: string;
    displayName: string;
    email: string;
  };
}

export default function Home() {
  let [postList, setPostList]: [Array<Post>, any] = useState([]);
  let [isEditing, setIsEditing] = useState(false);
  let [editedPost, setEditedPost]: [Post | any, any] = useState(null);
  useEffect(() => {
    db.collection('Post')
      .get()
      .then(querySnapshot => {
        let document: Array<Object> = [];
        querySnapshot.forEach(doc => {
          document.push({ ...doc.data(), id: doc.id });
        });
        setPostList(document);
      })
      .catch(err => {
        console.log({ err });
      });
  }, []);

  const onStartEdit = (postId: string) => {
    const pickedPost = postList.find(post => post.id === postId);
    setIsEditing(true);
    setEditedPost(pickedPost);
  };

  const cancelEditHandler = () => {
    setIsEditing(false);
    setEditedPost(null);
  };

  const finishEditHandler = (post: {
    title: string;
    image: string;
    description: string;
  }) => {
    setIsEditing(true);
    if (editedPost) {
      const updatedPost = {
        ...editedPost,
        title: post.title,
        image: post.image,
        description: post.description
      };
      db.collection('Post')
        .doc(editedPost.id)
        .update(updatedPost)
        .then(() => {
          setIsEditing(false);
          window.location.reload(false);
        })
        .catch(err => console.log({ err }));
    } else {
      const currentUser = checkUserLogIn();
      if (currentUser) {
        const newPost = {
          ...post,
          author: {
            id: currentUser.uid,
            displayName: currentUser.displayName || '',
            email: currentUser.email || ''
          },
          createdAt: Timestamp.fromDate(new Date())
        };
        db.collection('Post')
          .add(newPost)
          .then(docRef => {
            setIsEditing(false);
            window.location.reload(false);
          })
          .catch(err => console.log({ err }));
      } else {
        alert('Cannot add new post');
      }
    }
  };

  const onDeletePost = (postId: string) => {
    db.collection('Post')
      .doc(postId)
      .delete()
      .then(() => {
        window.location.reload(false);
      })
      .catch(err => console.log({ err }));
  };

  return (
    <div>
      <FeedEdit
        editing={isEditing}
        selectedPost={editedPost}
        onCancelEdit={cancelEditHandler}
        onFinishEdit={finishEditHandler}
      />
      <section className='feed__control'>
        <Button
          mode='raised'
          design='accent'
          onClick={() => setIsEditing(true)}
        >
          New Post
        </Button>
      </section>
      {postList.map(post => {
        return (
          <Feed
            author={post.author}
            createdAt={post.createdAt}
            description={post.description}
            image={post.image}
            id={post.id}
            title={post.title}
            onStartEdit={() => onStartEdit(post.id)}
            onDelete={() => onDeletePost(post.id)}
            key={post.id}
          />
        );
      })}
    </div>
  );
}
