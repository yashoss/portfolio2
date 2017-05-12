import React from 'react';

export default class Home extends React.Component{

  setupCanvas(){
    // Grab canvas element
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    //canvas dimensions
  	let W = window.innerWidth;
  	let H = window.innerHeight;
  	canvas.width = W;
  	canvas.height = H;

    // Particles
    let mp = 10000; //max particles
    let cycle = 0;
    let particles = [];
    for(let i = 0; i < mp; i++)
    {
      particles.push({
        x: Math.random()*W, //x-coordinate
        y: Math.random()*H, //y-coordinate
        r: Math.random()*4+1, //radius
        d: Math.random()*mp //density
      })
    }

    const drawFast = setInterval(draw, 10);

    // Draw particles
  	function draw(){
  		ctx.clearRect(0, 0, W, H);
      if (mp > 25){
        mp -= mp * .1;
        ++cycle;
      }
      if (cycle === 57){
        clearInterval(drawFast);
        setInterval(draw, 33);
        ++cycle;
      }
      if (cycle === 10000)
  		ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  		ctx.beginPath();
  		for(let i = 0; i < mp; i++)
  		{
  			let p = particles[i];
  			ctx.moveTo(p.x, p.y);
  			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
  		}
  		ctx.fill();

      update();
  	}

    function update(){
  		let angle = 1.5;
  		for(let i = 0; i < mp; i++)
  		{
  			let p = particles[i];
  			//Updating X and Y coordinates
  			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
  			//Every particle has its own density which can be used to make the downward movement different for each flake
  			//Lets make it more random by adding in the radius
  			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
  			p.x += Math.sin(angle) * 2;

  			//Sending flakes back from the top when it exits
  			//Lets make it a bit more organic and let flakes enter from the left and right also.
  			if(p.x > W+5 || p.x < -5 || p.y > H)
  			{
  				if(i%3 > 0) //66.67% of the flakes
  				{
  					particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
  				}
  				else
  				{
  					//If the flake is exitting from the right
  					if(Math.sin(angle) > 0)
  					{
  						//Enter from the left
  						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
  					}
  					else
  					{
  						//Enter from the right
  						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
  					}
  				}
  			}
  		}
  	}
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

  slotWords(){
    const words1 = ["Designer", "Frontend", "Backend", "Intellectual", "Internet", "Software"];
    const words2 = ["", "&nbsp;Connoisseur", "&nbsp;Aficionado", "", "&nbsp;Researcher", "&nbsp;Developer"];
    let word1 = document.getElementById("word1");
    let word2 = document.getElementById("word2");
    let i = 0;
    let change_words = false;

    const altCycle = () => {
      if (change_words){
        clearInterval(change_words);
        change_words = false;
        setTimeout(altCycle, 3000);
      }else {
        i = (i+1) % 6;
        change_words = setInterval(() => {
          word1.innerHTML = words1[i];
          word2.innerHTML = words2[i];
          i = (i+1) % 6;
        }, 120);
        setTimeout(altCycle, 1550);
      }
    }

    altCycle();
  }

  expandSlotMachine(){
    let slot = document.getElementById("slot");
    setTimeout(() => {
      slot.style.height = "4vh";
    }, 200);

    setTimeout(() => {
      slot.style.width = "30vw";
      slot.style.padding = "4px 10px";
    }, 700);

    setTimeout(() => {
      this.slotWords();
    }, 4700);
  }

  componentDidMount(){
    this.setupCanvas();
    this.expandSlotMachine();
  }

  render(){
    return(
      <div className="home">
        <h1 className="name" data-text="Yasin Hosseinpur">Yasin Hosseinpur</h1>
        <div className="slot-machine" id="slot"><span className="word spinword1" id="word1">Software</span><span className="word spinword2" id="word2">&nbsp;Developer</span></div>
        <a className="navItem navItemAbout" rel="About"><span className="about-text">ABOUT</span></a>
        <a className="navItem navItemProjects" rel="Projects"><span className="projects-text">PROJECTS</span></a>
        <a className="navItem navItemContact" rel="Contact"><span className="contact-text">CONTACT</span></a>
        <canvas className="canvas"  id="canvas"></canvas>
      </div>
    )
  }

}
