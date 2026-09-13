# Whoami Picasso

Reusable hand-drawn line-face avatars from ClosedReview. The package ships Georgia Lin's original PNG drawings, a soft background palette, deterministic avatar selection from any user id, and an optional React Native component.

Created by [Georgia Lin](https://github.com/GeorgiaLin).

## Install

After publishing:

```sh
npm install whoami-picasso
```

Before publishing, you can test the package locally:

```sh
npm pack
npm install ./whoami-picasso-0.1.0.tgz
```

If your npm scope is different, update the `name` field in `package.json` before publishing.

## JavaScript

```js
import {
  getProfilePicture,
  getRandomProfilePicture,
  renderAvatarHtml,
} from 'whoami-picasso';

const avatar = getProfilePicture('user-123');
// {
//   face: 'assets/line-faces/face1.png',
//   faceIndex: 0,
//   faceName: 'face1',
//   backgroundColor: '#FFB78D',
//   backgroundColorIndex: 4,
//   ...
// }

const randomAvatar = getRandomProfilePicture();

const html = renderAvatarHtml('user-123', {
  assetBasePath: '/avatars/line-faces',
  size: 40,
});
```

## React Native

```jsx
import {
  ProfilePicture,
  RandomProfilePicture,
} from 'whoami-picasso/react-native';

export function UserRow({ user }) {
  return <ProfilePicture userId={user.id} size={40} />;
}

export function AnonymousComment() {
  return <RandomProfilePicture size={24} />;
}
```

## Custom Palettes

```js
import { getProfilePicture } from 'whoami-picasso';

const avatar = getProfilePicture('user-123', {
  colors: ['#9BC3BA', '#FFD986', '#E69072'],
});
```

## Publish

```sh
npm test
npm pack --dry-run
npm publish --access public
```

## Attribution

Whoami Picasso was created by [Georgia Lin](https://github.com/GeorgiaLin) for [ClosedReview](https://github.com/GeorgiaLin/ClosedReview). The public source lives at [GeorgiaLin/whoami-picasso](https://github.com/GeorgiaLin/whoami-picasso). The included avatar artwork is original and published under the MIT license with this package.

The package is MIT licensed, including the included avatar artwork.
