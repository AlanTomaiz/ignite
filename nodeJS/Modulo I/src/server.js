const express = require('express');
const { v4: uuidv4 } = require('uuid');

const PORT = 3333 || process.env.PORT;

const app = express();
app.use(express.json());

const customers = [];

// Middleware
verifyIfExistsAccountCPF = (request, response, next) => {
  const { cpf } = request.headers;

  const customer = customers.find(customer => customer.cpf === cpf);
  if (!customer) {
    return response.status(400).json({ error: "Customer not found!" });
  }

  request.customer = customer;
  return next();
}

getBalance = (statements) => {
  return statements.reduce((total, operation) => {
    if (operation.type === 'deposit') {
      return total + operation.amount;
    }

    return total - operation.amount
  }, 0);
}

app.post('/account', (request, response) => {
  const { cpf, name } = request.body;

  const costumerAlreadyExists = customers.some(customer => customer.cpf === cpf);

  if (costumerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!" });
  }

  customers.push({
    id: uuidv4(),
    name,
    cpf,
    statement: []
  });

  return response.status(201).send();
});

app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
  const { statement } = request.customer;

  return response.json([...statement]);
});

app.post('/deposit', verifyIfExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    type: 'deposit',
    created_at: new Date(),
  };

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.post('/withdraw', verifyIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);
  if (balance < amount) {
    return response.status(400).json({ error: "Insuffient balance!" });
  }

  const statementOperation = {
    amount,
    type: 'debit',
    created_at: new Date(),
  }

  customer.statement.push(statementOperation);
  return response.status(201).send();
});

app.get('/statement/date', verifyIfExistsAccountCPF, (request, response) => {
  const { date } = request.query;
  const { customer } = request;

  const dateFormat = new Date(`${date} 00:00`);

  const statements = customer.statement.filter(statement => statement.created_at.toDateString() === new Date(dateFormat).toDateString());

  return response.json(statements);
});

app.put('/account', verifyIfExistsAccountCPF, (request, response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;

  return response.status(201).send();
});

app.get('/account', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer);
});

app.delete('/account', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  customer.splice(customer, 1);

  return response.status(204).send();
});

app.get('/balance', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  const balance = getBalance(customer.statement);

  return response.json({ balance });
});

app.listen(PORT, () => console.log(`Server start on port ${PORT}.`));