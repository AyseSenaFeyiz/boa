/* eslint-disable no-bitwise, jsx-a11y/click-events-have-key-events,
jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

const styles = {
  base: {
    position: 'absolute',
  },
  top: {
    width: '100%',
    height: '10px',
    top: '-5px',
    left: '0px',
    cursor: 'row-resize',
  },
  right: {
    width: '10px',
    height: '100%',
    top: '0px',
    right: '-5px',
    cursor: 'col-resize',
  },
  bottom: {
    width: '100%',
    height: '10px',
    bottom: '-5px',
    left: '0px',
    cursor: 'row-resize',
  },
  left: {
    width: '10px',
    height: '100%',
    top: '0px',
    left: '-5px',
    cursor: 'col-resize',
  },
  topRight: {
    width: '20px',
    height: '20px',
    position: 'absolute',
    right: '-10px',
    top: '-10px',
    cursor: 'sw-resize',
  },
  bottomRight: {
    width: '20px',
    height: '20px',
    position: 'absolute',
    right: '-10px',
    bottom: '-10px',
    cursor: 'nw-resize',
  },
  bottomLeft: {
    width: '20px',
    height: '20px',
    position: 'absolute',
    left: '-10px',
    bottom: '-10px',
    cursor: 'ne-resize',
  },
  topLeft: {
    width: '20px',
    height: '20px',
    position: 'absolute',
    left: '-10px',
    top: '-10px',
    cursor: 'se-resize',
  },
};

export default class Resizer extends Component {
  static propTypes = {
    className: PropTypes.string,
    onResizeStart: PropTypes.func,
    replaceStyles: PropTypes.object,
    type: PropTypes.oneOf([
      'top',
      'right',
      'bottom',
      'left',
      'topRight',
      'bottomRight',
      'bottomLeft',
      'topLeft',
    ]).isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onTouchStart = this.onTouchStart.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  onTouchStart(event) {
    this.props.onResizeStart(event);
  }

  getStyle() {
    if (this.props.replaceStyles) return this.props.replaceStyles;
    return { ...styles.base, ...styles[this.props.type] };
  }

  render() {
    return (
      <div
        className={this.props.className}
        style={this.getStyle()}
        onMouseDown={this.props.onResizeStart}
        onTouchStart={this.onTouchStart}
      />
    );
  }
}
