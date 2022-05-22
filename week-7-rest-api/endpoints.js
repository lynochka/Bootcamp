const endpoints = [
  {
    name: "GET /trips",
    description: "List all the trips",
  },
  {
    name: "POST /trips",
    description: "Create a new trip",
    parameters: [
      { name: "user", description: "*required* the id of the user" },
      { name: "name", description: "*required* the name of the trip" },
      {
        name: "start_date",
        description: "(optional) the starting date of the trip",
      },
      {
        name: "end_date",
        description: "(optional) the end date of the trip",
      },
    ],
  },
  {
    name: "GET /trips/:id",
    description: "Get the details of a trip, including expenses",
    parameters: [
      {
        name: "id",
        description: "*required* the number that identifies the trip",
      },
    ],
    response: `

    `,
  },
  {
    name: "PUT /trips/:id",
    description: "Edit a trip",
    parameters: [
      {
        name: "id",
        description: "*required* the number that identifies the trip",
      },
      { name: "name", description: "(optional) the name of the trip" },
      {
        name: "start_date",
        description: "(optional) the starting date of the trip",
      },
      {
        name: "end_date",
        description: "(optional) the end date of the trip",
      },
    ],
  },
  {
    name: "DELETE /trips/:id",
    description: "Delete a trip",
    parameters: [
      {
        name: "id",
        description: "*required* the number that identifies the trip",
      },
    ],
  },
  {
    name: "POST /expenses",
    description: "Create a new expense",
    parameters: [
      {
        name: "trip",
        description: "*required* the number that identifies the trip",
      },
      { name: "name", description: "*required* the name of the expense" },
      { name: "date", description: "*required* the date of the expense" },
      { name: "amount", description: "*required* the amount of the expense" },
      {
        name: "currency",
        description: "*required* the currency of the expense",
      },
    ],
  },
  {
    name: "GET /expenses/:id",
    description: "Get the details of an expense",
    parameters: [
      {
        name: "id",
        description: "*required* the number that identifies the expense",
      },
    ],
  },
  {
    name: "PUT /expenses/:id",
    description: "Edit an expense",
    parameters: [
      {
        name: "id",
        description: "*required* the number that identifies the expense",
      },
      {
        name: "trip",
        description: "(optional) the number that identifies the trip",
      },
      { name: "name", description: "(optional) the name of the expense" },
      { name: "date", description: "(optional) the date of the expense" },
      { name: "amount", description: "(optional) the amount of the expense" },
      {
        name: "currency",
        description: "(optional) the currency of the expense",
      },
    ],
  },
  {
    name: "DELETE /expense",
    description: "Delete an expense",
    parameters: [
      {
        name: "id",
        description: "*required* the number that identifies the expense",
      },
    ],
  },
];

export default endpoints;
