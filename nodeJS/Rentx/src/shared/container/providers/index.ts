import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DateFNS } from './DateProvider/implementations/DateFNS';

import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMail';
import { ViewerHandlebars } from './ViewerProvider/implementation/Handlebars';
import { IViewerProvider } from './ViewerProvider/IViewerProvider';

// IDateProvider
container.registerSingleton<IDateProvider>('DateProvider', DateFNS);

// IMailProvider
container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);

// IViewerProvider
container.registerSingleton<IViewerProvider>(
  'ViewerProvider',
  ViewerHandlebars,
);
