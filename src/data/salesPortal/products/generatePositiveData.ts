import { faker } from "@faker-js/faker";

export const productCreationPositiveChecks = [
  {
    testName: "name min length ",
    ProductData: { name: faker.string.alphanumeric({ length: 3 }) }
  },
  {
    testName: "name max length ",
    ProductData: { name: faker.string.alphanumeric({ length: 40 }) }
  },
  {
    testName: "name with one space",
    ProductData: { name: `${faker.string.alphanumeric({ length: 3 })} ${faker.string.alphanumeric({ length: 3 })}` }
  },
  {
    testName: "price min",
    ProductData: { price: 1 }
  },
  {
    testName: "price max",
    ProductData: { price: 99999 }
  },
  {
    testName: "amount min",
    ProductData: { amount: 0 }
  },
  {
    testName: "amount max",
    ProductData: { amount: 999 }
  },
  {
    testName: "notes min length",
    ProductData: { notes: "" }
  },
  {
    testName: "notes max length",
    ProductData: { notes: faker.string.alphanumeric({ length: 250 }) }
  },
];