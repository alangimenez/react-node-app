const accountRepository = require('../repository/daos/accountDao');

class AccountService {
    constructor() {}

    async newAccount (request) {
        let account;
        if (typeof(request) == 'string') {
            account = JSON.parse(request)
        } else {
            account = request
        }

        const result = await accountRepository.subirInfo(account)
        return ({"message": "ok"})
    }

    async updateBalance (amount, account, operation) {
        const accountInfo = await accountRepository.getAccountByName(account);
        operation == "add" ? accountInfo[0].balance = accountInfo[0].balance + amount : accountInfo[0].balance = accountInfo[0].balance - amount
        await accountRepository.updateBalance(account, accountInfo[0].balance)
        return ({"message": "ok"})
    }

}

const accountService = new AccountService()

module.exports = accountService