import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'; //ReduxForm
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';


class PostNew extends Component {
  renderField(field) { //funkcja odpowiedzialna za utworzenie JSXa, field zawiera w sobie event handlery (jeden lub dwa),
    // które pomagają zwrócic JSX oraz umożliwiają połączenie <Field /> z <input'em>
    const { meta: { touched, error} } = field;//meta to jest object, touched i error to properties obiektu meta field.meta.touched
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
        //  onChange={field.input.onChange}
        //  onFocus={field.input.onFocus}
        //  onBlur={field.input.onBlur}
          {...field.input}//jakikolwiek event się wydarzy, to to się tym zajmie, równoznaczne trzem linijkom powyżej
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) { //values - zwyczajowa nazwa; values zawiera title, categories, content - wywołane tylko w przypadku, gdy walidacja zakończy się sukcesem
    this.props.createPost(values, () => {
      this.props.history.push('/');//automatyczna nawigacja
    });
  }
//1
  render() {
    const { handleSubmit } = this.props; //this is a property, which is being passed to the component on behalf of reduxForm

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"//nazwa tego pola musi się zgadzac z tym z validate
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) { //values(nazwa zwyczajowa) - obiekt, który
  //zawiera różne wartości wprowadzone do <inputu>
  //value dla każdego z pól(title:'asdf', categories:'asd', content: 'asdas')
  //jest wprowadzoną przez użytkownika wartością, np asd
  const errors = {};

  //Validate the inputs from values
  if (!values.title) {
    errors.title = "Enter a title!";
  }
  if(!values.categories) {
    errors.categories = "Enter a categories!";
  }
  if (!values.content) {
    errors.content = "Enter a content!";
  }

  //If errors is empty, the form is fine to submit
  //If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({ // reduxForm było nazywane reduxForm helper
  validate: validate, //lub wystarczy samo słowo validate
  form: 'PostsNewForm'//to może byc dowolna nazwa, ale nie może się powtarzac
})(
    connect(null,{ createPost })(PostNew)
);
