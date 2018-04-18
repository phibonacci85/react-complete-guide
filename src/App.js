import React, { Component } from 'react';
import './App.css';
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
      persons: persons
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
      persons: persons
    });
  };

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons,
    });
  };

  render () {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    };

    let persons = null;
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
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App!</h1>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons
        </button>
        {persons}
      </div>
    );
  }
}

export default App;
