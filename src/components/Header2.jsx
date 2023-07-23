import React,{useEffect} from 'react';
import {Link,useLocation} from "react-router-dom"

const Header2 = ()=>{
    let location = useLocation();
      
    useEffect(() => {
      console.log(location.pathname);
      // eslint-disable-next-line
    }, [Location]);



    return (
        <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-bottom" >
        <div class="container-fluid">

        <ul class="navbar-nav d-flex flex-row">
           
        <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/"><span> <i class="fas fa-shopping-cart"></i><p className='text-center my-0'>Home</p></span></Link>
        </li>
        <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/products"?"active":""}`} aria-current="page" to="/products"><span> <i class="fa-solid fa-cubes"></i><p className='text-center my-0'>Product</p></span></Link>
        </li>
        <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/gifts"?"active":""}`} aria-current="page" to="/gifts">  <span> <i class="fa-solid fa-gifts" style={{color: '#ff7b00'}}></i><p className='text-center my-0'>Gift</p></span></Link>
        </li>
        <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/games"?"active":""}`} aria-current="page" to="/games">  <span> <i class="fa-solid fa-dice"></i><p className='text-center my-0'>Game</p></span></Link>
        </li>
        <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/profile"?"active":""}`} aria-current="page" to="/profile"> <span> <i class="fa-solid fa-user"></i><p className='text-center my-0'>Me</p></span></Link>
        </li>   
        </ul>
    </div>
</nav>
        </>
    )
}

export default Header2