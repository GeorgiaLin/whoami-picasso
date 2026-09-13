export const LINE_FACE_NAMES = Object.freeze([
  'face1',
  'face2',
  'face3',
  'face4',
  'face5',
  'face6',
]);

export const LINE_FACE_FILENAMES = Object.freeze(
  LINE_FACE_NAMES.map((faceName) => `${faceName}.png`),
);

export const DEFAULT_FACE_IMAGE_PATHS = Object.freeze(
  LINE_FACE_FILENAMES.map((fileName) => `assets/line-faces/${fileName}`),
);

export const DEFAULT_BACKGROUND_COLORS = Object.freeze([
  '#9BC3BA',
  '#92A9D1',
  '#B2A3CB',
  '#FFD986',
  '#FFB78D',
  '#D29DAD',
  '#5E7F9F',
  '#BCC4BF',
  '#E4A09E',
  '#EED4CD',
  '#E69072',
]);

export function hashSeed(seed) {
  const input = seed == null ? '' : String(seed);
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = ((hash << 5) - hash) + input.charCodeAt(index);
    hash &= hash;
  }

  return Math.abs(hash);
}

export function getAvatar(seed, options = {}) {
  const faces = normalizeCollection(options.faces, DEFAULT_FACE_IMAGE_PATHS, 'faces');
  const colors = normalizeCollection(options.colors, DEFAULT_BACKGROUND_COLORS, 'colors');
  const hash = hashSeed(seed);
  const faceIndex = hash % faces.length;
  const backgroundColorIndex = Math.floor(hash / faces.length) % colors.length;

  return createAvatarResult({
    seed: seed == null ? '' : String(seed),
    hash,
    faces,
    colors,
    faceIndex,
    backgroundColorIndex,
  });
}

export function getRandomAvatar(options = {}) {
  const faces = normalizeCollection(options.faces, DEFAULT_FACE_IMAGE_PATHS, 'faces');
  const colors = normalizeCollection(options.colors, DEFAULT_BACKGROUND_COLORS, 'colors');
  const random = typeof options.random === 'function' ? options.random : Math.random;

  return createAvatarResult({
    seed: null,
    hash: null,
    faces,
    colors,
    faceIndex: randomIndex(faces.length, random),
    backgroundColorIndex: randomIndex(colors.length, random),
  });
}

export const getProfilePicture = getAvatar;
export const getRandomProfilePicture = getRandomAvatar;

export function getAvatarImageSrc(avatar, options = {}) {
  if (!options.assetBasePath) {
    return avatar.face;
  }

  return `${trimTrailingSlash(options.assetBasePath)}/${avatar.faceName}.png`;
}

export function renderAvatarHtml(seed, options = {}) {
  const {
    alt = 'Profile picture',
    assetBasePath,
    className = '',
    imageScale = 0.9,
    size = 40,
    ...avatarOptions
  } = options;

  const avatar = getAvatar(seed, avatarOptions);
  const pixelSize = normalizeSize(size);
  const imageSize = pixelSize * normalizeScale(imageScale);
  const faceSrc = getAvatarImageSrc(avatar, { assetBasePath });
  const classAttribute = className ? ` class="${escapeAttribute(className)}"` : '';

  return [
    `<div${classAttribute} style="`,
    `width: ${pixelSize}px; `,
    `height: ${pixelSize}px; `,
    'border-radius: 9999px; ',
    `background-color: ${avatar.backgroundColor}; `,
    'display: inline-flex; ',
    'align-items: center; ',
    'justify-content: center; ',
    'overflow: hidden; ',
    'flex-shrink: 0;',
    '">',
    `<img src="${escapeAttribute(faceSrc)}" alt="${escapeAttribute(alt)}" style="`,
    `width: ${imageSize}px; `,
    `height: ${imageSize}px; `,
    'object-fit: contain;',
    '">',
    '</div>',
  ].join('');
}

function createAvatarResult({
  seed,
  hash,
  faces,
  colors,
  faceIndex,
  backgroundColorIndex,
}) {
  return {
    seed,
    hash,
    face: faces[faceIndex],
    faceIndex,
    faceName: LINE_FACE_NAMES[faceIndex] || `face${faceIndex + 1}`,
    backgroundColor: colors[backgroundColorIndex],
    backgroundColorIndex,
  };
}

function normalizeCollection(value, fallback, label) {
  const collection = value ?? fallback;

  if (!Array.isArray(collection) || collection.length === 0) {
    throw new Error(`whoami-picasso expected ${label} to be a non-empty array.`);
  }

  return collection;
}

function randomIndex(length, random) {
  const value = Number(random());

  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(length - 1, Math.max(0, Math.floor(value * length)));
}

function normalizeSize(size) {
  const value = Number(size);
  return Number.isFinite(value) && value > 0 ? value : 40;
}

function normalizeScale(scale) {
  const value = Number(scale);
  return Number.isFinite(value) && value > 0 ? value : 0.9;
}

function trimTrailingSlash(path) {
  return String(path).replace(/\/+$/, '');
}

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
