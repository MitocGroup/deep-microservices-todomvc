declare const DeepFramework: any;

/**
 * Deep decorator
 * @param config
 */
export function Deep(config) {
  let resource;

  /**
   * Get initialized deep-resource
   * @returns {Promise}
   */
  function getResource(): Promise<any> {
    return new Promise(resolve => {
      if (resource) {
        return resolve(resource);
      }

      DeepFramework.Kernel.bootstrap(kernel => {
        kernel.get('security').anonymousLogin(() => {
          resource = kernel.get('resource').get(config.resource);
          resolve(resource);
        });
      });
    });
  }

  /**
   * Execute deep-request
   * @param {string} action
   * @param {object} payload
   * @returns {Promise}
   */
  function deepRequest(action: string, payload = {}): Promise<any> {
    return getResource().then(resource => {
      return new Promise((resolve, reject) => {
        resource.request(action, payload).send(response => {
          if (response.isError) {
            return reject(response.error);
          }

          resolve(response.data);
        });
      });
    });
  }

  return function (target) {
    target.prototype.deepRequest = deepRequest;
  }
}
