// /users/:id
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const pathWithRegex = path.replaceAll(routeParametersRegex, '(?<$1>[a-zA-Z0-9\-_]+)')

  return new RegExp(`^${pathWithRegex}(?<query>\\?(.*))?$`)
}
