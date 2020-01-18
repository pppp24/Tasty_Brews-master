'use strict';

/**
 * Orders.js controller
 *
 * @description: A set of functions called "actions" for managing `Orders`.
 */

module.exports = {

  /**
   * Retrieve orders records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.orders.search(ctx.query);
    } else {
      return strapi.services.orders.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a orders record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.orders.fetch(ctx.params);
  },

  /**
   * Count orders records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.orders.count(ctx.query, populate);
  },

  /**
   * Create a/an orders record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.orders.add(ctx.request.body);
  },

  /**
   * Update a/an orders record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.orders.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an orders record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.orders.remove(ctx.params);
  }
};
