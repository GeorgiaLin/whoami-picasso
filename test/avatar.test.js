import assert from 'node:assert/strict';
import {
  DEFAULT_BACKGROUND_COLORS,
  DEFAULT_FACE_IMAGE_PATHS,
  getAvatar,
  getRandomAvatar,
  hashSeed,
  renderAvatarHtml,
} from '../src/index.js';

assert.equal(hashSeed('abc'), 96354);
assert.deepEqual(DEFAULT_BACKGROUND_COLORS, [
  '#9BC3BA',
  '#92A9D1',
  '#B2A3CB',
  '#FFD986',
  '#FFB78D',
  '#D29DAD',
  '#BCC4BF',
  '#E4A09E',
  '#EED4CD',
]);

const avatar = getAvatar('user-123');
assert.deepEqual(avatar, getAvatar('user-123'));
assert.equal(avatar.face, DEFAULT_FACE_IMAGE_PATHS[avatar.faceIndex]);
assert.equal(avatar.backgroundColor, DEFAULT_BACKGROUND_COLORS[avatar.backgroundColorIndex]);

const customAvatar = getAvatar('abc', {
  colors: ['red', 'blue', 'green'],
  faces: ['one.png', 'two.png'],
});
assert.equal(customAvatar.face, 'one.png');
assert.equal(customAvatar.backgroundColor, 'red');

const randomAvatar = getRandomAvatar({
  random: (() => {
    const values = [0.99, 0.5];
    return () => values.shift();
  })(),
});
assert.equal(randomAvatar.faceIndex, DEFAULT_FACE_IMAGE_PATHS.length - 1);
assert.equal(randomAvatar.backgroundColorIndex, 4);

const html = renderAvatarHtml('abc', {
  alt: 'A "friend"',
  assetBasePath: '/avatars',
  size: 24,
});
assert.match(html, /width: 24px/);
assert.match(html, /src="\/avatars\/face1\.png"/);
assert.match(html, /alt="A &quot;friend&quot;"/);

const faceOnlyHtml = renderAvatarHtml('abc', {
  showBackground: false,
});
assert.match(faceOnlyHtml, /background-color: transparent/);
