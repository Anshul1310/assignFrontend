import React from 'react'
import "./HeroSection.css"
const HeroSection = () => {
  return (
     <section class="cards-section">
        <div class="section-title">
            <h2>What We Do</h2>
            <p>Discover the services and solutions that help businesses thrive in the digital age</p>
        </div>

        <div class="cards-container">
            <div class="card">
                <div class="card-icon"><img height="80px" src="https://res.cloudinary.com/dbxtgjwyv/image/upload/v1761402377/logo4_irjrkn.png"/></div>
                <h3>Curate Experiences</h3>
                <p class="card-description">Indulge in What You Love, with People Who Love it Too!. Indulge in What You Love, with People Who Love it Too!</p>
                <a href="#" class="card-link">Learn more</a>
            </div>

            <div class="card">
                <div class="card-icon"><img height="80px" src="https://res.cloudinary.com/dbxtgjwyv/image/upload/v1761402377/logo4_irjrkn.png"/></div>
                <h3>Discover Passion</h3>
                                <p class="card-description">Indulge in What You Love, with People Who Love it Too!. Indulge in What You Love, with People Who Love it Too!</p>

                <a href="#" class="card-link">Learn more</a>
            </div>

            <div class="card">
                <div class="card-icon"><img height="80px" src="https://res.cloudinary.com/dbxtgjwyv/image/upload/v1761402377/logo4_irjrkn.png"/></div>
                <h3>Build Connections</h3>
                <p class="card-description">Indulge in What You Love, with People Who Love it Too!. Indulge in What You Love, with People Who Love it Too!</p>
                <a href="#" class="card-link">Learn more</a>
            </div>

           

            
            <div class="card">
                <div class="card-icon"><img height="80px" src="https://res.cloudinary.com/dbxtgjwyv/image/upload/v1761402377/logo4_irjrkn.png"/></div>
                <h3>Foster Commnunities</h3>
                <p class="card-description">Indulge in What You Love, with People Who Love it Too!. Indulge in What You Love, with People Who Love it Too!</p>
                <a href="#" class="card-link">Learn more</a>
            </div>
        </div>
    </section>
  )
}

export default HeroSection