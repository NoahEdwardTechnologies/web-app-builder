/* eslint-disable */
import React from 'react';
import { Dropdown, Icon } from 'antd';
import styles from './index.css';

export class DropdownMenu extends React.Component {
  state = {
    showDropdown: false,
  }

  flipShowDropdown = () => this.setState({
    showDropdown: !this.state.showDropdown
  })

  render () {
    return (
      <Dropdown
        overlay={
          <this.props.content
            {...this.props.contentProps}
            callback={this.flipShowDropdown}
            visible={this.state.showDropdown}
          />
        }
        visible={this.state.showDropdown}
        trigger={['click']}
      >
        <h2 className={styles.linkHeader}>
          <a
            href='#'
            onClick={this.flipShowDropdown}
          >{this.props.linkText} <Icon type="down" /></a>
        </h2>
      </Dropdown>
    );
  }
}

export default DropdownMenu;
