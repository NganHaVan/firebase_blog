import React, { Fragment, useState, useEffect } from 'react';

import Backdrop from '../../../components/Backdrop';
import Modal from '../../Modal/Modal';
import Input from '../../Form/Input/Input';
// import Image from '../../Image/Image';
import { Post } from '../../Home/Home';

type FeedEditProps = {
  editing: boolean;
  selectedPost: Post | null;
  onCancelEdit: () => void;
  onFinishEdit: (post: {
    title: string;
    image: string;
    description: string;
  }) => void;
};

export default function FeedEdit({
  selectedPost,
  editing,
  onCancelEdit,
  onFinishEdit
}: FeedEditProps) {
  let [title, setTitle] = useState('');
  let [image, setImage] = useState('');
  let [content, setContent] = useState('');
  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title);
      setImage(selectedPost.image);
      setContent(selectedPost.description);
    }
  }, [selectedPost]);
  console.log({ title: selectedPost ? selectedPost.title : 'no title' });
  console.log({ title, image, content });
  let [formIsValid, setFormIsValid] = useState(false);

  const cancelPostChangeHandler = () => {
    setFormIsValid(false);
    setTitle('');
    setImage('');
    setContent('');
    onCancelEdit();
  };

  const acceptPostChangeHandler = () => {
    const post = {
      title,
      image,
      description: content
    };
    onFinishEdit(post);
    setFormIsValid(false);
    setTitle('');
    setImage('');
    setContent('');
  };

  const checkInputField = () => {
    if (title && image && content) {
      setFormIsValid(true);
    }
  };

  return (
    <div>
      {editing ? (
        <Fragment>
          <Backdrop onClick={cancelPostChangeHandler} />
          <Modal
            title='New Post'
            acceptEnabled={formIsValid}
            onCancelModal={cancelPostChangeHandler}
            onAcceptModal={acceptPostChangeHandler}
          >
            <form>
              <Input
                id='title'
                label='Title'
                control='input'
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  setTitle(e.target.value);
                  checkInputField();
                }}
                value={title}
                placeholder='Title here'
                type='text'
              />
              <Input
                id='image'
                label='Image'
                control='input'
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  setImage(e.target.value);
                  checkInputField();
                }}
                value={image}
                placeholder='Only accept image URL'
                type='url'
              />
              <Input
                id='content'
                label='Content'
                control='textarea'
                rows={5}
                type='textArea'
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  setContent(e.target.value);
                  checkInputField();
                }}
                value={content}
                placeholder='What do you think about the book'
              />
            </form>
          </Modal>
        </Fragment>
      ) : null}
    </div>
  );
}
