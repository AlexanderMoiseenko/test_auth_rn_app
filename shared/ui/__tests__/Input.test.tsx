import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import { colors, theme } from '@/shared/config';

import Input from '../Input';

jest.mock('react-native-reanimated');

// Helper to resolve Animated interpolation values in tests
const resolveAnimated = (v: unknown) => {
  if (typeof v === 'number' || typeof v === 'string') return v;
  const maybe = v as { __getValue?: () => unknown } | null | undefined;
  if (maybe && typeof maybe.__getValue === 'function') return maybe.__getValue();
  return v as number;
};

// Use fake timers to control Animated.timing scheduling
jest.useFakeTimers();

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

    // Focus the input
    fireEvent(textInput, 'focus');
    const focusedStyle = StyleSheet.flatten(container.props.style);
    expect(focusedStyle.borderColor).toBe(colors.primary);

    // Blur the input
    fireEvent(textInput, 'blur');
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

    // Initial style
    let style = StyleSheet.flatten(label.props.style);
    expect(resolveAnimated(style.top)).toBe(theme.spacing.s);

    // Focus the input
    fireEvent(textInput, 'focus');
    // advance by the animation duration used in Input.tsx (150ms)
    jest.advanceTimersByTime(150);

    style = StyleSheet.flatten(label.props.style);
    expect(resolveAnimated(style.top)).toBe(-1);

    // Blur the input
    fireEvent(textInput, 'blur');
    jest.advanceTimersByTime(150);

    style = StyleSheet.flatten(label.props.style);
    expect(resolveAnimated(style.top)).toBe(theme.spacing.s);
  });
});
