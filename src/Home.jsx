import React from 'react';

export default class Home extends React.Component{

  componentDidMount(){
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

    // Draw particles
  	function draw(){
  		ctx.clearRect(0, 0, W, H);
      if (mp > 25){
        mp -= mp * .1;
      }
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

    setInterval(draw, 33);
  }

  render(){
    return(
      <div className="home">
        <div className="header"><h1 className="name" data-text="Yasin Hosseinpur">Yasin Hosseinpur</h1></div>
        <canvas id="canvas"></canvas>
      </div>
    )
  }

}
