/* eslint-disable */

import React from 'react';
import { Form, Button } from 'antd';
import FormField from './FormField';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const FormItem = Form.Item;

export class ContactForm extends React.Component {
  static defaultProps = {
    hash: '%%' + Math.random().toString(36).substring(7),
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.visible && nextProps.visible)
      setTimeout(() => this.inputWithAutoFocus.focus(), 200)
  }

  sendMailViaClient = (values) => {
    const valuesString = Object.keys(values).map(value => `${value.split('%%')[0]}%3D${values[value]}`).join('%0D%0A');

    const win  = window.open(`${this.props.mailtoString}&body=${valuesString}`);

    setTimeout(() => win && win.open && win.close(), 50)
  }

  sendMailViaServer = () => console.log('TODO: Setup server said mail logic')

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) return;
      if (this.props.mailto) this.sendMailViaClient(values);
      else this.sendMailViaServer(values);
      this.props.callback();
    });
  }

  setFieldWithAutoFocus = (input) => (this.inputWithAutoFocus = input)

  render () {
    const {
      getFieldDecorator,
      getFieldError,
      getFieldsError,
      isFieldTouched,
    } = this.props.form;

    const
      emailField = `email${this.props.hash}`,
      messageField = `message${this.props.hash}`,
      nameField = `name${this.props.hash}`;

    // Only show error after a field is touched.
    const
      EmailError = isFieldTouched(emailField) && getFieldError(emailField),
      MessageError = isFieldTouched(messageField) && getFieldError(messageField),
      NameError = isFieldTouched(nameField) && getFieldError(nameField);

    return (
      <Form onSubmit={this.handleSubmit}>
          <FormItem
            help={NameError || ''}
            validateStatus={NameError ? 'error' : ''}
          >
            <FormField
              autoFocus={true}
              fieldName={nameField}
              fieldRules='name'
              fieldType='input'
              form={this.props.form}
              iconType='user'
              placeholder='Name'
              refCallback={this.setFieldWithAutoFocus}
            />
          </FormItem>

          <FormItem
            help={EmailError || ''}
            validateStatus={EmailError ? 'error' : ''}
          >
            <FormField
              fieldName={emailField}
              fieldRules='email'
              fieldType='input'
              form={this.props.form}
              iconType='mail'
              placeholder='Contact Email'
            />
          </FormItem>

          <FormItem>
            <FormField
              fieldName={messageField}
              fieldStyle={{ width: '100%', padding: '5px'}}
              fieldType='textarea'
              form={this.props.form}
              placeholder='Tell us about your project'
            />
          </FormItem>
          <FormItem>
            <Button
              disabled={hasErrors(getFieldsError())}
              htmlType='submit'
              type="primary"
              value='Submit'
            >Submit</Button>
            <Button
              htmlType='button'
              onClick={this.props.callback}
              style={{ float: 'right' }}
              type='danger'
            >Close</Button>
          </FormItem>
      </Form>
    );
  }
}

export default Form.create()(ContactForm);
