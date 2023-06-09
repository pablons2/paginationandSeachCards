import React, { Component } from 'react';
import './styles.css';
import { PostCard } from '../../components/PostCard';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { TextInput } from '../../components/TextInput';
import Button from '../../components/Button';


class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: ''
  };

  async componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(0, postsPerPage),
      allPosts: postsAndPhotos
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteresPosts = !!searchValue ? 
    allPosts.filter(post =>{
      return post.title.toLowerCase().includes(searchValue.toLowerCase());

    })
    : posts;
    return (
      <section className="container">
   
        <TextInput searchvalue={searchValue} handleChange={this.handleChange} />


        {filteresPosts.length > 0 && (
        <Posts posts={filteresPosts} />
        )}

        {filteresPosts.length === 0 && (
          <p> Não existem posts =( </p>
          )}

          {!searchValue &&(
        <Button
          disabled={noMorePosts}
          text="Load More post"
          onClick={this.loadMorePosts}
        />

        )}
      </section>
    );
  }
}

export default Home;
