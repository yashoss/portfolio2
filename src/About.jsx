import React from 'react';

export default class About extends React.Component {

  componentDidMount(){
    let canvas = document.getElementById('transition-canvas');
    let ctx = canvas.getContext('2d');
    let homeLink = document.getElementById('home');
    homeLink.style.zIndex = -1;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    ctx.beginPath();
    ctx.rect(0, 0, W, H);
    ctx.fillStyle = "#38f75e";
    ctx.fill();
    [...document.getElementsByClassName('charAbout')].forEach((el) => {
      el.style.width = "16vh";
    });
    let about = document.getElementById('about');
    this.addClass(about, "sliderAb");
    setTimeout(() => about.style.display = "none", 1470);
    let frame = 1;
    let segment = -W/100;
    window.clear_paint = setInterval(() =>{
      if (frame > 151){
        clearInterval(window.clear_paint);
        homeLink.style.zIndex = 100;
      }
      ctx.clearRect(segment, 0, W/150, H);
      segment += W/150;
      ++frame;
    }, 10)
  }

  hasClass(el, className) {
    if (el.classList)
      return el.classList.contains(className)
    else
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
  }

  addClass(el, className) {
    if (el.classList)
      el.classList.add(className)
    else if (!this.hasClass(el, className)) el.className += " " + className
  }

  removeClass(el, className) {
    if (el.classList)
      el.classList.remove(className)
    else if (this.hasClass(el, className)) {
      var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
      el.className=el.className.replace(reg, ' ')
    }
  }

  toHome(){

  }

  render(){
    return(
      <div className="about-container">
        <canvas className="transition-canvas"  id="transition-canvas"></canvas>
        <div className="portrait"></div>
        <div className="about-header">Hi, my name is Yasin</div>
        <a className="navItem navItemAbout" id="about" rel="About"><div className="charAbout">A</div><div className="charAbout">B</div><div className="charAbout">O</div><div className="charAbout">U</div><div className="charAbout">T</div></a>
        <a onClick={this.toHome.bind(this)} className="navItem navItemContact" id="home" rel="Contact"><div className="charContact">H</div><div className="charContact">O</div><div className="charContact">M</div><div className="charContact">E</div></a>
      </div>
    )
  }
}
