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
assert.equal(randomAvatar.backgroundColorIndex, 5);

const html = renderAvatarHtml('abc', {
  alt: 'A "friend"',
  assetBasePath: '/avatars',
  size: 24,
});
assert.match(html, /width: 24px/);
assert.match(html, /src="\/avatars\/face1\.png"/);
assert.match(html, /alt="A &quot;friend&quot;"/);
