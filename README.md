# HoudiMonster Frontend

The **HoudiMonster Frontend** is a React + TypeScript application built with Vite. It provides a user interface for browsing, searching, and accessing detailed information about Monster Energy drinks sourced from the HoudiMonster API.

## Application Routes

The following routes are used throughout the application:

| Route         | Description                                                         |
| ------------- | ------------------------------------------------------------------- |
| `/`           | Homepage displaying the Monster catalogue with search functionality |
| `/catalog`    | Full product catalogue overview                                     |
| `/flavors`    | List of available flavors                                           |
| `/type/:type` | Filtered view of Monster drinks based on type                       |
| `/contact`    | Contact page                                                        |
| `/:id`        | Detailed information for a specific Monster drink                   |

## API Types

The frontend consumes TypeScript types auto-generated from the Backend API.

You can generate these types by running:

```bash
npm run generate:api
```

The generated API types are located at:

```sh
./src/types/api-types.ts
```

> The file is automatically regenerated after every backend commit.

## Installation

### Add .env.local File

Create a `.env.local` file in the root directory with the following content:

```env
BACKEND_PATH="C:\Users\example\Documents\monster-back"
```

The link should be an absolute path to your local HoudiMonster Backend repository.

⚠️ Make sure the backend is pulled at its latest commit for the frontend to be up to date.

### Install Dependencies

```bash
npm install
```

## Running the Application

### Development

```bash
npm run dev
```

## Features

* Full catalogue display of Monster Energy products
* Filtering and search capabilities
* Detailed product information pages
* Integration with HoudiMonster Backend API
* Strong typing and type-safe API consumption
