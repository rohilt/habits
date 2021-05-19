# habits :repeat:

## Project goals

This project aims to provide a web application for users to track and visualize the development of any habits (e.g., reading, exercising).
Rather than create a proprietary application to input data, the user can track their progress in a flexible plain-text format.
The user can then upload this file into the client-side web application (ensuring the privacy of user data), and view insights about their progress.

The priorities of this project are
- **Flexibility**. The plain-text grammar for the habits file is flexible enough for the user to both rapidly enter data while accommodating changes in data structure. 
- **Privacy**. The user's data is stored in their own plain-text file, and the web application *never* sends or records any of this data, beyond parsing the file and presenting insights to the user.
- **Responsive**. Large files (within reason) can be handled without significant delays.

## Project infrastructure

This project is based on the [SvelteJS template](https://github.com/sveltejs/template) with TypeScript.
It also uses TailwindCSS and the Jest testing framework.

### File grammar

The required file format is extremely flexible, as the examples below illustrate.

Suppose that we went bicycling for 1 hour, 45 minutes this morning.
We could record this information in the following way.

```
2021-01-01 Bicycling
  1 hour, 45 minutes
```
The file parser can also recognize variations of the words "minutes" or "hours", so equivalently, we could write

```
2021-01-01 Bicycling
  1 hr 45 mins
```

What if we wanted to keep track of some more information about this activity?
For instance, the number of miles bicycled, or the location?
We can easily extend this entry with arbitrary properties.

```
2021-01-01 Bicycling
  1 hour, 45 minutes
  :miles 20
  :location Gainesville-Hawthorne State Trail
```

We can choose any value for the arbitrary property names except `minutes`, since that is reserved to record the time values.
These properties can be numbers, strings, or booleans.

Numerical properties are also automatically summed up by the parser. For instance, we could have also written

```
2020-01-01 Bicycling
  1 hour
  :miles 12
  :location Gainesville-Hawthorne State Trail
  15 mins, 30 minutes
  :miles 8
```

### File parser

The file parser is written entirely in TypeScript, with extensive tests written in Jest.
Regular expressions are used to quickly parse the file, and parse errors are also reported.

**TODO** discuss parsing efficiency results

### Web application

The web application is written in Svelte with TypeScript, which is compiled to optimized JavaScript.
The entire web application runs on the client-side, since it does not need to communicate with a server to parse the file data and present visualizations/graphs.

## Running in development mode

To clone the repository,

```bash
git clone https://github.com/rohilt/habits.git
cd habits
npm install
```

and to run the app in development mode, 

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000) in order to view the app.
