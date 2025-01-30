interface Props {
  handleAddNewAccount: (e: React.FormEvent<HTMLFormElement>) => void
  handleChangeAddNewAccountState: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
}
export const AddAccountForm: React.FC<Props> = ({
  handleAddNewAccount,
  handleChangeAddNewAccountState
}) => {
  return (
    <form className="flex flex-col p-8" onSubmit={handleAddNewAccount}>
      <label htmlFor="firstName">Nombre:</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        className="mb-4 outline-none border-2 border-slate-300 rounded-lg p-2 focus:border-blue-500 focus:border-2"
        onChange={handleChangeAddNewAccountState}
        required
      />
      <label htmlFor="lastName">Apellido:</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        className="mb-4 outline-none border-2 border-slate-300 rounded-lg p-2 focus:border-blue-500 focus:border-2"
        onChange={handleChangeAddNewAccountState}
        required
      />
      <label htmlFor="cuil">Cuil:</label>
      <input
        type="text"
        name="cuil"
        id="cuil"
        className="mb-4 outline-none border-2 border-slate-300 rounded-lg p-2 focus:border-blue-500 focus:border-2"
        onChange={handleChangeAddNewAccountState}
        required
      />
      <label htmlFor="balance">Saldo:</label>
      <input
        type="number"
        name="balance"
        id="balance"
        className="mb-4 outline-none border-2 border-slate-300 rounded-lg p-2 focus:border-blue-500 focus:border-2
                           [appearance:textfield]
                           [&::-webkit-outer-spin-button]:appearance-none
                           [&::-webkit-inner-spin-button]:appearance-none"
        onChange={handleChangeAddNewAccountState}
        required
      />
      <button
        type="submit"
        className="bg-blue-700 hover:bg-blue-800 p-4 text-white font-bold rounded-xl cursor-pointer"
      >
        Agregar
      </button>
    </form>
  )
}
