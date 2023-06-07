import React, { Component } from 'react';
import './styles.css';
import { PostCard } from '../../components/PostCard';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import Button from '../../components/Button';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 15,
    searchValue:''

  };

  async componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const {page, postsPerPage} = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(0, postsPerPage),
      allPosts: postsAndPhotos });
  }

  loadMorePosts = ()=>{
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage );
    posts.push(...nextPosts);
    this.setState({posts, page: nextPage})
  }
  handleChange = (e) => {
    const {value} = e.target;
    this.setState({searchValue: value})
  }
  render() {
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    return (
    <section className="container">
      <input 
      onChange={this.handleChange}
      value={this.state.searchValue}
      type="search"/> 
      <Posts posts={posts} />
      
      <Button
      disabled={this.noMorePosts}
       text="Load More post"
      onClick={this.loadMorePosts}
       />
    </section>
    );
  }
}

export default Home;
