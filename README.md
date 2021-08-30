![LOGO](./NavBarLogo.png) <br />
made by Nick W, Quiahn B, Ivan L

## `Urls`
- [Back End GitHub Link](https://github.com/NIQ-Project/niq-backend "Monthly's Back-End Repository")
- [Deployed Site](https://niq-project.github.io/niq/ "Monthly Website")
- [Back-End](https://git.heroku.com/monthly-backend.git "Monthly's Back-End Website")

## `Pitch`
Got a bucket list of things to do before the end of the month? Use Monthly! Monthly is a service that helps you track all of your monthly goals and tasks by oraganizing every month into a list.

## `How It Works`
Users get started by creating an account then logging in. From there they are able to create lists and assign them a month, then create tasks within their lists.

## `Project Goals`
Our goals for this project is to work as an agile team and work together to problem solve, code, and squash bugs for our app that helps people keep track of their bucket list.

## `API Routes`

### `/sign-up`
- Used for signing up a user
- Method: POST
- Expects:
  - Email, Password, Password Confirmation
  - Example:
``` js
const signUp = (credentials) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/sign-up/',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}
```

### `/sign-in`
- Used for signing in a user
- Method: POST
- Expects:
  - Email, Password
  - Example:
``` js
const signIn = (credentials) => {
  return axios({
    url: apiUrl + '/sign-in/',
    method: 'POST',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}
```

### `/sign-out`
- Used for signing out a user
- Method: DELETE
- Expects:
  - User Token
  - Example:
``` js
const signOut = (user) => {
  return axios({
    url: apiUrl + '/sign-out/',
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
```

### `/change-password`
- Used for changing a users password
- Expects:
  - User Token, Old Password, New Password
  - Example:
``` js
const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-password/',
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}
```

### `/lists`
- Used for show all list
- Method: GET
- Expects: 
  - User Token
  - Example:
``` js
const indexList = (user) => {
  return axios({
    url: apiUrl + '/lists',
    method: 'get',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
```

### `/lists`
- Used to create a list 
- Method: POST
- Expects:
  - User Token
  - Example:
``` js
const createList = (data, user) => {
  return axios({
    url: apiUrl + '/lists',
    method: 'post',
    data: { list: data },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
```

### `/lists/:id`
- Used for getting a single list
- Method: GET
- Expects:
  - User Token
  - Example:
``` js
const showList = (id, user) => {
  return axios({
    url: apiUrl + '/lists/' + id,
    method: 'get',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
```

### `/lists/:id`
- Used to update a list
- Method: PATCH
- Expects:
  - User Token, List Name, List Month
  - Example:
``` js
const updateList = (listData, id, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/lists/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: { list: listData }
  })
}
```

### `/lists/:id`
- Used for deleting a list
- Method: DELETE
- Expects:
  - User Token
  - Example:
``` js
const deleteList = (id, user) => {
  return axios({
    url: apiUrl + '/lists/' + id,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
```

### `/tasks/:id`
- Used for creating a task
- Method: POST
- Expects:
  - User Token
  - Example:
``` js
const createTask = (id, data, user) => {
  return axios({
    url: apiUrl + '/tasks/' + id,
    method: 'post',
    data: { task: data },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
```

### `/tasks/:id/:taskId`
- Used for showing task
- Method: GET
- Expects:
  - User Token
  - Example:
``` js
const showTask = (id, user, taskId) => {
  return axios({
    url: apiUrl + '/tasks/' + id + '/' + taskId,
    method: 'get',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
```

### `/tasks/:id/:taskId`
- Used for updating a task
- Method: PATCH
- Expects:
  - User Token, Task Name, Task Done
  - Example:
``` js
const updateTask = (taskData, id, user, taskId) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/tasks/' + id + '/' + taskId,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: { task: taskData }
  })
}
```

### `/tasks/:id/:taskId`
- Used for deleting a task
- Method: DELETE
- Expects:
  - User Token
  - Example:
``` js
const deleteTask = (id, user, taskId) => {
  return axios({
    url: apiUrl + '/tasks/' + id + '/' + taskId,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
```



## `ERD`
A user has a many list and the list has many items.
![ERD Image](https://i.imgur.com/VAtPHTv.png)

## `Planning Time Table`

### Day 1:
- Plan for project
- Download api template
- Set up api template 
- Download front-end template
- Set up front-end template

### Day2:
- Start back-end routes and test with postman
- Start front-end

### Day3:
- Keep working on front-end and back-end
- plan for styling

### Day 4:
- Finish front-end
- Finish back-end
- Start styling

### Day 5-7
- Complete Styling

## `Technology Used`

### React
### Axios
### Bootstrap
### SASS
### Express
### Mongoose
### Mongo
### Passport
### JWT
### BCrpyt


## `Unsolved Problems`

- Signing up automatically signs user in but doesn't save the log in
- Remember me feature needs to be reworked
- Website's styling isn't complete
- User can edit list after the month it's created
