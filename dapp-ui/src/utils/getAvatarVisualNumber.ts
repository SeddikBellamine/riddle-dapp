export function getAvatarVisualNumber({ address }: { address: string }) {
  return `Avatar${Number(address) % 13}.png`;
}
