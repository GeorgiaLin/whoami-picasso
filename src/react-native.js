import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  DEFAULT_BACKGROUND_COLORS,
  getAvatar,
  getRandomAvatar,
} from './index.js';

export const LINE_FACE_IMAGE_SOURCES = Object.freeze([
  require('../assets/line-faces/face1.png'),
  require('../assets/line-faces/face2.png'),
  require('../assets/line-faces/face3.png'),
  require('../assets/line-faces/face4.png'),
  require('../assets/line-faces/face5.png'),
  require('../assets/line-faces/face6.png'),
]);

export function getReactNativeProfilePicture(seed, options = {}) {
  return getAvatar(seed, {
    colors: options.colors ?? DEFAULT_BACKGROUND_COLORS,
    faces: options.faces ?? LINE_FACE_IMAGE_SOURCES,
  });
}

export function getRandomReactNativeProfilePicture(options = {}) {
  return getRandomAvatar({
    colors: options.colors ?? DEFAULT_BACKGROUND_COLORS,
    faces: options.faces ?? LINE_FACE_IMAGE_SOURCES,
    random: options.random,
  });
}

export function ProfilePicture({
  accessibilityLabel = 'Profile picture',
  avatar,
  colors,
  faces,
  imageScale = 0.9,
  imageStyle,
  seed,
  size = 40,
  style,
  userId,
  ...viewProps
}) {
  const resolvedAvatar = avatar ?? getReactNativeProfilePicture(seed ?? userId, {
    colors,
    faces,
  });
  const pixelSize = normalizeSize(size);
  const imageSize = pixelSize * normalizeScale(imageScale);

  return React.createElement(
    View,
    {
      ...viewProps,
      style: [
        styles.container,
        {
          width: pixelSize,
          height: pixelSize,
          borderRadius: pixelSize / 2,
          backgroundColor: resolvedAvatar.backgroundColor,
        },
        style,
      ],
    },
    React.createElement(Image, {
      accessibilityIgnoresInvertColors: true,
      accessibilityLabel,
      resizeMode: 'cover',
      source: resolvedAvatar.face,
      style: [
        {
          width: imageSize,
          height: imageSize,
        },
        imageStyle,
      ],
    }),
  );
}

export function RandomProfilePicture({
  colors,
  faces,
  random,
  ...avatarProps
}) {
  const avatar = useMemo(
    () => getRandomReactNativeProfilePicture({ colors, faces, random }),
    [colors, faces, random],
  );

  return React.createElement(ProfilePicture, {
    ...avatarProps,
    avatar,
  });
}

export const LineFaceAvatar = ProfilePicture;
export const RandomLineFaceAvatar = RandomProfilePicture;
export default ProfilePicture;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

function normalizeSize(size) {
  const value = Number(size);
  return Number.isFinite(value) && value > 0 ? value : 40;
}

function normalizeScale(scale) {
  const value = Number(scale);
  return Number.isFinite(value) && value > 0 ? value : 0.9;
}
