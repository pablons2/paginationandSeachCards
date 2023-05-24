import React, { Component } from 'react';
import './App.css';
import { PostCard } from './components/PostCard';


class App extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = await fetch('https://jsonplaceholder.typicode.com/photos');
    const [posts, photos] = await Promise.all([postsResponse.json(), photosResponse.json()]);

    const postsAndPhotos = posts.map((post, index) => {
      return { ...post, cover: photos[index].url };
    });

    this.setState({ posts: postsAndPhotos });
  };

  render() {
    const { posts } = this.state;
    return (
      <section className="container">
        <div className="posts">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              body={post.body}
              id={post.id}
              cover={post.cover}
              post={post} />
          ))}
        </div>
      </section>
    );
  }
}

export default App;