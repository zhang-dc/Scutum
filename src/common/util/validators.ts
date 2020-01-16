function limitLength(min: number, max: number): (str: string) => boolean {
  return function(str: string) {
    return !!str && str.length >= min && str.length <= max
  }
}

function required(str: string): boolean {
  return !!str && str.length > 0
}

function validatePassword(password: string): boolean {
  return !!password && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9#?!@$%^&*-]{8,}$/.test(password)
}

function validateEmail(email: string): boolean {
  const re: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  return !!email && re.test(email)
}

export {
  limitLength,
  required,
  validatePassword,
  validateEmail,
}