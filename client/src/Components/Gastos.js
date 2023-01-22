import ModalNewExpense from "./Expenses/ModalNewExpense"
import ExpensesTables from "./Expenses/ExpensesTable"

function Gastos () {
    return (
        <div>
            <ModalNewExpense />
            <ExpensesTables />
        </div>
    )
}

export default Gastos