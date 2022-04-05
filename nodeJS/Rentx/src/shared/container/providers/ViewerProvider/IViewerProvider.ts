interface IViewerProvider {
  parseHtmlToString(path: string, variables: object): string;
}

export { IViewerProvider };
