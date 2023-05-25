import React from 'react';
import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts} from '../../utils/load-posts'



export class Home extends React.Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const postsAndPhotos = await loadPosts();
    this.setState({ posts: postsAndPhotos });
  };

  render() {
    const { posts } = this.state;
    return (
      <section className="container">
        <Posts posts={posts}/>
      </section>
    );
  }
}

