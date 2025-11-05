import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

const AnimatedBorder = ({ children, borderType, style }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, []);

  const getBorderStyle = () => {
    switch (borderType) {
      case 'portal':
        return {
          backgroundColor: colors.primary,
          shadowColor: colors.primary,
        };
      case 'slime':
        return {
          backgroundColor: colors.secondary,
          shadowColor: colors.secondary,
        };
      case 'space':
        return {
          backgroundColor: '#6C5CE7',
          shadowColor: '#6C5CE7',
        };
      case 'laser':
        return {
          backgroundColor: colors.accent,
          shadowColor: colors.accent,
        };
      case 'circuit':
        return {
          backgroundColor: '#F39C12',
          shadowColor: '#F39C12',
        };
      default:
        return {
          backgroundColor: colors.primary,
          shadowColor: colors.primary,
        };
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        getBorderStyle(), 
        style,
        { transform: [{ scale: pulseAnim }] }
      ]}
    >
      <View style={styles.innerContainer}>
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 3,
    margin: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  innerContainer: {
    borderRadius: 9,
    overflow: 'hidden',
  },
});

export default AnimatedBorder;