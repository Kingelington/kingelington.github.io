const canvas = document.getElementById("ai-bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const nodes = [];
const connections = [];

const nodeCount = 10;

// create nodes
for (let i = 0; i < nodeCount; i++) {
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height
  });
}

// connect nodes
nodes.forEach((node) => {
  const targets = nodes
    .filter(n => n !== node)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2); // 2 connections each

  targets.forEach(target => {
    connections.push({ from: node, to: target });
  });
});

// current "decision state"
let currentNode = nodes[0];
let currentConnection = null;
let progress = 0;
let thinking = 0;

function chooseNextConnection() {
  const options = connections.filter(c => c.from === currentNode);
  return options[Math.floor(Math.random() * options.length)];
}

function update() {
  if (!currentConnection) {
    thinking++;

    // small pause = "thinking"
    if (thinking > 30) {
      currentConnection = chooseNextConnection();
      progress = 0;
      thinking = 0;
    }
  } else {
    progress += 0.001;

    if (progress >= 1) {
      currentNode = currentConnection.to;
      currentConnection = null;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw connections
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  connections.forEach(c => {
    ctx.beginPath();
    ctx.moveTo(c.from.x, c.from.y);
    ctx.lineTo(c.to.x, c.to.y);
    ctx.stroke();
  });

  // highlight current path
  if (currentConnection) {
    ctx.strokeStyle = "rgba(0,255,200,0.4)";
    ctx.beginPath();
    ctx.moveTo(currentConnection.from.x, currentConnection.from.y);
    ctx.lineTo(currentConnection.to.x, currentConnection.to.y);
    ctx.stroke();
  }

  // draw nodes
  nodes.forEach(node => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);

    if (node === currentNode) {
      ctx.fillStyle = "#00ffcc";
    } else {
      ctx.fillStyle = "rgba(255,255,255,0.3)";
    }

    ctx.fill();
  });

  // draw moving "decision pulse"
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();

const contentBlocks = [
  {
    type: "text-image",
    title: "Planning the System",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis ligula faucibus turpis vulputate ullamcorper.
        Nullam sed dictum libero, vel convallis magna. Maecenas commodo fermentum commodo. 
        Suspendisse feugiat eros vitae volutpat lacinia. Aenean laoreet venenatis est, sed blandit ligula varius at. Aenean at consectetur nisi.
        Cras nec mi eu dui viverra porta. 
        Phasellus purus magna, interdum a ex at, porta aliquet erat. Morbi varius vitae orci et tempor. In a varius augue.
        Sed a accumsan sem. Integer luctus tellus semper, dictum mauris in, molestie erat. Vivamus tortor justo, eleifend vel nunc vitae, dapibus consequat justo. 
        Nullam lorem sem, iaculis tincidunt elit vel, varius consequat lorem. 
        Proin porta congue velit, sit amet aliquam sapien faucibus et. Phasellus orci arcu, sagittis eget porttitor luctus, imperdiet vitae odio.
        Etiam vel arcu dictum elit efficitur auctor vel ut tellus.`,
    image: "images/project1.png"
  },
  {
    type: "text-only",
    title: "Overview",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis ligula faucibus turpis vulputate ullamcorper.
        Nullam sed dictum libero, vel convallis magna. Maecenas commodo fermentum commodo. 
        Suspendisse feugiat eros vitae volutpat lacinia. Aenean laoreet venenatis est, sed blandit ligula varius at. Aenean at consectetur nisi.
        Cras nec mi eu dui viverra porta. 
        Phasellus purus magna, interdum a ex at, porta aliquet erat. Morbi varius vitae orci et tempor. In a varius augue.
        Sed a accumsan sem. Integer luctus tellus semper, dictum mauris in, molestie erat. Vivamus tortor justo, eleifend vel nunc vitae, dapibus consequat justo. 
        Nullam lorem sem, iaculis tincidunt elit vel, varius consequat lorem. 
        Proin porta congue velit, sit amet aliquam sapien faucibus et. Phasellus orci arcu, sagittis eget porttitor luctus, imperdiet vitae odio.
        Etiam vel arcu dictum elit efficitur auctor vel ut tellus.`
  },
  {
    type: "text-image",
    title: "Implementing AI Behavior",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis ligula faucibus turpis vulputate ullamcorper.
        Nullam sed dictum libero, vel convallis magna. Maecenas commodo fermentum commodo. 
        Suspendisse feugiat eros vitae volutpat lacinia. Aenean laoreet venenatis est, sed blandit ligula varius at. Aenean at consectetur nisi.
        Cras nec mi eu dui viverra porta. 
        Phasellus purus magna, interdum a ex at, porta aliquet erat. Morbi varius vitae orci et tempor. In a varius augue.
        Sed a accumsan sem. Integer luctus tellus semper, dictum mauris in, molestie erat. Vivamus tortor justo, eleifend vel nunc vitae, dapibus consequat justo. 
        Nullam lorem sem, iaculis tincidunt elit vel, varius consequat lorem. 
        Proin porta congue velit, sit amet aliquam sapien faucibus et. Phasellus orci arcu, sagittis eget porttitor luctus, imperdiet vitae odio.
        Etiam vel arcu dictum elit efficitur auctor vel ut tellus.`,
    image: "images/project2.png"
  },
  {
    type: "text-image",
    title: "Implementing AI Behavior second",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis ligula faucibus turpis vulputate ullamcorper.
        Nullam sed dictum libero, vel convallis magna. Maecenas commodo fermentum commodo. 
        Suspendisse feugiat eros vitae volutpat lacinia. Aenean laoreet venenatis est, sed blandit ligula varius at. Aenean at consectetur nisi.
        Cras nec mi eu dui viverra porta. 
        Phasellus purus magna, interdum a ex at, porta aliquet erat. Morbi varius vitae orci et tempor. In a varius augue.
        Sed a accumsan sem. Integer luctus tellus semper, dictum mauris in, molestie erat. Vivamus tortor justo, eleifend vel nunc vitae, dapibus consequat justo. 
        Nullam lorem sem, iaculis tincidunt elit vel, varius consequat lorem. 
        Proin porta congue velit, sit amet aliquam sapien faucibus et. Phasellus orci arcu, sagittis eget porttitor luctus, imperdiet vitae odio.
        Etiam vel arcu dictum elit efficitur auctor vel ut tellus.`,
    image: "images/project1.png"
  },
  {
    type: "image-only",
    image: "images/project2.png"
  }
];

const gameProjects = [
  {
    title: "Merle - the kinda incompetent wizard (In Progress)",
    image: "images/project1.png",
    link: "battle-simulator.html",
    description: "A game about a wizard who has made a mess"
  },
  {
    title: "Spite : Oathbound",
    image: "images/project2.png",
    link: "stealth-puzzle.html",
    description: "Play as a shieldmaiden..."
  },
  {
    title: "Operation Space Travel",
    image: "images/project1.png",
    link: "arena-fighter.html",
    description: "Awesome game!"
  },
  {
    title: "TunnelVision",
    image: "images/project1.png",
    link: "arena-fighter.html",
    description: "Awesome game!"
  },
  {
    title: "Pawn's Gambit",
    image: "images/project1.png",
    link: "arena-fighter.html",
    description: "Awesome game!"
  },
  {
    title: "CyberBoard",
    image: "images/project1.png",
    link: "arena-fighter.html",
    description: "Awesome game!"
  },
];

const container = document.getElementById("content-container");

if(container)
{
    contentBlocks.forEach((block, index) => {
      let contentBlock = document.createElement("div");
      
      contentBlock.classList.add("content-block");
    
      switch(block.type) {
        case "text-image":
          if (index % 2 === 1) contentBlock.classList.add("reverse");
    
          const textDiv = document.createElement("div");
          textDiv.classList.add("text");
          textDiv.innerHTML = `<h3>${block.title}</h3><p>${block.text}</p>`;
    
          const imageDiv = document.createElement("div");
          imageDiv.classList.add("image");
          imageDiv.innerHTML = `<img src="${block.image}" alt="">`;
    
          contentBlock.appendChild(textDiv);
          contentBlock.appendChild(imageDiv);
          break;
    
        case "text-only":
          contentBlock.classList.add("text-only");
          contentBlock.innerHTML = `<h3>${block.title}</h3><p>${block.text}</p>`;
          break;
    
        case "image-only":
          contentBlock.classList.add("image-only");
          contentBlock.innerHTML = `<img src="${block.image}" alt="">`;
          break;
    
        default:
          console.warn("Unknown block type:", block.type);
      }
    
      container.appendChild(contentBlock);
    });
}


const gameContainer = document.getElementById("game-container");

if(gameContainer)
{
    gameProjects.forEach(project => {
      const card = document.createElement("a");
      card.href = project.link;
      card.classList.add("project-card");
    
      card.innerHTML = `
        <div class="card-image" style="background-image: url('${project.image}')"></div>
        <div class="card-overlay">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        </div>
      `;
    
      gameContainer.appendChild(card);
    });

}

console.log(gameContainer);
console.log(gameProjects);