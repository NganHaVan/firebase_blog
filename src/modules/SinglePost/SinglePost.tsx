import React, { useState, useEffect } from 'react';
import './SinglePost.css';
import { db, Timestamp } from '../../config/firebase';
import { Post } from '../Home/Home';
import Image from '../../modules/Image/Image';

type SinglePostProps = {
  title: string;
  author: string;
  date: Date;
  image: string;
  description: string;
  id: string;
};

export default function SinglePost(props: any) {
  let [post, setPost]: [Post | any, any] = useState({});
  useEffect(() => {
    db.collection('Post')
      .doc(props.match.params.id)
      .get()
      .then(doc => {
        setPost(doc.data());
      })
      .catch(err => console.log({ err }));
  }, []);
  if (!post) {
    return (
      <section className='single-post'>
        <h1>Loading</h1>
      </section>
    );
  } else {
    return (
      <section className='single-post'>
        <h1>{post.title}</h1>
        <h2>
          Created by {post.author ? post.author.displayName : ''} on{' '}
          {post.createdAt
            ? new Timestamp(post.createdAt.seconds, post.createdAt.nanoseconds)
                .toDate()
                .toLocaleDateString('eu')
            : ''}
        </h2>
        <div className='single-post__image'>
          <Image contain imageUrl={post.image} />
        </div>
        <p>{post.description}</p>
      </section>
    );
  }
}
