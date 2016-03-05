'use strict';

import DeepFramework from 'deep-framework';
import Handler from './Handler';

export default {
  handler: (event, context) => {
    DeepFramework.KernelFromLambdaContext(context).bootstrap((deepKernel) => {
        new Handler(deepKernel).run(event, context);
    });
  },
};
