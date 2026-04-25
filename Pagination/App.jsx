import React, { useEffect, useState } from 'react'

const App = () => {
  const [data,setData] = useState([])
  const [page,setPage] = useState(1)
  const [totalPages,setTotalPages] = useState(0)
  const fetchData = async()=>{
    const res = await fetch(`https://dummyjson.com/products?limit=18&skip=${page * 18 - 18}`)
    const json = await res.json()
    setData(json.products)
    console.log(json.total)
    setTotalPages(Math.floor(json.total/18))
  }
  useEffect(()=>{
    fetchData();
  },[page])
  const handleSelectorPage = (selectedPage)=>{
    if(selectedPage>0 && selectedPage<=totalPages && selectedPage !== page){
      setPage(selectedPage)
    }
  }
  return (
    <div>
      {data.length>0 && 
      <div className='products'>
        {data.map((prod)=>{
          return (<span className='products__single' key={prod.id}>
            <img src={prod.thumbnail} alt={prod.title}/>
            <p>{prod.title}</p>
          </span>)
        })}
        </div>}
        {data.length>0&&(
          <div className='pagination'>
            <span onClick={()=>handleSelectorPage(page-1)}
              className={page>1?"":"pagination__disabled"}>←</span>
            {[...Array(Math.floor(totalPages))].map((_,i)=>{
              return (<span className={page===i+1?"pagination__Selected":""} onClick={()=>{setPage(i+1)}} key={i}>
                {i+1}
              </span>)
            })}
            <span onClick={()=>handleSelectorPage(page+1)}
              className={page<Math.floor(totalPages)?"":"pagination__disabled"}>→</span>
          </div>
        )}
    </div>
  )
}

export default App
