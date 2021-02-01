import React, {PureComponent} from 'react';
import {Platform, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import NativeModal from 'react-native-modal';

const height = Dimensions.get('screen').height;

class Modal extends PureComponent {
  static propTypes = {
    closeable: PropTypes.bool,
  };

  static defaultProps = {
    closeable: true,
    backdropDismiss: false,
  };

  render() {
    const {closeable, lock, ...rest} = this.props;

    return (
      <NativeModal
        backdropOpacity={0.8}
        {...rest}
        hardwareAccelerated
        hideModalContentWhileAnimating
        onRequestClose={() => {
          this.props.changeState(lock || !closeable);
        }}
        useNativeDriver
        onBackdropPress={() => {
          if (Platform.OS === 'ios' || this.props.backdropDismiss) {
            this.props.changeState(lock || !closeable);
          }
        }}
        deviceHeight={height}
        onBackButtonPress={() => {
          this.props.changeState(lock || !closeable);
        }}
        style={{
          margin: 0,
          padding: 0,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height,
        }}>
        {this.props.children}
      </NativeModal>
    );
  }
}

export default Modal;
