import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';

import Button from '../Button';

describe('Button', () => {
  it('renders correctly with a title', () => {
    const { getByText } = render(<Button title="Test Button" onPress={() => {}} />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Press Me" onPress={onPressMock} />);
    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('is disabled when the disabled prop is true', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button title="Disabled" onPress={onPressMock} disabled testID="button" />
    );
    const button = getByTestId('button');
    expect(button.props.accessibilityState.disabled).toBe(true);
    fireEvent.press(button);
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('is disabled and shows an ActivityIndicator when loading', () => {
    const onPressMock = jest.fn();
    const { getByTestId, queryByText, UNSAFE_getByType } = render(
      <Button title="Loading" onPress={onPressMock} loading testID="button" />
    );
    const button = getByTestId('button');
    expect(button.props.accessibilityState.disabled).toBe(true);

    // Check for the activity indicator
    const activityIndicator = UNSAFE_getByType(ActivityIndicator);
    expect(activityIndicator).toBeTruthy();

    // The title should not be rendered
    expect(queryByText('Loading')).toBeNull();

    fireEvent.press(button);
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('renders the primary variant by default', () => {
    const { UNSAFE_getByType } = render(
      <Button title="Primary" onPress={() => {}} testID="button" />
    );
    // We can check for the LinearGradient as it is specific to the primary variant
    const linearGradient = UNSAFE_getByType(LinearGradient);
    expect(linearGradient).toBeTruthy();
  });

  it('renders the secondary variant when specified', () => {
    const { UNSAFE_queryByType } = render(
      <Button title="Secondary" onPress={() => {}} variant="secondary" testID="button" />
    );
    // The secondary variant uses a View instead of a LinearGradient
    const linearGradient = UNSAFE_queryByType(LinearGradient);
    expect(linearGradient).toBeNull();
  });

  it('applies custom styles correctly', () => {
    const styles = StyleSheet.create({
      custom: {
        marginTop: 50,
      },
    });
    const { getByTestId } = render(
      <Button title="Custom Style" onPress={() => {}} buttonStyle={styles.custom} testID="button" />
    );
    const button = getByTestId('button');
    const flattenedStyle = StyleSheet.flatten(button.props.style);
    expect(flattenedStyle).toHaveProperty('marginTop', 50);
  });
});
