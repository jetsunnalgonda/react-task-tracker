import React from 'react'
import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
// import MyRoutes from './components/MyRoutes'

// import './App.css'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState(
    [
        // {
        //     id: 1,
        //     text: 'Doctors Appointment',
        //     day: 'Feb 5th at 2:30pm',
        //     reminder: true
        // },
        // {
        //     id: 2,
        //     text: 'Meeting at School',
        //     day: 'Feb 6th at 1:30pm',
        //     reminder: true
        // },
        // {
        //     id: 3,
        //     text: 'Food Shopping',
        //     day: 'Feb 5th at 2:30pm',
        //     reminder: false
        // }
    ]
  )

  useEffect( () => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
      // console.log('tasks:')
      // console.log(tasks)
      // console.log('tasksFromServer:')
      // console.log(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5500/tasks')
    const data = await res.json()
    // console.log('hello')
    // console.log(data)
    return data
  }
  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5500/tasks/${id}`)
    const data = await res.json()
    // console.log('hello')
    // console.log(data)
    return data
  }

  // Toggle Reminder
  // const toggleReminder = (id) => {
  //   setTasks(tasks.map((task) => task.id === id ? {...task, reminder:!task.reminder} : task))
  // }
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    // console.log(taskToToggle)
    // console.log(taskToToggle.reminder)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    const res = await fetch (`http://localhost:5500/tasks/${id} `, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
    
    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? {...task, reminder:data.reminder} : task))
  }
  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5500/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const newTask = await res.json()
  
    // const id = Math.floor(Math.random() * 1000) + 1
    // const newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch (`http://localhost:5500/tasks/${id}`, {method: 'DELETE'})
    // console.log('delete', id)
    setTasks(tasks.filter((task) => task.id !== id))
  }
  return (
    <Router>
      <div className='container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Routes>
          <Route
              path='/' exact
              element={
                <>
                  {showAddTask && <AddTask onAdd={addTask} />}
                  {tasks.length > 0 ? (
                    <Tasks
                      tasks={tasks}
                      onDelete={deleteTask}
                      onToggle={toggleReminder}
                    />
                  ) : (
                    'No Tasks To Show'
                  )}
                </>
              }
            />
          {/* {showAddTask && <AddTask onAdd={addTask} />}
          {tasks !== undefined && tasks.length > 0 ?
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>:
          'No Tasks to Show'} */}
          
          {/* <MyRoutes /> */}
          <Route path='/about' element={<About />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>

  )
}

export default App;
