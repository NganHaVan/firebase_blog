import React from 'react';

import Button from '../../Button/Button';
import Image from '../../Image/Image';
import './Post.css';
import { Post } from '../../Home/Home';
import { Timestamp } from '../../../config/firebase';

interface PostProps extends Post {
  onStartEdit: () => void;
  onDelete: () => void;
}

const Feed = (props: PostProps) => {
  return (
    <article className='post'>
      <header className='post__header'>
        <h3 className='post__meta'>
          Posted by {props.author.displayName} on{' '}
          {new Timestamp(props.createdAt.seconds, props.createdAt.nanoseconds)
            .toDate()
            .toLocaleDateString('eu')}
        </h3>
        <h1 className='post__title'>{props.title}</h1>
      </header>
      <div className='post__image'>
        <Image imageUrl={props.image} contain />
      </div>
      <div className='post__content'>{props.description}</div>
      <div className='post__actions'>
        <Button mode='flat' link={`/post/${props.id}`}>
          View
        </Button>
        <Button mode='flat' onClick={props.onStartEdit}>
          Edit
        </Button>
        <Button mode='flat' design='danger' onClick={props.onDelete}>
          Delete
        </Button>
      </div>
    </article>
  );
};

export default Feed;
