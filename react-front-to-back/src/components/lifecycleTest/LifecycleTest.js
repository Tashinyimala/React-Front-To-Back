import React, { Component } from 'react';

class LifecycleTest extends Component {
  state = {
    title: '',
    body: ''
  };

  componentDidMount() {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';

    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          title: data.title,
          body: data.body
        })
      );
  }

  // componentWillMount() {
  //   console.log('componentWillMount');
  // }

  // componentDidUpdate() {
  //   console.log('componentDidUpdate');
  // }

  // componentWillUpdate() {
  //   console.log('componentWillUpdate');
  // }

  // componentWillReceiveProps(nextProps, nextState) {
  //   console.log('componentWillReceiveProps');
  // }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return null;
  // }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log('getSnapshotBeforeUpdate');
  // }

  render() {
    const { title, body } = this.state;

    return (
      <div>
        <h1 className="display-4 mb-2">Lifecycle, HTTP & Deployment</h1>
        <br />
        <h2>Title: {title}</h2>
        <p>Body: {body}</p>
      </div>
    );
  }
}

export default LifecycleTest;
