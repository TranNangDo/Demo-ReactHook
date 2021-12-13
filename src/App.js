import logo from './logo.svg';
import './App.css';
import Info from './Info';
import { useState, useEffect, useRef, useCallback } from 'react'

function App() {
  const [todos, setTodos] = useState([]);
  const data = [{
    name:"Tasty Burger",
    image:"./images/p-1.jpg",
    className:"popular__item popular__item1",
  },{
    name:"Tasty Cakes",
    image:"./images/p-2.jpg",
    className:"popular__item popular__item2",
  },{
    name:"Tasty Sweets",
    image:"./images/p-3.jpg",
    className:"popular__item popular__item3",
  },{
    name:"Tasty Cupcakes",
    image:"./images/p-4.jpg",
    className:"popular__item popular__item4",
  },{
    name:"Cold Drinks",
    image:"./images/p-5.jpg",
    className:"popular__item popular__item5",
  },{
    name:"Cold Ice-Cream",
    image:"./images/p-6.jpg",
    className:"popular__item popular__item6",
  }]
  const [show, setShow] = useState(false)
  const addTodo = useCallback(() => {
    setTodos((t) => [...t, "New Todo"]);
  }, [todos]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          {/* useState */}
          <section>
                <div class="popular space-nav" id="popular">
                    <h2 class="title">Most <span class="title__span">Popular</span> Foods</h2>
                    <div class="popular__content">
                        {data.map((produce,index) => (<Product key={index} data={produce}/>) )}
                    </div>
                </div>
          </section>
          {/* usEffect */}
          <section>
            <CountNumber/>
            <div className='post'>
            <button onClick={() => setShow(!show)}>Toggle</button>
            {show && <Post/>}
            </div>
          </section>
          {/* useRef */}
          <section>
            <TextInputWithFocusButton/>
          </section>
          <section>
          <>
      <Todos todos={todos} addTodo={addTodo} />
      
    </>
          </section>
        </div>
      </header>
    </div>
  );
}

function Product({data}){
  const [show,setShow]=useState(false)
  console.log(data);

  return (<div class={data.className}>
  <img src={data.image} alt="" onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)} />
  {show && <Info />}
  <p class="price">$5 - $20</p>
  <h3>{data.name}</h3>
  <div class="star">
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="far fa-star"></i>
  </div>
  <button>Order Now</button>
</div>)
}

function CountNumber() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
// function Post(){
//   const [title, setTitle] = useState('')
//   const [posts, setPosts] = useState([])

//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()).then(posts =>{
//       setPosts(posts);
//     })
//   },[])
  
//   return (
    
//     <div>
//       <input value={title}
//       onChange={e => setTitle(e.target.value)}
//       />
//       <ul>
//         {posts.map(post => (
//         <li key={post.id}>
//           {post.title}
//         </li>
//         ))}
//       </ul>
//     </div>

//   )
// }


const tabs = ['posts', 'comments', 'albums']
function Post(){
    const [title, setTitle] = useState('')
    const [posts, setPosts] = useState([])
    const [type, setType] = useState('comments')
  
    useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/${type}`).then(res => res.json()).then(data =>{
        setPosts(data);
      })
    }, [type])
    
    return (
      <div>
          {tabs.map(tab => (
              <button key={tab} onClick={() => setType(tab)}>{tab}</button>
          ))}
        <input value={title}
        onChange={e => setTitle(e.target.value)}
        />
        <ul>
          {posts.map(post => (
          <li key={post.id}>
            {post.title || post.name}
          </li>
          ))}
        </ul>
      </div>
    )
          }

function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` trỏ vào element text input đã được mount
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Đưa con trỏ vào ô input</button>
    </>
  );
}

const Todos = ({ todos, addTodo }) => {
  console.log("child render");
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
      <button onClick={addTodo}>Add Todo</button>
    </>
  );
};
export default App;
