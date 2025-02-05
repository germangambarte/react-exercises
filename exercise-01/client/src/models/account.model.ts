const VALID_GENRES = [20, 23, 27, 30]
const VALIDATION_FACTORS = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]
export class Account {
  private _id: number
  private _cuil: string
  private _firstName: string
  private _lastName: string
  private _balance: number

  constructor(
    id: number,
    cuil: string,
    firstName: string,
    lastName: string,
    balance: number
  ) {
    this._id = id
    this._cuil = cuil
    this._firstName = firstName
    this._lastName = lastName
    this._balance = balance
  }

  tryDeposit(amount: number) {
    if (amount < 0) {
      return {
        data: null,
        info: {
          type: 'ERROR',
          message: 'El importe ingresado debe ser mayor a $0,00'
        }
      }
    }
    this._balance += amount
    return {
      data: this._balance,
      info: {
        type: 'SUCCESS',
        message: 'La trasacción se realizó con éxito'
      }
    }
  }

  tryExtract(amount: number) {
    if (amount < 0) {
      return {
        data: null,
        info: {
          type: 'ERROR',
          message: 'El importe ingresado debe ser mayor a $0,00'
        }
      }
    }
    if (amount > this._balance) {
      return {
        data: null,
        info: {
          type: 'ERROR',
          message: 'Saldo insuficiente para realizar la transacción'
        }
      }
    }

    this._balance -= amount
    return {
      data: this._balance,
      info: {
        type: 'SUCCESS',
        message: 'La trasacción se realizó con éxito'
      }
    }
  }

  static verifyCuil(cuil: string) {
    if (cuil.length != 11) {
      return {
        data: false,
        info: {
          type: 'ERROR',
          message: 'El número de cuil debe contener 11 dígitos'
        }
      }
    }
    const validationDigit = Number(cuil.substring(10))
    const genre = Number(cuil.substring(0, 2))
    if (!VALID_GENRES.includes(genre)) {
      return {
        data: false,
        info: {
          type: 'ERROR',
          message: 'Cuil no válido. (no valid genre)'
        }
      }
    }

    let result = 0
    for (let i = 0; i < VALIDATION_FACTORS.length; i++) {
      result += Number(cuil[i]) * VALIDATION_FACTORS[i]
    }
    const restOfResult = result % 11

    if (restOfResult === 0 && validationDigit === 0) {
      return {
        data: true,
        info: null
      }
    }

    if (
      restOfResult === 1 &&
      genre === 23 &&
      (validationDigit === 9 || validationDigit === 4)
    ) {
      return {
        data: true,
        info: null
      }
    }
    if (validationDigit === 11 - restOfResult) {
      return {
        data: true,
        info: null
      }
    } else {
      return {
        data: false,
        info: { type: 'ERROR', message: 'Cuil no válido' }
      }
    }
  }

  getAccountData() {
    return {
      id: this._id,
      cuil: this._cuil,
      lastName: this._lastName,
      firstName: this._firstName,
      balance: this._balance
    }
  }

  get id() {
    return this._id
  }

  get cuil() {
    return this._cuil
  }

  get firstName() {
    return this._firstName
  }

  get lastName() {
    return this._lastName
  }

  get balance() {
    return this._balance
  }
}
