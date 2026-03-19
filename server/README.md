# Birthmark

Birthmark is a web automation tool designed to automatically send birthday wishes to your loved ones. This tool leverages background jobs to identify active birthdays for the upcoming day and send personalized messages accordingly, ensuring you never miss a chance to celebrate the special moments of those who matter most to you.

## Installation

- Clone the repository: `git clone https://github.com/deedee-code/Birthmark.git`
- Navigate to the project directory: `cd Birthmark`
- Install Dependencies: `npm install`
- Configure the environment variables: Create a .env file in the root directory and add the necessary environment variables. Example:

```
PORT=your_port_number
SESSION_SECRET=your_session_secret
POSTGRES_USER=your_postgres_username
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_HOST=your_postgres_host
POSTGRES_DATABASE=your_postgres_database
```

- Run the server: `npm run dev`

## Usage

- User Signup/Signin: Users registers or login with their generated API key.
- Create Celebrant: Users can create celebrants with their birthday details and their preferred mode of communication (Email, SMS, Automated_Call).
- Create Wishes: Users create and save birthday wishes for different celebrants.
- Create Background Job: A background job runs daily to check to check for birthdays happening he next day.
- Send Wishes: The system automatically sends the birthday wishes through the specified communication method.

## API Documentation

https://documenter.getpostman.com/view/26786258/2sA3JT1xKi

### Support

For any feedback or collaboration, please contact me on [LinkedIn](https://www.linkedin.com/in/doris-oladotun-owoeye-84a38014b/)
