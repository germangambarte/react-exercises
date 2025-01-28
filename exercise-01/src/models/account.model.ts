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
        errors: 'El importe ingresado debe ser mayor a $0,00'
      }
    }
    this._balance += amount
    return {
      data: this._balance,
      errors: null
    }
  }

  tryExtract(amount: number) {
    if (amount < 0) {
      return {
        data: null,
        errors: 'El importe ingresado debe ser mayor a $0,00'
      }
    }
    if (amount > this._balance) {
      return {
        data: null,
        errors: 'Saldo insuficiente para realizar la transacción'
      }
    }

    this._balance -= amount
    return {
      data: this._balance,
      errors: null
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
