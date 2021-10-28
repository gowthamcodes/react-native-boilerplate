import React, { Component } from 'react';
import AwesomeAlert, { AwesomeAlertProps } from 'react-native-awesome-alerts';
import { THEME } from '../../utils/constant';

/* 
The purpose of having this component nested with AwesomeAlert 
is to have one instance of the object for all the screen. 

Declare the component once and can be 'reference' to the 
component again with different content.

This will perform smoothly rather than stacking multiple same component with different content. 

Firman Jamal
*/

export interface FirmanAwesomeAlertProp extends AwesomeAlertProps {}

interface FirmanAwesomeAlertState {
  visibility: boolean;
  message: string;
  closeOnTouchOutside?: boolean;
  closeOnHardwareBackPress?: boolean;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  cancelText?: string;
  confirmText?: string;
  confirmButtonColor?: string;
  onCancelPressed?: () => void;
  onConfirmPressed?: () => void;
}

export class FirmanAwesomeAlert extends Component<
  FirmanAwesomeAlertProp,
  FirmanAwesomeAlertState
> {
  constructor(props: FirmanAwesomeAlertProp) {
    super(props);
    this.state = {
      visibility: false,
      message: '',
      closeOnTouchOutside: true,
      closeOnHardwareBackPress: false,
      showCancelButton: false,
      showConfirmButton: true,
      cancelText: 'Cancel',
      confirmText: 'OK',
      confirmButtonColor: THEME.colors.PRIMARY,
      onCancelPressed: this.hide.bind(this),
      onConfirmPressed: this.hide.bind(this)
    };
  }

  static _ref: any = null;

  static setRef(ref: any) {
    FirmanAwesomeAlert._ref = ref;
  }

  static getRef() {
    return FirmanAwesomeAlert._ref;
  }

  static clearRef() {
    FirmanAwesomeAlert._ref = null;
  }

  static show(options: Omit<FirmanAwesomeAlertState, 'visibility'>) {
    FirmanAwesomeAlert._ref.show(options);
  }

  static hide() {
    FirmanAwesomeAlert._ref.hide();
  }

  show(options: Omit<FirmanAwesomeAlertState, 'visibility'>) {
    this.setState({ visibility: true, ...options });
  }

  hide() {
    this.setState({ visibility: false });
  }

  render() {
    return (
      <AwesomeAlert
        useNativeDriver
        show={this.state.visibility}
        message={this.state.message}
        closeOnTouchOutside={this.state.closeOnTouchOutside}
        closeOnHardwareBackPress={this.state.closeOnHardwareBackPress}
        showCancelButton={this.state.showCancelButton}
        showConfirmButton={this.state.showConfirmButton}
        cancelText={this.state.cancelText}
        confirmText={this.state.confirmText}
        confirmButtonColor={this.state.confirmButtonColor}
        onCancelPressed={() => {
          if (this.state.onCancelPressed) {
            this.state.onCancelPressed();
            this.setState({ ...this.state, onCancelPressed: () => undefined });
          }
          this.hide();
        }}
        onConfirmPressed={() => {
          if (this.state.onConfirmPressed) {
            this.state.onConfirmPressed();
            this.setState({ ...this.state, onConfirmPressed: () => undefined });
          }
          this.hide();
        }}
      />
    );
  }
}
