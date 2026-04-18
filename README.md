# react-native-cycle-text

A slot-machine style cycling text component for React Native, powered by [Reanimated](https://docs.swmansion.com/react-native-reanimated/). Words scroll in and out on a fixed interval with a smooth fade + slide animation.

---

## Preview

![react-native-cycle-text demo](https://raw.githubusercontent.com/mashish584/react-native-cycle-text/master/media/cyclic-text.gif)

---

## Requirements

| Peer dependency         | Version  |
| ----------------------- | -------- |
| `react`                 | ≥ 17     |
| `react-native`          | ≥ 0.70   |
| `react-native-reanimated` | ≥ 3.0  |

---

## Installation

### npm / yarn (published package)

```bash
# npm
npm install react-native-cycle-text

# yarn
yarn add react-native-cycle-text

# pnpm
pnpm add react-native-cycle-text
```

Make sure `react-native-reanimated` is installed and its Babel plugin is configured:

```bash
npm install react-native-reanimated
```

Add the plugin to `babel.config.js` (must be last):

```js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

For Expo projects:

```bash
npx expo install react-native-reanimated
```

---

### From GitHub (latest source)

```bash
# npm
npm install github:ashishmehra-dev/react-native-cycle-text

# yarn
yarn add ashishmehra-dev/react-native-cycle-text

# or pin to a specific commit / tag
npm install github:ashishmehra-dev/react-native-cycle-text#v1.0.0
```

> The package is built via `prepublishOnly`, so npm/yarn will run `npm run build` automatically when installing from source.

---

## Usage

### Basic

```tsx
import CycleText from 'react-native-cycle-text';

export default function App() {
  return (
    <CycleText
      words={['React Native', 'TypeScript', 'Reanimated']}
    />
  );
}
```

### With prefix and suffix

```tsx
import CycleText from 'react-native-cycle-text';

export default function Hero() {
  return (
    <CycleText
      prefix="I love "
      words={['coding', 'design', 'learning']}
      suffix=" every day."
      fontSize={24}
      interval={1500}
    />
  );
}
```

### Custom styling

```tsx
import CycleText from 'react-native-cycle-text';

export default function StyledExample() {
  return (
    <CycleText
      prefix="Built for "
      words={['speed', 'scale', 'simplicity']}
      fontSize={28}
      fontFamily="Georgia"
      prefixStyle={{ color: '#111827', fontWeight: '600' }}
      wordStyle={{ color: '#7c3aed', fontWeight: '700' }}
      suffixStyle={{ color: '#111827' }}
      style={{ justifyContent: 'center', marginTop: 32 }}
      interval={2000}
    />
  );
}
```

### Named import

```tsx
import { CycleText } from 'react-native-cycle-text';
import type { CycleTextProps } from 'react-native-cycle-text';
```

---

## Props

| Prop           | Type                      | Default   | Description                                              |
| -------------- | ------------------------- | --------- | -------------------------------------------------------- |
| `words`        | `string[]`                | required  | Array of words to cycle through                          |
| `prefix`       | `string`                  | —         | Static text rendered before the cycling word             |
| `suffix`       | `string`                  | —         | Static text rendered after the cycling word              |
| `interval`     | `number`                  | `1300`    | Milliseconds each word stays visible                     |
| `fontSize`     | `number`                  | `20`      | Font size applied to all text segments                   |
| `fontFamily`   | `string`                  | —         | Font family applied to all text segments                 |
| `prefixStyle`  | `StyleProp<TextStyle>`    | —         | Additional style for the prefix `<Text>`                 |
| `wordStyle`    | `StyleProp<TextStyle>`    | —         | Additional style for the animated cycling word           |
| `suffixStyle`  | `StyleProp<TextStyle>`    | —         | Additional style for the suffix `<Text>`                 |
| `style`        | `StyleProp<ViewStyle>`    | —         | Style for the outer `<View>` row container               |

---

## How it works

Each tick, the current word fades out while sliding up (`translateY` → `-lineHeight`). The next word is swapped in off-screen below (`translateY` = `lineHeight`), then fades in and slides up to center — creating a slot-machine scroll effect. The clip view (`overflow: hidden`) masks movement outside the single-line bounds.

---

## License

MIT © [Ashish Mehra](mailto:ashishmehra.dev@gmail.com)
