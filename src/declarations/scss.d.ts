declare module '*.module.scss' {
  import { StyleProp } from 'react-native';
  const content: Record<string, StyleProp<any>>;
  export default content;
}
