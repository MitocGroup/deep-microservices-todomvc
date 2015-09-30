'use strict';
'format es6';

export class AbstractManager {
  constructor($q) {
    this.$q = $q;
    this._defer = this.$q.defer();
  }

  /**
   * @returns {defer}
   */
  get newDefer() {
    this._defer = this.$q.defer();
    return this._defer;
  }

  /**
   * @returns {defer}
   */
  get defer() {
    return this._defer;
  }

  /**
   * @param response
   * @returns {defer}
   */
  handleResponse(response) {
    if (response.isError) {
      this._defer.reject(response.error);
    } else {
      this._defer.resolve(response.data);
    }

    return this._defer;
  }
}
