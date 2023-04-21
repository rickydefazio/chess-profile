export default function cleanUsername(username: string) {
  return username.trimStart().trimEnd().replace(/\s+/g, '-').toLowerCase();
}
