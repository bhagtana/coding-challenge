import React from 'react';
import $ from 'jQuery';
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageIfnfo: null
    }
    this.genrateImage =this.genrateImage.bind(this);
  }
  genrateImage() {
    var context = this;
    $.ajax({
      method:'GET',
      url:'/api/',
      contentType:'application/json',
      done: function(data) {
        context.setState({
          imageIfnfo: data
        })
      }
    })
  }
  render() {
    return (
      <div>
        <p>Hello From Sunny</p>
        <button onClick={this.genrateImage}>create an Image</button>
      </div>
    ) 
  } 
}