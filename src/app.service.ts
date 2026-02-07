/**
 * @author TRNAME (https://github.com/TRNAME)
 * @license MIT
 * @copyright 2026 TRNAME
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      name: 'nest6d',
      author: 'TRNAME',
      repository: 'https://github.com/TRNAME/nest6d',
      license: 'MIT © 2026 TRNAME',
    };
  }
}
