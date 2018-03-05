import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions/index';//pobranie action creator do componentDidMount?

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.postsy, post => {//this.props.postsy to jest obiekt, a nie tablica (dlatego nie można napisac this.props.postsy.map), więc wykorzysujemy lodash
      //props możliwe, dzięki zastosowaniu mapDispatchToProps
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      );
    });
  }

  render() {
    //console.log(this.props.posts);
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { postsy: state.posts };//może stąd program wie, żeby korzystac ze state'ów z '../reducers/index'?
}

//zamiast pisac funkcję mapDispatchToProps: { fetchPosts: fetchPosts })(PostsIndex) - pozwala na dostęp do propsów
export default connect(mapStateToProps, { fetchPosts: fetchPosts })(PostsIndex);//connect(reduce store, {akcja})(component);
//lub możemy zapisac
//export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
