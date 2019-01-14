import React from 'react';
import {
  ScrollView,
  Slider,
  Switch,
  TextInput,
  ToolbarAndroid,
  ViewPagerAndroid,
  DrawerLayoutAndroid,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import gestureHandlerRootHOC from './gestureHandlerRootHOC';
import Directions from './Directions';
import State from './State';

// Factory for stub Handler components
function createStubHandler(name) {
  return class NativeViewGestureHandler extends React.Component {
    static displayName = name;

    container = React.createRef();

    setNativeProps() {
      // Since this is a stub we do not need to pass on native props.
      // However, we need to implement it here to avoid null calls.
      // If for any reason we need to pass on native props we can fallback to this:
      // this.container.current.setNativeProps(...args)
    }

    render() {
      const { children, ...rest } = this.props;

      // We don't want to create another layer, so instead we clone it only but keep the reference
      const child = React.Children.only(children);
      return React.cloneElement(child, {
        ref: this.container,
        ...rest,
      });
    }
  };
}

// Create all Handler components with their respective handler functions
// (at the moment only TapGestureHandler is properly supported)
const NativeViewGestureHandler = createStubHandler('NativeViewGestureHandler');

class TapGestureHandler extends React.Component {
  setNativeProps() {}

  render() {
    const { children, enabled, onHandlerStateChange, style } = this.props;

    return (
      <TouchableWithoutFeedback
        style={style}
        onPress={({ x }) => {
          enabled !== false &&
            onHandlerStateChange &&
            onHandlerStateChange({
              nativeEvent: {
                oldState: State.ACTIVE,
                state: State.UNDETERMINED,
                x,
              },
            });
        }}>
        {children}
      </TouchableWithoutFeedback>
    );
  }
}

const FlingGestureHandler = createStubHandler('FlingGestureHandler');

const ForceTouchGestureHandler = createStubHandler('ForceTouchGestureHandler');

const LongPressGestureHandler = createStubHandler('LongPressGestureHandler');

const PanGestureHandler = createStubHandler('PanGestureHandler');

const PinchGestureHandler = createStubHandler('PinchGestureHandler');

const RotationGestureHandler = createStubHandler('RotationGestureHandler');

// Factory for stub Button component
// (at the moment this is a plain TouchableWithoutFeedback)
function createStubButton(name) {
  return class Button extends React.Component {
    static displayName = name;

    render() {
      return (
        <TouchableWithoutFeedback accessibilityRole="button" {...this.props} />
      );
    }
  };
}

const RawButton = createStubButton('RawButton');
const BaseButton = createStubButton('BaseButton');
const RectButton = createStubButton('RectButton');
const BorderlessButton = createStubButton('BorderlessButton');

// Export same components as in GestureHandler.js
export {
  ScrollView,
  Slider,
  Switch,
  TextInput,
  ToolbarAndroid,
  ViewPagerAndroid,
  DrawerLayoutAndroid,
  NativeViewGestureHandler,
  TapGestureHandler,
  FlingGestureHandler,
  ForceTouchGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State,
  /* Buttons */
  RawButton,
  BaseButton,
  RectButton,
  BorderlessButton,
  /* Other */
  FlatList,
  gestureHandlerRootHOC,
  Directions,
};
