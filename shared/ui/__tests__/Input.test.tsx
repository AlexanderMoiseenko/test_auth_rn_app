import React from 'react';

import { render, fireEvent, act } from '@testing-library/react-native';
import { StyleSheet, Animated } from 'react-native';

import { colors, theme } from '@/shared/config';

import Input from '../Input';

// Use fake timers to control animations
jest.useFakeTimers();

// Ensure Animated.timing updates happen synchronously in tests
let timingSpy: jest.SpyInstance;
beforeAll(() => {
  timingSpy = jest
    .spyOn(Animated as unknown as { timing: typeof Animated.timing }, 'timing')
    .mockImplementation((value: unknown, config: unknown) => {
      const v = value as { setValue?: (n: number) => void } | null;
      const c = config as { toValue?: number } | null;
      return {
        start: (cb?: () => void) => {
          if (
            typeof v?.setValue === 'function' &&
            c &&
            typeof c.toValue !== 'undefined'
          ) {
            v.setValue(c.toValue as number);
          }
          if (cb) cb();
        },
        stop: () => {},
      } as unknown as Animated.CompositeAnimation;
    });
});

afterAll(() => {
  timingSpy?.mockRestore();
});

const resolveAnimated = (v: unknown) => {
  if (typeof v === 'number') return v;
  const maybe = v as { __getValue?: () => unknown } | null | undefined;
  if (maybe && typeof maybe.__getValue === 'function')
    return maybe.__getValue();
  return v as number;
};

describe('Input', () => {
  it('renders correctly with a placeholder', () => {
    const { getByText } = render(
      <Input placeholder='Username' value='' onChangeText={() => {}} />
    );
    expect(getByText('Username')).toBeTruthy();
  });

  it('calls onChangeText when text is changed', () => {
    const onChangeTextMock = jest.fn();
    const { getByTestId } = render(
      <Input
        placeholder='Username'
        value=''
        onChangeText={onChangeTextMock}
        testID='input'
      />
    );

    fireEvent.changeText(getByTestId('input'), 'new text');
    expect(onChangeTextMock).toHaveBeenCalledWith('new text');
  });

  it('displays an error message and applies error styles', () => {
    const { getByText, getByTestId } = render(
      <Input
        placeholder='Password'
        value='123'
        onChangeText={() => {}}
        error='Invalid password'
      />
    );
    // Check for the error message
    expect(getByText('Invalid password')).toBeTruthy();

    // Check for the error style on the container
    const container = getByTestId('input-container');
    const containerStyle = StyleSheet.flatten(container.props.style);
    expect(containerStyle.borderColor).toBe(colors.redDark);
  });

  it('shows a clear button and clears the input on press', () => {
    const onChangeTextMock = jest.fn();
    const { getByTestId, rerender } = render(
      <Input
        placeholder='Search'
        value='some text'
        onChangeText={onChangeTextMock}
      />
    );

    // The clear button should be visible
    const clearButton = getByTestId('clear-button');
    expect(clearButton).toBeTruthy();

    // Pressing it should clear the input
    fireEvent.press(clearButton);
    expect(onChangeTextMock).toHaveBeenCalledWith('');

    // Re-render with empty value
    rerender(
      <Input placeholder='Search' value='' onChangeText={onChangeTextMock} />
    );

    // The clear button should not be visible
    expect(() => getByTestId('clear-button')).toThrow();
  });

  it('applies focused styles on focus and removes them on blur', () => {
    const { getByTestId } = render(
      <Input
        placeholder='Focus Test'
        value=''
        onChangeText={() => {}}
        testID='input'
      />
    );
    const textInput = getByTestId('input');
    const container = getByTestId('input-container');

    act(() => {
      fireEvent(textInput, 'focus');
      jest.runAllTimers();
    });
    const focusedStyle = StyleSheet.flatten(container.props.style);
    expect(focusedStyle.borderColor).toBe(colors.primary);
    act(() => {
      fireEvent(textInput, 'blur');
      jest.runAllTimers();
    });
    const blurredStyle = StyleSheet.flatten(container.props.style);
    expect(blurredStyle.borderColor).toBe(colors.grayLight);
  });

  it('passes secureTextEntry prop to TextInput', () => {
    const { getByTestId } = render(
      <Input
        placeholder='Password'
        value='secret'
        onChangeText={() => {}}
        secureTextEntry
        testID='input'
      />
    );
    const textInput = getByTestId('input');
    expect(textInput.props.secureTextEntry).toBe(true);
  });

  it('animates the label on focus and blur', () => {
    const { getByTestId, getByText } = render(
      <Input
        placeholder='Animated Label'
        value=''
        onChangeText={() => {}}
        testID='input'
      />
    );
    const textInput = getByTestId('input');
    const label = getByText('Animated Label');

    // Before focus
    act(() => {
      jest.runAllTimers();
    });
    const initialStyle = StyleSheet.flatten(label.props.style);
    expect(resolveAnimated(initialStyle.top)).toBe(theme.spacing.s);

    act(() => {
      fireEvent(textInput, 'focus');
      jest.runAllTimers();
    });
    const focusedStyle = StyleSheet.flatten(label.props.style);
    expect(resolveAnimated(focusedStyle.top)).toBe(-1);

    act(() => {
      fireEvent(textInput, 'blur');
      jest.runAllTimers();
    });
    const blurredStyle = StyleSheet.flatten(label.props.style);
    expect(resolveAnimated(blurredStyle.top)).toBe(theme.spacing.s);
  });
});
