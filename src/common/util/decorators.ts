import { debounce as _debounce } from 'lodash'

/**
 * Wraps a function with lodash.debounce.
 *
 * WARNING: timer is shared by all instances of the same prototype.
 * See https://engineering.datorama.com/be-aware-of-the-debounce-decorator-6fb24a6d8d5
 *
 * @param {number} wait The number of milliseconds to delay.
 * @param options The options object.
 * @param {boolean} options.leading Specify invoking on the leading edge of the timeout.
 * @param {number} options.maxWait The maximum time func is allowed to be delayed before it’s invoked.
 * @param {boolean} options.trailing Specify invoking on the trailing edge of the timeout.
 * @returns Returns the new debounced function.
 */
function debounce(wait?: number, options= {}): (...args: any) => any {
  return function(target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor): PropertyDescriptor {
    propertyDescriptor.value = _debounce(propertyDescriptor.value, wait, options)
    return propertyDescriptor
  }
}

export {
  debounce,
}
