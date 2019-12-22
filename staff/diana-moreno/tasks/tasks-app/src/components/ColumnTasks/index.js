import React, {useState, useEffect, useRef} from 'react'
import Card from '../Card'
import createTask from '../../logic/create-task'
import listTasks from '../../logic/list-tasks'

export default function ({status}) {
  const cards = [{title: 'card1', status:'TODO'}, {title: 'card1', status:'DONE'}]
  const modifier = status.toLowerCase()
  const { token } = sessionStorage
  const [tasks, setTasks] = useState([])
  const [newCard, setNewCard] = useState(false)
  const [title, setTitle] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const tasks = await listTasks(token)
        setTasks(tasks)
        setTitle(null)
      } catch ({ message }) {
        console.log(message)
    /*    setNotification({ error: true, message })*/
      }
    })()
  }, [newCard])

  function handleCreateCard() {
    setNewCard(true)
  }

  async function handleCreateTask(event) {
    const title = event.target.value
    setTitle(title)
  }

// no entiendo bien esta función, especialmente la segunda parte
  function useOutsideAlerter(ref) {
    async function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        !title && setNewCard(false)
        title && await createTask(token, status, title)
        setNewCard(false)
      }
    }

    useEffect(() => {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return <>
    <li className={`tasks__column tasks__column-${modifier}`}>
      <h2 className='tasks__title'>{status}</h2>
      <ul className='tasks__task'>
        <li className={`task task__add task__add--${modifier}`} onClick={handleCreateCard}>
          <h3 className='task__title'>+ Add new card</h3>
        </li>
        {newCard && <li className={`task task--${modifier}`}>
          <input type='text' className={`task__title task__title--${modifier} task__new`} placeholder='Enter a title for this card' onChange={handleCreateTask} ref={wrapperRef}/>
        </li>}
        {tasks
          .filter(task => task.status === status)
          .map(task => <Card title={task.title} modifier={modifier}/>)
        }
      </ul>
    </li>
  </>
}