export type AvatarSeed = string | number | null | undefined;

export interface AvatarOptions<Face = string> {
  faces?: readonly Face[];
  colors?: readonly string[];
}

export interface RandomAvatarOptions<Face = string> extends AvatarOptions<Face> {
  random?: () => number;
}

export interface AvatarData<Face = string> {
  seed: string | null;
  hash: number | null;
  face: Face;
  faceIndex: number;
  faceName: string;
  backgroundColor: string;
  backgroundColorIndex: number;
}

export interface AvatarHtmlOptions<Face = string> extends AvatarOptions<Face> {
  alt?: string;
  assetBasePath?: string;
  className?: string;
  imageScale?: number;
  showBackground?: boolean;
  size?: number;
}

export const LINE_FACE_NAMES: readonly string[];
export const LINE_FACE_FILENAMES: readonly string[];
export const DEFAULT_FACE_IMAGE_PATHS: readonly string[];
export const DEFAULT_BACKGROUND_COLORS: readonly string[];

export function hashSeed(seed: AvatarSeed): number;
export function getAvatar<Face = string>(
  seed: AvatarSeed,
  options?: AvatarOptions<Face>,
): AvatarData<Face>;
export function getRandomAvatar<Face = string>(
  options?: RandomAvatarOptions<Face>,
): AvatarData<Face>;
export const getProfilePicture: typeof getAvatar;
export const getRandomProfilePicture: typeof getRandomAvatar;
export function getAvatarImageSrc<Face = string>(
  avatar: AvatarData<Face>,
  options?: { assetBasePath?: string },
): Face | string;
export function renderAvatarHtml(seed: AvatarSeed, options?: AvatarHtmlOptions): string;
