import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {id: 'dsath', name: 'John', age: 32},
      {id: '4eh65', name: 'Cassie', age: 24},
      {id: 'q435y', name: 'Sophie', age: 16},
    ],
    otherState: 'some other value',
    showPersons: false,
  };

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
    this.setState({
      showPersons: !this.state.showPersons,
    });
  };

  render () {
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                key={person.id}
                name={person.name}
                age={person.age}
                changed={(event) => this.nameChangedHandler(event, person.id)}
                click={this.deletePersonHandler.bind(this, index)}/>
            );
          })}
        </div>
      );

      btnClass = classes.Red;
    }

    let assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App!</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button
          className={btnClass}
          onClick={this.togglePersonsHandler}>Toggle Persons
        </button>
        {persons}
      </div>
    );
  }
}

export default App;
