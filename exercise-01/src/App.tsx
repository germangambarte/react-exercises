import { useState } from 'react'
import { Account } from './models/account.model'
import * as React from 'react'

type Actions = 'EXTRACT' | 'DEPOSIT'

export const App: React.FC = () => {
  //TODO: Agregar cuentas de manera dinámica
  const [accounts] = useState<Account[]>([
    new Account(1, '20123456786', 'Micaela', 'Farias', 123),
    new Account(2, '20410266920', 'German', 'Gambarte', 123)
  ])
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [selectedAction, setSelectedAction] = useState<Actions | null>(null)
  const [amountOperation, setAmountOperation] = useState<number | null>(null)

  function handleClick(id: number) {
    const findAccount = accounts.find((account) => account.id == id)
    setSelectedAccount(findAccount)
  }

  function handleChangeAmount(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number.isNaN(e.target.value) ? null : e.target.valueAsNumber
    setAmountOperation(value)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //TODO: Actualizar los valores al momento de realizar la acción
    //TODO: Mostrar Errores en caso de haberlos
    e.preventDefault()
    switch (selectedAction) {
      case 'DEPOSIT':
        selectedAccount.tryDeposit(amountOperation)
        break
      case 'EXTRACT':
        selectedAccount.tryExtract(amountOperation)
        break
    }
  }
  return (
    <>
      <h1 className="text-4xl font-bold text-center py-4">
        Administrador de cuentas
      </h1>
      <main className="max-w-[1200px] mx-auto flex justify-around">
        <div className="flex-1 flex flex-col gap-4">
          {accounts.map((account) => (
            <button
              key={account.id}
              className="bg-slate-100 p-4 shadow-md cursor-pointer hover:bg-slate-200/60 rounded-xl"
              onClick={() => handleClick(account.id)}
            >
              {account.firstName} {account.lastName}
            </button>
          ))}
        </div>
        <div className="flex-1">
          {selectedAccount ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center gap-4 mb-8"
            >
              <input
                type="number"
                name="amount"
                placeholder="0"
                onChange={handleChangeAmount}
                value={amountOperation ?? ''}
                className="w-md text-center mt-4 text-8xl outline-none border-b-2
                    [appearance:textfield]
                    [&::-webkit-outer-spin-button]:appearance-none
                    [&::-webkit-inner-spin-button]:appearance-none"
              />
              <p className="text-black/60">
                Saldo disponible: $ {selectedAccount.balance.toFixed(2)}
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setSelectedAction('EXTRACT')}
                  className="bg-blue-500 hover:bg-blue-500/60 p-4 text-white font-bold rounded-xl cursor-pointer"
                >
                  Extraer Dinero
                </button>
                <button
                  onClick={() => setSelectedAction('DEPOSIT')}
                  className="bg-blue-500 hover:bg-blue-500/60 p-4 text-white font-bold rounded-xl cursor-pointer"
                >
                  Depositar Dinero
                </button>
              </div>
            </form>
          ) : (
            <p className="text-center">
              Para realizar una operación, primero selecciones una cuenta.
            </p>
          )}
        </div>
      </main>
    </>
  )
}
