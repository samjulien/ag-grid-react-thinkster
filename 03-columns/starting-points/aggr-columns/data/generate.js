module.exports = () => {
  const data = {
    accounts: []
  };

  const faker = require("faker");

  for (let account = 0; account < 500; account++) {
    const id = data.accounts.length + 1;
    data.accounts.push({
      id,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.image.avatar(),
      company: faker.company.companyName(),
      title: faker.name.title(),
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode(),
      accountNumber: faker.finance.account(),
      accountName: faker.finance.accountName(),
      amount: faker.finance.amount()
    });
  }

  return data;
};
