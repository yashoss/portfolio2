import React from 'react';

export default class Home extends React.Component{

  constructor(props){
    super(props);
    this.icons = [];
    this.dim = Math.min(window.innerHeight * 0.15, window.innerWidth * 0.15).toString() + "px";
    this.curr_icon = false;
    window.particles = [];
  }

  clearCanvas(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let W = window.innerWidth;
    let H = window.innerHeight
    ctx.clearRect(0, 0, W, H);
    clearInterval(window.drawSlow);
    window.particles = [];
  }

  setupCanvas(max_particle = 10000, start_interval = 10){
    // Grab canvas element
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    //canvas dimensions
  	let W = window.innerWidth;
  	let H = window.innerHeight;
  	canvas.width = W;
  	canvas.height = H;

    // Particles
    let mp = max_particle; //max particles
    let cycle = 0;
    for(let i = 0; i < mp; i++)
    {
      window.particles.push({
        x: Math.random()*W, //x-coordinate
        y: Math.random()*H, //y-coordinate
        r: Math.random()*4+1, //radius
        d: Math.random()*mp //density
      })
    }

    window.drawSlow = setInterval(draw, start_interval);

    // Draw particles
  	function draw(){
  		ctx.clearRect(0, 0, W, H);
      if (mp > 25){
        mp -= mp * .1;
        ++cycle;
      }
      if (cycle === 57){
        clearInterval(window.drawSlow);
        window.drawSlow = setInterval(draw, 33);
        ++cycle;
      }
      if (cycle === 10000)
  		ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  		ctx.beginPath();
  		for(let i = 0; i < mp; i++)
  		{
  			let p = window.particles[i];
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
  			let p = window.particles[i];
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
  					window.particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
  				}
  				else
  				{
  					//If the flake is exitting from the right
  					if(Math.sin(angle) > 0)
  					{
  						//Enter from the left
  						window.particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
  					}
  					else
  					{
  						//Enter from the right
  						window.particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
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
      let icon = this.icons[(i+6-1)%6];
      this.curr_icon = icon;
      icon.style.height = "0";
      icon.style.marginTop = "100px";
      if (change_words){
        clearInterval(change_words);
        change_words = false;
        icon.style.height = this.dim;
        icon.style.marginTop = "0";
        setTimeout(altCycle, 3000);
      }else {
        i = (i+1) % 6;
        this.curr_icon = false;
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
      slot.style.padding = "10px 20px";
      this.icons[5].style.height = this.dim;
      this.icons[5].style.marginTop = "0";
    }, 700);

    setTimeout(() => {
      this.slotWords();
    }, 4700);
  }

  componentDidMount(){
    let tcanvas = document.getElementById("transition-canvas");
    tcanvas.getContext('2d').clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i=0; i<6; ++i){
      this.icons.push(document.getElementById(`img${i}`));
    }
    this.setupCanvas();
    this.expandSlotMachine();
    window.addEventListener('resize', () => {
      this.dim = Math.min(window.innerHeight * 0.15, window.innerWidth * 0.15).toString() + "px";
      if (this.curr_icon){
        this.curr_icon.style.height = this.dim;
      }
      this.clearCanvas();
      this.setupCanvas(25, 33);
    }, true)
  }

  paintScreen(ctx, delay = 0, increment, start, x, y, w, h){
    setTimeout( () => {
      let frame2 = 1;
      let segment2 = start;
      const animate2 = setInterval(() => {
      if (frame2 > 200) {
        clearInterval(animate2);
        console.log("cleared");
      }
      ctx.beginPath();
      ctx.rect(segment2, y, w, h);
      ctx.fillStyle = "#38f75e";
      ctx.fill();
      ++frame2;
      segment2 += increment;
    }, 10)}, delay)
  }

  toAbout(){
    let canvas = document.getElementById('transition-canvas');
    let ctx = canvas.getContext('2d');
    let W = window.innerWidth;
  	let H = window.innerHeight;
  	canvas.width = W;
  	canvas.height = H;
    let w = window.innerWidth/150;
    let h = window.innerHeight/6;
    this.paintScreen(ctx, 0, window.innerWidth/200, 0, 0, 0, w, h);
    this.paintScreen(ctx, 300, window.innerWidth/200, 0, 0, window.innerHeight/6, w, h);
    this.paintScreen(ctx, 100, window.innerWidth/200, 0, 0, window.innerHeight/6 * 2, w, h);
    this.paintScreen(ctx, 250, window.innerWidth/200, 0, 0, window.innerHeight/6 * 3, w, h);
    this.paintScreen(ctx, 0, window.innerWidth/200, 0, 0, window.innerHeight/6 * 4, w, h);
    this.paintScreen(ctx, 100, window.innerWidth/200, 0, 0, window.innerHeight/6 * 5, w, h);

  }

  toProjects(){
    let canvas = document.getElementById('transition-canvas');
    let ctx = canvas.getContext('2d');
    let W = window.innerWidth;
  	let H = window.innerHeight;
  	canvas.width = W;
  	canvas.height = H;
    let frame = 1;
    let segment = window.innerHeight;
    const animate = setInterval(() => {
      if (frame > 200) {
        clearInterval(animate);
        console.log("cleared");
      }
      ctx.beginPath();
      ctx.rect(0, segment, window.innerWidth/6, window.innerHeight/100);
      ctx.fillStyle = "#38f75e";
      ctx.fill();
      ++frame;
      segment -= window.innerHeight/200;
    }, 5)
    // this.props.history.push('/projects');
  }

  toContact(){
    this.props.history.push('/contact');
  }

  render(){
    return(
      <div className="home">
        <canvas className="transition-canvas"  id="transition-canvas"></canvas>
        <a onClick={this.toAbout.bind(this)} className="navItem navItemAbout" id="about" rel="About"><div className="charAbout">A</div><div className="charAbout">B</div><div className="charAbout">O</div><div className="charAbout">U</div><div className="charAbout">T</div></a>
        <a onClick={this.toProjects.bind(this)} className="navItem navItemProjects" id="projects" rel="Projects"><div className="charProj">P</div><div className="charProj">R</div><div className="charProj">O</div><div className="charProj">J</div><div className="charProj">E</div><div className="charProj">C</div><div className="charProj">T</div><div className="charProj">S</div></a>
        <a onClick={this.toContact.bind(this)} className="navItem navItemContact" id="contact" rel="Contact"><div className="charContact">C</div><div className="charContact">O</div><div className="charContact">N</div><div className="charContact">T</div><div className="charContact">A</div><div className="charContact">C</div><div className="charContact">T</div></a>
        <img src="http://res.cloudinary.com/dzjhhor8g/image/upload/v1494618930/developer_vtcqee.png" className="icon" id="img5" alt="developer icon"></img>
        <img src="http://res.cloudinary.com/dzjhhor8g/image/upload/v1494619266/designer_pbghny.png" className="icon" id="img0" alt="designer icon"></img>
        <img src="http://res.cloudinary.com/dzjhhor8g/image/upload/v1494619266/connoisseur_v9jssn.png" className="icon" id="img1" alt="connoisseur icon"></img>
        <img src="http://res.cloudinary.com/dzjhhor8g/image/upload/v1494619266/aficionado_vw5z8a.png" className="icon" id="img2" alt="aficionado icon"></img>
        <img src="http://res.cloudinary.com/dzjhhor8g/image/upload/v1494619266/intellect_acj5se.png" className="icon" id="img3" alt="intellect icon"></img>
        <img src="http://res.cloudinary.com/dzjhhor8g/image/upload/v1494619266/researcher_mukgit.png" className="icon" id="img4" alt="researcher icon"></img>
        <div className="name" data-text="Yasin Hosseinpur"><div className="first-name">Yasin</div><div className="last-name">&nbsp;Hosseinpur</div></div>
        <div className="slot-machine" id="slot"><span className="word spinword1" id="word1">Software</span><span className="word spinword2" id="word2">&nbsp;Developer</span></div>
        <canvas className="canvas"  id="canvas"></canvas>
      </div>
    )
  }

}
