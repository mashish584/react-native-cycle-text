import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const DURATION = 80;

export interface CycleTextProps {
  words: string[];
  /** Static text rendered before the cycling word */
  prefix?: string;
  /** Static text rendered after the cycling word */
  suffix?: string;
  /** Milliseconds each word stays visible (default 1300) */
  interval?: number;
  fontSize?: number;
  fontFamily?: string;
  prefixStyle?: StyleProp<TextStyle>;
  wordStyle?: StyleProp<TextStyle>;
  suffixStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

export default function CycleText({
  words,
  prefix,
  suffix,
  interval = 1300,
  fontSize = 20,
  fontFamily,
  prefixStyle,
  wordStyle,
  suffixStyle,
  style,
}: CycleTextProps) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const wordsRef = useRef(words);
  wordsRef.current = words;

  const lineHeight = Math.ceil(fontSize * 1.4);

  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  const advance = useCallback(() => {
    const next = (indexRef.current + 1) % wordsRef.current.length;
    indexRef.current = next;
    setIndex(next);
  }, []);

  useEffect(() => {
    const tick = () => {
      opacity.value = withTiming(
        0,
        { duration: DURATION, easing: Easing.out(Easing.ease) },
        (finished) => {
          if (!finished) return;
          translateY.value = lineHeight;
          runOnJS(advance)();
          opacity.value = withTiming(1, {
            duration: DURATION,
            easing: Easing.out(Easing.ease),
          });
          translateY.value = withTiming(0, {
            duration: DURATION,
            easing: Easing.out(Easing.ease),
          });
        },
      );
      translateY.value = withTiming(-lineHeight, {
        duration: DURATION,
        easing: Easing.out(Easing.ease),
      });
    };

    const timer = setInterval(tick, interval);
    return () => {
      clearInterval(timer);
      cancelAnimation(opacity);
      cancelAnimation(translateY);
      opacity.value = 1;
      translateY.value = 0;
    };
  }, [interval, lineHeight, advance, opacity, translateY]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const textBase: TextStyle = { fontSize, lineHeight, fontFamily };

  return (
    <View style={[styles.row, style]}>
      {prefix ? <Text style={[textBase, prefixStyle]}>{prefix}</Text> : null}

      <View style={[styles.clip, { height: lineHeight }]}>
        <Animated.Text style={[textBase, styles.word, wordStyle, animStyle]}>
          {words[index]}
        </Animated.Text>
      </View>

      {suffix ? <Text style={[textBase, suffixStyle]}>{suffix}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  clip: {
    overflow: 'hidden',
    justifyContent: 'center',
  },
  word: {
    color: '#2563eb',
  },
});
