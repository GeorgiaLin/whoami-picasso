import type { ReactElement } from 'react';
import type {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native';
import type { AvatarData, AvatarOptions, RandomAvatarOptions, AvatarSeed } from './index.js';

export const LINE_FACE_IMAGE_SOURCES: readonly ImageSourcePropType[];

export interface ReactNativeAvatarOptions extends AvatarOptions<ImageSourcePropType> {}
export interface RandomReactNativeAvatarOptions
  extends RandomAvatarOptions<ImageSourcePropType> {}

export interface ProfilePictureProps extends ViewProps {
  accessibilityLabel?: string;
  avatar?: AvatarData<ImageSourcePropType>;
  colors?: readonly string[];
  faces?: readonly ImageSourcePropType[];
  imageScale?: number;
  imageStyle?: StyleProp<ImageStyle>;
  seed?: AvatarSeed;
  size?: number;
  style?: StyleProp<ViewStyle>;
  userId?: AvatarSeed;
}

export interface RandomProfilePictureProps extends Omit<ProfilePictureProps, 'avatar'> {
  random?: () => number;
}

export function getReactNativeProfilePicture(
  seed: AvatarSeed,
  options?: ReactNativeAvatarOptions,
): AvatarData<ImageSourcePropType>;
export function getRandomReactNativeProfilePicture(
  options?: RandomReactNativeAvatarOptions,
): AvatarData<ImageSourcePropType>;
export function ProfilePicture(props: ProfilePictureProps): ReactElement;
export function RandomProfilePicture(props: RandomProfilePictureProps): ReactElement;

export const LineFaceAvatar: typeof ProfilePicture;
export const RandomLineFaceAvatar: typeof RandomProfilePicture;
export default ProfilePicture;
