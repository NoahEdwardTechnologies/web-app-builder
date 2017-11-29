/* eslint-disable */
import React from 'react';
import { Icon, Input } from 'antd';
import fieldRules from './fieldRules';

export class FormField extends React.Component {
  static defaultProps = {
    autoFocus: false,
    fieldRules: null,
    fieldStyle: {},
    refCallback: () => null,
  }

  getTextArea = () => (
    <textarea
      name={this.props.fieldName}
      placeholder={this.props.placeholder}
      style={this.props.fieldStyle}
    />
  )
  getInputField = () => (
    <Input
      prefix={<Icon type={this.props.iconType} style={{ fontSize: 13 }} />}
      ref={this.props.refCallback}
      autoFocus={this.props.autoFocus}
      placeholder={this.props.placeholder}
    />
  )

  getFormField = (
    fieldType = this.props.fieldType
  ) => fieldType === 'input'
    ? this.getInputField()
    : fieldType === 'textarea'
    ? this.getTextArea()
    : null;

  render () {
    const field = this.getFormField();
    return field
      ? (
        this.props.form.getFieldDecorator(
          this.props.fieldName,
          fieldRules(this.props.fieldRules)
        )(this.getFormField())
      )
      : null;
  }
}

export default FormField;
