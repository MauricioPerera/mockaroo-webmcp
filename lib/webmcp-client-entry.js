import * as FastWebMcp from 'fastwebmcp';
import { z } from 'zod';

export { FastWebMcp, z };
if (typeof window !== 'undefined') {
  window.FastWebMcp = FastWebMcp;
  window.z = z;
}
