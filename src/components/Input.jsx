import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { TbPaperBagOff } from "react-icons/tb";
import { BiLogIn } from 'react-icons/bi';

function Input() {
  const [list, setlist] = useState([])
  let [data, setdata] = useState({})
  const [error, seterror] = useState({})
  const [star, setstar] = useState("")
  const [cart, setcart] = useState(false)
  const [btnpos, setbtnpos] = useState("")
  const [cartlist, setcartlist] = useState([])
  const [incre, setincre] = useState(0)
  let [search, setsearch] = useState(" ")
  let [image, setImage] = useState(null);

  let [currentPage, setCurrentPage] = useState(1);
  let [perPage, setPerPage] = useState(3);
  let [ArrayPages, setArrayPages] = useState([]);
  // =============================================useeffect pagination call
  useEffect(() => {
    // let newlist = JSON.parse(localStorage.getItem("record")) || []
    // =================
    pagination()
    // ==============================================
    // setlist(newlist)
  }, [setlist, currentPage])

  // ========================================useeffect
  useEffect(() => {
    let newcartlist = JSON.parse(localStorage.getItem("cartdata")) || []
    setcartlist(newcartlist)
    // console.log(newcartlist);
  }, [setcartlist])
  // =======================================useeffect
  useEffect(() => {
    let newcount = JSON.parse(localStorage.getItem("counts"))
    setincre(newcount)
  }, [incre])
  // ============================================================pagination
  let pagination = () => {
    let stList = JSON.parse(localStorage.getItem("record"));
    let newStList = stList ? stList : []

    let totalPages = Math.ceil(newStList.length / perPage)
    // console.log(newStList.length);
    // console.log(totalPages);

    let pages = [];
    for (var i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    // console.log(pages);
    setArrayPages(pages ? pages : []);


    let lastIndex = currentPage * perPage;
    let firstIndex = lastIndex - perPage;
    // console.log(firstIndex);

    let newArray = newStList.slice(firstIndex, lastIndex) || []
    console.log(newArray);

    // setlist(newArray ? newArray : []);
    setlist(newArray)
  }
  // =======================================onchange
  let setinput = (e) => {
    let name = e.target.name;
    let value = e.target.value
    setdata({ ...data, [name]: value })

    if (name == 'image') {
      let file = e.target.files[0];
      let reader = new FileReader();

      reader.onload = () => {
        let image_render = reader.result;
        setImage(image_render)
      }

      if (file) {
        reader.readAsDataURL(file)
      }
    }
    setdata({ ...data, [name]: value });

  }


  // ======================================validation
  let validation = () => {
    let err = {}
    if (!data.name) {
      err.name = "Product name required"
    }
    else if (data.name.length < 3) {
      err.name = "Atleast 3 Word required"
    }
    if (!data.price) {
      err.price = "Price required"
    }
    else if (data.price < 0) {
      err.price = "Enter Proper Price"
    }
    if (!data.discount) {
      err.discount = "Enter Discount"
    }
    if (!star) {
      err.star = "Rate us"
    }

    return err
  }
  // ====================================onsubmit
  let handlesubmit = (e) => {
    e.preventDefault();
    // =================================pagination
    let stlist = JSON.parse(localStorage.getItem("record"))
    let newStList = stlist ? stlist : []
    // ========================================
    let validatedata = validation()
    if (Object.keys(validatedata).length > 0) {
      // console.log(validatedata);
      seterror(validatedata)
    }
    else {
      data = { ...data, ['image']: image };
      seterror({})
      let newobj = { ...data, "stars": star }

      // =================================original
      // let lists = [...list, newobj]
      // =================================change pagination
      let lists = [...newStList, newobj]
      // ===============================
      setlist(lists)
      localStorage.setItem("record", JSON.stringify(lists));

      pagination()

      setdata({})
      setstar("")
      setImage(null);
    }
  }
  // ========================================addtocart
  let addtocart = (i) => {
    // alert("Item added to cart")
    let count = incre + 1
    setincre(count)
    localStorage.setItem("counts", JSON.stringify(count))
    let pos = i
    // setbtnpos(pos)
    // console.log(i);
    let filtercart = list.filter((val, i) => {
      if (pos == i) {
        return val
      }
    })
    // console.log(filtercart[0]);
    let arr = [...cartlist, filtercart[0]]
    setcartlist(arr)

    localStorage.setItem("cartdata", JSON.stringify(arr));
    // console.log(arr);
  }
  // =======================================remove item cart
  let removeitem = (pos) => {
    let leftlist = cartlist.filter((val, i) => {
      return pos != i
    })
    setcartlist(leftlist)
    localStorage.setItem("cartdata", JSON.stringify(leftlist));
    let dlt = incre - 1
    setincre(dlt)
    localStorage.setItem("counts", JSON.stringify(dlt))
  }
  // ?=======================================search
  let searchitem = (e) => {
    let value = e.target.value
    setsearch(value)
  }
  // ==========================================Sort Price
  let sortprice = (e) => {
    let sortlist = [...list]
    let value = e.target.value
    if (value == "ascending") {
      sortlist.sort((a, b) => a.price - b.price)
    }
    else if (value == "descending") {
      sortlist.sort((a, b) => b.price - a.price)
    }
    setlist(sortlist)
    // console.log(value);
  }
  // ===========================================sort name
  let sortname = (e) => {
    let sortlist = [...list]
    let value = e.target.value
    if (value == "ascendingname") {
      sortlist.sort((a, b) => a.name.localeCompare((b.name)))
    }
    else if (value == "descendingname") {
      sortlist.sort((a, b) => b.name.localeCompare((a.name)))
    }
    setlist(sortlist)
    // console.log(value);
  }
  return (
    <>
      {/* ================================================================ input sec*/}
      <div className='pt-6 relative'>
        <div className="container mx-auto md:flex items-center justify-center">
          <div style={{ maxWidth: "600px" }} >
            <form action="" method='post' onSubmit={(e) => { handlesubmit(e) }}>
              <div className='md:flex flex-wrap border-2 border-slate-950 rounded-lg' >
                {/* =====================================name */}
                <div className='w-1/2'>
                  <div className='m-2'>
                    <span className='text-xl'>Name</span>
                    <div>
                      <input type="text" name='name' value={data.name ? data.name : ""} className='border-2 w-full' onChange={(e) => { setinput(e) }} />
                      <h1 className='text-red-500'>{error.name}</h1>
                    </div>
                  </div>
                </div>
                {/* ============================================star */}
                <div className='w-1/2'>
                  <div className='m-2'>
                    <span className='text-xl'>Rate</span>
                    <div>
                      {/* <input type="text" name='name' value={data.name ? data.name : ""} className='border-2 w-full' onChange={(e) => { setinput(e) }} /> */}
                      <div className='flex'>
                        {[1, 2, 3, 4, 5].map((val, i) => {
                          i = i + 1
                          return (
                            <>
                              <FaStar onClick={() => { setstar(i) }} style={star >= i ? { color: "green" } : ""} />
                            </>
                          )
                        })
                        }
                      </div>
                      <h1 className='text-red-500'>{error.star}</h1>
                    </div>
                  </div>
                </div>
                {/* =======================================price */}
                <div className='w-1/2'>
                  <div className='m-2'>
                    <span className='text-xl'>Price</span>
                    <div>
                      <input type="number" value={data.price ? data.price : ""} name='price' className='border-2 w-full' onChange={(e) => { setinput(e) }} />
                      <h1 className='text-red-500'>{error.price}</h1>
                    </div>
                  </div>
                </div>
                {/* ====================================image */}
                <div className='w-1/2'>
                  <div className='m-2'>
                    <span className='text-xl'>Select Image</span>
                    <div>
                      {/* <input type="number" value={data.price ? data.price : ""} name='price' className='border-2 w-full' onChange={(e) => { setinput(e) }} />
                      <h1 className='text-red-500'>{error.price}</h1> */}
                      <input type="file" name='image' onChange={(e) => { setinput(e) }} />
                      {image &&
                        <img src={image} alt="" srcset="" height={"100"} />
                      }
                    </div>
                  </div>
                </div>
                {/* =======================================Discount */}
                <div className='w-1/2'>
                  <div className='m-2'>
                    <span className='text-xl'>Discount</span>
                    <div>
                      <input type="number" value={data.discount ? data.discount : ""} name='discount' className='border-2 w-full' onChange={(e) => { setinput(e) }} />
                      <h1 className='text-red-500'>{error.discount}</h1>
                    </div>
                  </div>
                </div>
                {/* ====================================submit */}
                <div className='w-1/2'>
                  <div className='m-2'>
                    <div>
                      <input type="submit" className='bg-gray-950 text-white p-1 rounded-md' />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* ===================cart */}
          <div className='cart absolute right-8 md:right-36 top-10 '>
            <button className='text-4xl flex items-center' onClick={() => { setcart(!cart) }}><FaShoppingCart className='text-blue-900' />
              <h1 className='text-xl ms-3'>Cart</h1> </button>
            <h1 className='absolute right-12 top-0 text-sm bg-red-500 text-white rounded-full px-1'>{incre}</h1>
          </div>
        </div>
      </div>
      {/* ===============================cart data */}
      <div className={`fixed  top-0 bg-blue-600 w-full md:w-2/3 h-full text-white transition-all ${cart ? "right-0" : "-right-full"}`}>
        <button className='mt-5 ms-5 text-3xl' onClick={() => { setcart(!cart) }}><RxCross1 /></button>
        <div className='p-4 overflow-auto'>
          {incre == 0 ?
            <>
              <div className='text-center'>
                <TbPaperBagOff className='text-9xl text-center mx-auto' />
                <h1 className='text-4xl'> Your Cart is empty</h1>
              </div>
            </>
            :
            <table>
              <tr>
                <th className='px-2 pb-4 text-black text-xl'>Item</th>
                <th className='px-2 pb-4 text-black text-xl'>Name</th>
                <th className='px-2 pb-4 text-black text-xl'>Discount</th>
                <th className='px-2 pb-4 text-black text-xl'>Price</th>
              </tr>
              {cartlist.map((val, i) => {
                return (
                  <>
                    {/* <div> */}

                    <>
                      <tr className=''>
                        <td className='md:px-3 px-0 pb-4'>
                          <img src={val.image} alt="" style={{ objectFit: "cover", height: "80px", width: "80px", borderRadius: "10px" }} />
                        </td>
                        <td className='md:px-2 px-1 pb-4 text-sm md:text-lg ' >{val.name}</td>
                        <td className='md:px-2 px-1 pb-4 text-sm md:text-lg '>{val.discount} %off</td>
                        <td className='md:px-2 px-1 pb-4 text-sm md:text-lg '>₹ {val.price}</td>
                        <td className='md:px-2 px-1 pb-4 text-sm md:text-lg  '>
                          {/* =========================================cart remove */}
                          <button onClick={() => { removeitem(i) }}><MdDelete /></button>
                        </td>
                        <td className='md:px-3 px-1 pb-4  text-sm '>
                          <button className='bg-slate-200 text-black px-6 md:px-2 py-1 rounded-xl'>Shop Now</button>
                        </td>
                      </tr>
                    </>
                    {/* </div> */}
                  </>
                )
              })

              }
              {/* <tr>
                <td className='px-3 pb-4'></td>
                <td className='px-2 pb-4 text-lg ' ></td>
                <td className='px-2 pb-4 text-lg '></td>
                <td className='px-2 pb-4 text-lg  '>total</td>
                <td className='px-2 pb-4  text-lg  '>  </td>
                <td className='px-3 pb-4  text-sm '>  </td>
              </tr> */}
            </table>
          }

        </div>
      </div>
      {/* ==============================================================product sec, seacrch item,filtter========================================= */}
      <div className=" mx-auto" style={{ maxWidth: "1100px" }}>
        <div className='ps-4 py-4 md:py-0 my-7'>
          <input type="text" placeholder='Search item' onChange={(e) => { searchitem(e) }} className='border-2 mb-4 md:mb-0' />
          <select name="" id="" className='border-2 ms-4' onChange={(e) => { sortprice(e) }}>
            <option value="" >Price</option>
            <option value="ascending" >Low to High</option>
            <option value="descending" >High to Low</option>
          </select>
          <select name="" id="" className='border-2 ms-4' onChange={(e) => { sortname(e) }}>
            <option value="" >Name</option>
            <option value="ascendingname" >ascending</option>
            <option value="descendingname" >descending</option>
          </select>
        </div>
        <div className='flex flex-wrap'>
          {list
            .filter((val, i) => {
              if (search == " ") {
                return val
              }
              else if (val.name.toLocaleLowerCase().match(search.toLocaleLowerCase())) {
                return val
              }
            })
            .map((val, i) => {
              return (
                <div className='sm:w-1/2 md:w-1/3 lg:w-1/3 w-full'>
                  <div className='m-3 rounded-md' style={{ boxShadow: "1px 1px 20px 2px grey" }}>
                    <img src={val.image} height={""} style={{ height: "400px", width: "100%", objectFit: "cover" }} />
                    {/* <img src={"https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/2/u/v/xl-triple-vv-one-nb-nicky-boy-original-imagny2ggyggpfsm.jpeg?q=70"} alt="" /> */}
                    <div className='p-3'>
                      <h1 className='text-2xl mb-2'>{val.name}</h1>
                      <h3 className='text-xl mb-2 text-green-600'>{val.discount} %off</h3>
                      <h2 className='text-2xl mb-2'> ₹ {val.price}</h2>
                      <div className='flex mb-3'>
                        {val.stars == "1" &&
                          <FaStar />
                        }
                        {val.stars == "2" &&
                          <>
                            <FaStar className='text-green-700' />
                            <FaStar className='text-green-700' />
                          </>
                        }
                        {val.stars == '3' &&
                          <>
                            <FaStar className='text-green-700' />
                            <FaStar className='text-green-700' />
                            <FaStar className='text-green-700' />
                          </>
                        }
                        {val.stars == '4' &&
                          <>
                            <FaStar className='text-green-700' />
                            <FaStar className='text-green-700' />
                            <FaStar className='text-green-700' />
                            <FaStar className='text-green-700' />
                          </>
                        }
                        {val.stars == '5' &&
                          <>
                            <FaStar className='text-green-700' />
                            <FaStar className='text-green-700' />
                            <FaStar className='text-green-700' />
                            <FaStar className='text-green-700' />
                            <FaStar className='text-green-700' />
                          </>
                        }
                      </div>
                      <button type='button' className='bg-lime-700 text-white text-lg rounded-md px-2' onClick={() => { addtocart(i) }}> Add to cart</button>
                    </div>
                  </div>
                </div>
              )
            })
          }
          <table className='mb-52'>
            <tr>
              <td>
                {
                  ArrayPages.map((v) => {
                    return (
                      <>
                        <button onClick={() => { setCurrentPage(v) }} style={{ fontSize: "30px", marginLeft: "20px", backgroundColor: "green", color: "white", borderRadius: "20px", paddingLeft: "20px" }}>{v}...</button>
                      </>
                    )
                  })
                }
              </td>
            </tr>
          </table>
        </div>
      </div>

    </>
  )
}

export default Input