import { Actions } from '../App'
import { Account } from '../models/account.model'

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChangeAmount: (e: React.ChangeEvent<HTMLInputElement>) => void
  selectedAccount: Account | null
  amountOperation: number | null
  setSelectedAction: React.Dispatch<React.SetStateAction<Actions>>
}
export const TransactionForm: React.FC<Props> = ({
  handleSubmit,
  handleChangeAmount,
  selectedAccount,
  amountOperation,
  setSelectedAction,
}) => {
  return (
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
  )
}
