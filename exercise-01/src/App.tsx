import { useState } from 'react'
import { Account } from './models/account.model'
import * as React from 'react'
import { TransactionForm } from './components/transaction-form'
import { AddAccountForm } from './components/add-account-form'

export type Actions =
  | 'EXTRACT'
  | 'DEPOSIT'
  | 'ADD-ACCOUNT'
  | 'SHOW-ADD-ACCOUNT-FORM'
  | 'SHOW-TRASACTION-FORM'

export type ErrorTypes = 'SUCCESS' | 'ERROR'

export const App: React.FC = () => {
  //TODO: Agregar cuentas de manera dinámica
  const [accounts, setAccounts] = useState<Account[]>([
    new Account(1, '20123456786', 'Micaela', 'Farias', 123),
    new Account(2, '20123123124', 'German', 'Gambarte', 123)
  ])
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [selectedAction, setSelectedAction] = useState<Actions | null>(null)
  const [amountOperation, setAmountOperation] = useState<number | null>(null)
  const [newAccountData, setNewAccountData] = useState({
    cuil: '',
    firstName: '',
    lastName: '',
    balance: 0
  })
  const [info, setInfo] = useState<{
    type: string
    message: string
  } | null>(null)

  function handleClick(id: number) {
    const findAccount = accounts.find((account) => account.id == id)
    if (!findAccount) {
      setInfo({ type: 'ERROR', message: 'Cuenta no encontrada.' })
      return
    }
    setSelectedAccount(findAccount)
    setAmountOperation(null)
    setSelectedAction('SHOW-TRASACTION-FORM')
  }

  function handleChangeAmount(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.valueAsNumber
    setAmountOperation(Number.isNaN(value) ? null : value)
  }

  function handleChangeAddNewAccountState(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = e.target.value
    setNewAccountData({
      ...newAccountData,
      [e.target.name]: e.target.type === 'text' ? value : Number(value)
    })
  }

  function handleAddNewAccount(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { data, info } = Account.verifyCuil(newAccountData.cuil)
    if (
      newAccountData.firstName.length < 2 ||
      newAccountData.lastName.length < 1
    ) {
      setInfo({
        type: 'ERROR',
        message: 'El nombre y apellido debe tener mínimo 2 caracteres'
      })
      return
    }
    if (!data) {
      setInfo(info)
      return
    }
    const newAccount = new Account(
      accounts.length + 1,
      newAccountData.cuil,
      newAccountData.firstName,
      newAccountData.lastName,
      newAccountData.balance
    )
    setInfo(null)
    setSelectedAction(null)
    setAccounts([...accounts, newAccount])
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selectedAction || !amountOperation || amountOperation <= 0) {
      setInfo({ type: 'ERROR', message: 'Ingrese un monto válido.' })
      return
    }
    if (selectedAction == 'DEPOSIT') {
      const { info } = selectedAccount.tryDeposit(amountOperation)
      if (info?.type === 'ERROR') {
        setInfo(info)
      }
    }
    if (selectedAction == 'EXTRACT') {
      const { info } = selectedAccount.tryExtract(amountOperation)
      if (info?.type === 'ERROR') {
        setInfo(info)
      }
    }
    setInfo(info)
    setAmountOperation(null)
  }
  return (
    <>
      <h1 className="text-4xl font-bold text-center py-4">
        Administrador de cuentas
      </h1>
      <main className="max-w-[1200px] mx-auto flex justify-around">
        <div className="flex-1 flex flex-col gap-4 mt-8">
          {accounts.map((account) => (
            <button
              key={account.id}
              className="bg-slate-100 p-4 shadow-md cursor-pointer hover:bg-slate-200 rounded-xl"
              onClick={() => handleClick(account.id)}
            >
              {account.firstName} {account.lastName}
            </button>
          ))}
          <button
            className="bg-blue-700 px-4 py-2 shadow-md cursor-pointer text-white font-bold hover:bg-blue-800 rounded-xl"
            onClick={() => setSelectedAction('SHOW-ADD-ACCOUNT-FORM')}
          >
            +
          </button>
        </div>
        <div className="flex-1">
          {selectedAction === 'SHOW-ADD-ACCOUNT-FORM' && (
            <AddAccountForm
              handleAddNewAccount={handleAddNewAccount}
              handleChangeAddNewAccountState={handleChangeAddNewAccountState}
            />
          )}
          {selectedAction !== 'SHOW-ADD-ACCOUNT-FORM' && selectedAccount && (
            <TransactionForm
              handleSubmit={handleSubmit}
              handleChangeAmount={handleChangeAmount}
              selectedAccount={selectedAccount}
              amountOperation={amountOperation}
              setSelectedAction={setSelectedAction}
            />
          )}
          {!selectedAction && (
            <p className="max-w-lg mx-auto mt-4 bg-slate-500/20 text-slate-800 border-1 border-slate-800 rounded-xl p-4 text-center">
              Para realizar una operación, primero selecciones una cuenta.
            </p>
          )}
          {info?.type === 'ERROR' && (
            <p className="max-w-lg mx-auto text-center bg-red-500/20 text-red-500 border-1 border-red-500 rounded-xl p-4">
              {info.message}
            </p>
          )}
          {info?.type === 'SUCCESS' && (
            <p className="max-w-lg mx-auto text-center bg-green-500/20 text-green-500 border-1 border-green-500 rounded-xl p-4">
              La transación se realizó con éxito.
            </p>
          )}
        </div>
      </main>
    </>
  )
}
