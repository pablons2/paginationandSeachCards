import React, { Component } from 'react';
import './App.css';

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
            <div className="post" key={post.id}>
              <img src={post.cover} alt={post.title} />
              <div className="post-content">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default App;