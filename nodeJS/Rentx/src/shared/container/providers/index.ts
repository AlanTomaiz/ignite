import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DateProvider } from './DateProvider/implementations';

// IDateProvider
container.registerSingleton<IDateProvider>('DateProvider', DateProvider);
