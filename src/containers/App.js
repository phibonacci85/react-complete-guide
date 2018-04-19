import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Auxiliary from '../hoc/Auxiliary';
import withClass from '../hoc/withClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor (props) {
    super(props);
    console.log('[App.js] Inside constructor', props);
    this.state = {
      persons: [
        {id: 'dsath', name: 'John', age: 32},
        {id: '4eh65', name: 'Cassie', age: 24},
        {id: 'q435y', name: 'Sophie', age: 16},
      ],
      otherState: 'some other value',
      showPersons: false,
      toggleClicked: 0,
      authenticated: false,
    };
  }

  componentWillMount () {
    console.log('[App.js] Inside componentWillMount');
  }

  componentDidMount () {
    console.log('[App.js] Inside componentDidMount');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
  //   return nextState.persons !== this.state.persons ||
  //     nextState.showPersons !== this.state.showPersons;
  // }

  componentWillUpdate (nextProps, nextState) {
    console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps,
      nextState);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(
      '[UPDATE App.js] Inside getDerivedStateFromProps',
      nextProps,
      prevState,
    );

    return prevState;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(
      '[UPDATE App.js] Inside getSnapshotBeforeUpdate',
      prevProps,
      prevState,
    );

    return null;
  }

  componentDidUpdate () {
    console.log('[UPDATE App.js] Inside componentDidUpdate');
  }

  deletePersonHandler = (index) => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({
      persons: persons,
    });
  };

  nameChangedHandler = (event, id) => {
    const index = this.state.persons.findIndex(p => p.id === id);
    const person = {
      ...this.state.persons[index],
      name: event.target.value,
    };
    const persons = [...this.state.persons];
    persons[index] = person;
    this.setState({
      persons: persons,
    });
  };

  togglePersonsHandler = () => {
    this.setState((prevState, props) => {
      return {
        showPersons: !prevState.showPersons,
        toggleClicked: prevState.toggleClicked + 1,
      };
    });
  };

  loginHandler = () => {
    this.setState({authenticated: true});
  };

  render () {
    console.log('[App.js] Inside render');
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}/>
      );
    }

    return (
      <Auxiliary>
        <button onClick={() => {this.setState({showPersons: true});}}>Show
          Persons
        </button>
        <Cockpit
          appTitle={this.props.title}
          clicked={this.togglePersonsHandler}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          login={this.loginHandler}/>
        <AuthContext.Provider value={this.state.authenticated}>
          {persons}
        </AuthContext.Provider>
      </Auxiliary>
    );
  }
}

export default withClass(App, classes.App);
