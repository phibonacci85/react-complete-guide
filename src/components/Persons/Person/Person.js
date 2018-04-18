import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withClass from '../../../hoc/withClass';
import Auxiliary from '../../../hoc/Auxiliary';
import classes from './Person.css';

class Person extends Component {
  constructor (props) {
    super(props);
    console.log('[Person.js] Inside constructor', props);
  }

  componentWillMount () {
    console.log('[Person.js] Inside componentWillMount');
  }

  componentDidMount () {
    console.log('[Person.js] Inside componentDidMount');
    if(this.props.position === 0) {
      this.inputElement.focus();
    }
  }

  render () {
    console.log('[Person.js] Inside render');
    return (
      <Auxiliary>
        <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old</p>
        <p>{this.props.children}</p>
        <input
          ref={(inp) => { this.inputElement = inp; }}
          type="text"
          onChange={this.props.changed}
          value={this.props.name}/>
      </Auxiliary>
    );
    // return [
    //   <p
    //     key="1"
    //     onClick={this.props.click}>I'm {this.props.name} and I
    //     am {this.props.age} years old</p>,
    //   <p
    //     key="2">{this.props.children}</p>,
    //   <input
    //     key="3"
    //     type="text" onChange={this.props.changed}
    //     value={this.props.name}/>,
    // ];
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  change: PropTypes.func,
};

export default withClass(Person, classes.Person);