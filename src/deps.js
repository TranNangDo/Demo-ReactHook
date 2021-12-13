import { useState } from "react/cjs/react.development"
const tabs = ['posts', 'comments', 'albums']
function Post(){
    const [title, setTitle] = useState('')
    const [posts, setPosts] = useState([])
    const [type, setType] = useState('post')
  
    useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/${type}`).then(res => res.json()).then(posts =>{
        setPosts(posts);
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
            {post.title}
          </li>
          ))}
        </ul>
      </div>
    )
          }