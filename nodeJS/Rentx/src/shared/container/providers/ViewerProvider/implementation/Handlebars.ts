import handlebars from 'handlebars';
import fs from 'fs';

import { IViewerProvider } from '../IViewerProvider';

class ViewerHandlebars implements IViewerProvider {
  parseHtmlToString(path: string, variables: object): string {
    const templateContent = fs.readFileSync(path).toString('utf8');
    const template = handlebars.compile(templateContent);
    return template(variables);
  }
}

export { ViewerHandlebars };
