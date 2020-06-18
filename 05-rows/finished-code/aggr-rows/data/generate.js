module.exports = () => {
  const data = {
    accounts: [],
  };

  const faker = require("faker");

  for (let account = 0; account < 500; account++) {
    const id = data.accounts.length + 1;
    data.accounts.push({
      id,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      accountNumber: faker.finance.account(),
      dateOpened: faker.date.past(),
      accountName: faker.finance.accountName(),
      amount: faker.finance.amount(),
    });
  }

  return data;
};
