export function BuildRoutePath(path) {
  const regex = /:([a-zA-Z]+)/
  const parsedPath = path.replace(regex, '(?<$1>[a-z0-9\-_]+)')

  return new RegExp(parsedPath)
}
