import { useEffect, useState } from 'react';
import Layout from '../components/Layout'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {  Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';




const HomePage = () => {
const navigate = useNavigate()
const [products, setProducts] = useState([]);
const [categories, setCategories] = useState([]);
const [checked, setChecked] = useState([])
const [radio, setRadio] = useState([]);
const [total, setTotal] = useState(0);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);


  //==========get all category========================
  const getAllCategory = async()=>{
    try {
      const {data} = await axios.get('http://localhost:8000/api/v1/category/get-category')
      if(data.success){
        setCategories(data.category)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong in getting category')
    }
};
useEffect(() =>{
  getAllCategory();
  getTotal()
},[])

//=====get all products==================

const getAllProducts = async() =>{
   
  try {
    setLoading(true)
    const {data} = await axios.get(`http://localhost:8000/api/v1/product/product-list/${page}`)
      setLoading(false)
    setProducts(data.products)
  
  } catch (error) {
    setLoading(false)
    console.log(error)
    toast.error("something went wrong")
    
  }

  }
  //==========getTotal count==================================
  const getTotal = async ()=>{
    try {
      const {data}=await axios.get(`http://localhost:8000/api/v1/product/product-count`)
      setTotal(data.total)
    } catch (error) {
      console.log(error)
      
    }
  }
//===load more=====================================
useEffect(()=>{
  if(page === 1) return;
   loadMore()
},[page])


const loadMore = async()=>{
  try {
    setLoading(true)
    const {data} = await axios.get(`http://localhost:8000/api/v1/product/product-list/${page}`)
    setLoading(false)
    setProducts([...products, ...data?.products])
  } catch (error) {
    console.log(error)
    setLoading(false)
    
  }
}


  //===================== filter by category==================
  const handleFilter =(value, id)=>{
    let all = [...checked]
    if(value){
       all.push(id)
    }else{
      all = all.filter(c => c!== id)
    }
    setChecked(all)
    console.log(all)
  }
useEffect(()=>{
 if(!checked.length || !radio.length) getAllProducts()
},[checked.length, radio.length])


// get filter product=============================
useEffect(() =>{
  if(checked.length || radio.length) filterProduct()
},[checked, radio])
const filterProduct = async()=>{
  try {
    const {data} = await axios.post(`http://localhost:8000/api/v1/product/product-filters`,{checked, radio})
    setProducts(data.products)
  } catch (error) {
    console.log(error)
  }
}
  return (
    <Layout title="All product and all offers">
       <div className="row mt-3">
          <div className="col-md-2">
            <h5 className='text-center'>Filter by category</h5>
              <div className="d-flex flex-column">
              {
                categories.map((c) =>(
                  <Checkbox key={c._id} onChange={(e)=> handleFilter(e.target.checked, c._id)}>
                    {c.name}
                  </Checkbox>        
                ))
              }
              </div>
              <h5 className='text-center mt-4'>Filter by Price</h5>
              <div className="d-flex  flex-column ">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {
                    Prices.map((p) => (
                     <div key={p._id}>
                      <Radio value={p.array}> {p.name}</Radio>
                     </div> 
                    ))
                  }
                </Radio.Group>
              </div>
              <div className=" d-flex flex-column">
                <button className='btn btn-danger mx-4 mt-2' onClick={() => window.location.reload()}>RESET FILTER</button>
              </div>
          </div>
        <div className="col-md-10 ">
          {/* {JSON.stringify(radio,null,4)} */}
          <h1 className="text-center">All Products :{products.length}</h1>
            <div className="d-flex flex-wrap">
              {
                  products.map(product =>(
                      <div className="card m-2" style={{width: "18rem"}}>
                          <img src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt=''/>
                          <div class="card-body">
                              <h5 className="card-title">{product.name}</h5>
                              <p className="card-text">{product.description.substring(0, 30)}...</p>
                              <h5 className="card-text">$: {product.price}</h5>
                              <button  class="btn btn-primary ms-1" onClick={()=> navigate(`/product/${product.slug}`)}>More Detail</button>
                              <button  class="btn btn-secondary ms-1">Add To cart</button>
                          </div>
                      </div> 
                  ))
              }
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button className='btn btn-warning'
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1)
                }}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
            </div>
          </div>
          
       </div>
    </Layout>

  )
}

export default HomePage