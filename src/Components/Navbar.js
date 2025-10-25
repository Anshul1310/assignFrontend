import "./Navbar.css";
import video from "./video.mp4";
import React from 'react'
import HeroSection from "./HeroSection2/HeroSection";

const Navbar = () => {
  return (

    <>

  <div className="body">
    <header>
      <img id="imageLogo" src="https://res.cloudinary.com/dbxtgjwyv/image/upload/v1761402377/logo4_irjrkn.png" alt="logo"/>
      <div className="navigation">
        <div className="navigation-items">
          <a href="#">Home</a>
          <a href="/events">Events</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Blog</a>
          <a href="#">Team</a>
          
        </div>
      </div>
    </header>


    <div className="home">
      <div className="content">
       
       

         <video autoPlay loop muted>
          <source src={video} type="video/mp4"></source>
        </video>
         <div className="bg">
           
        </div>
        
        <h1>FIND <span>INTEREST</span></h1>
        <p>Generate Lorem Ipsum placeholder text for usegging tools. Explore the origins, history and meaning of the famous passage, and learn how Lorem Ipsum went from Generate Lorem Ipsum placeholder text for use in your graphic, print and web layouts, and discover plugins for your favorite writing, design and blogging tools. Explore the origins, history and meaning of the famous passage, and learn how Lorem Ipsum went from</p>
        
      </div>
    </div>

    <HeroSection/>
    {/* <div className="hero-section">
      <h2>What We Offer</h2>
      <p>Generate Lorem Ipsum placeholder text for usegging tools. Explore the origins, history and meaning of the famous passage, and learn how Lorem Ipsum went from Generate Lorem Ipsum placeholder text for use in your grap</p>
      <div className="hobby">
        
          <div className="image">
            <img src="https://imgs.search.brave.com/qtGUeI6nlGllqggCEYHq2yQfLaXquaIWktPfhHKqYWU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcGljanVt/Ym8uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy93b21hbi13aXRo/LXN1bi1nbGFzc2Vz/LWluLWZsb3dlci1m/aWVsZC1zdW1tZXIt/ZnJlZS1waG90by5q/cGc_dz02MDAmcXVh/bGl0eT04MA"/>
          </div>
          <div className="hobby-right">
            <h3>Choose your hobby</h3>
            <p>From hiking, boardgaming, cricket, dance and much more. From hiking, boardgaming, cricket, dance and much more. There is something for everyone</p>
          </div>

        
      </div>
    
    
    </div> */}



    

    

{/* <div className="outermodal">
 <div className="modal">
  <h3>
    Finding Events
  </h3>

    </div>
</div>
    */}



        
    </div>

    

    </>

  
    

    
  )
}

export default Navbar