import React, {useRef} from 'react';
import {Animated, Text, StyleSheet, Vibration} from 'react-native';

const FadeView = ({trigger, text}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (trigger) {
      Vibration.vibrate([0, 200, 100, 200]);
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          // Fade out
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }, 2000);
      });
    }
  }, [trigger]);

  return (
    <Animated.View style={[styles.box, {opacity: fadeAnim}]}>
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 20,
    backgroundColor: 'rgba(53, 55, 56, 0.59)',
    borderRadius: 100,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FadeView;
