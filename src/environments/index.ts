import environmentProd from './environment.prod';
import environmentDev from './environment';

export const environment = process.env.NODE_ENV === 'production' ? environmentProd : environmentDev;
