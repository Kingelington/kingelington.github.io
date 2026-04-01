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
    type: "text-only",
    title: "Motivation & Goal",
    text: `The goal of this project was to explore and learn more about GOAP. I wanted to do this by creating a small scenario with two teams competing over control points.
    The scenario allows me to make the AI plan for combat encounters, capturing and defending points and coordinate with each other.`,
  },
  {
    type: "text-only",
    title: "Result and Reflection",
    text: ` I have learned a ton about how GOAP works and making AIs plan while cooperating with each other. 
    The hardest and most time consuming part has been defining the goals and what effects the actions should have on the state. 
    You want to avoid making the goals and actions result in the AI achieving a perfect state, there should always be some desired state to reach. 
    Otherwise, the planner won’t work since you have already reached the goal and nothing needs to be done. Calculating goal relevance has also been a challenge to balance 
    as the number of goals increase.`
  },
  {
    type: "text-only",
    title: "",
    text: `I am a both satisfied and a bit disappointed with the end result. I would have liked to have added more behaviours for the AI but at the same time I feel like I have reached a solid base to build upon and add more goals and actions. 
      I would have loved to add more communication between the AI and tactical behaviours like flanking an enemy position, help a friendly to safety and take cover behind a structure. `
  },
  {
    type: "section-title",
    title: "Development Process"
  },
  {
    type: "text-image",
    title: "Goals and Actions",
    text: `Each AI has a world state that describes how they perceive the world. The goals have desired world states and actions have effects and preconditions.
    The action's effects describe what changes to the AI's world state if we perform this action, and the preconditions describe which states are required to perform the action. Some actions may also
    have preconditions that has to be evaluated while running. They can depend on something in the world that is changing and therefore must be continually evaluated. With this you can create a plan. 
    I chose to represent my world states with an enum key and an int value. I did this to be able to calculate which goal to follow based on urgency. To begin planning I start with the goal and plan backwards.
    I find an action whose effect fully or partially satisfies the desired states of the goal. When I have found an action I add its preconditions to my desired states. So, the next action will need to satisfy the
    preconditions of the action before. I keep this up until I find an action that matches the current world state of the AI which means we have found an action that we can start with. This will then output as a plan
    of actions that the AI can use to reach its goal`,
      image:"images/actionEffectAndPrecond.png"
  },
  {
    type: "text-only",
    title: "Coming up with a plan",
    text: `Astar is commonly used to make a plan of actions. We have created an Astar algorithm earlier during our education
    and we used it for pathfinding in our last game project. The one we used in the game project was adjusted to work with a navmesh which it wasnt going to be used for in this project. I wanted it to be general enough 
    to work with different kinds of graphs. I had thought of using a grid and pathfinding in this project aswell, so I wanted to make sure it worked for both my GOAP graph and 
    grid graph. I came to the conclusion that most of the calculations needs to be done in the graph. Astar is used to search
    through the graph. Calculating heuristics, getting neighbours and calculating costs for edges is tied to the specific graph and nodes we are searching through. So I made the Astar templated and the responsiblities 
    of getting neigbours etc are put in the graph.`,
  },
  {
    type: "text-image",
    title: "World States",
    text: `I started adding the control points and some new things appeared that I needed to keep in mind.
    With control points all the states isn't strongly tied to the AI agent. Control points have an owner who controls it, it has a capture progress, are their any friends or enemies nearby?
    This information is needed for planning and as I researched objects in GOAP I found a lot of information about smart objects. `,
    image: "images/startOfGame.png"
  },
  {
    type: "text-only",
    title: "Smart Objects",
    text: `Smart object can contain facts about the object. For a door it might be if it's closed or open, locked or not. The objects can also have actions which the AI can use on or with them. 
    The door for example can have an action "Open" with the preconditons that the door is closed and unlocked. This makes it possible that when planning for a goal we can take nearby interactable objects in to account
    to reach it.`
  },
  {
    type: "text-only",
    title: "Goal relevance",
    text: `A big part of this project has been about picking the most relevant goal. When control points were implemented I realized that the way goal relevance was calculated wasn't enough. 
    I had a too general calculation where I just compared the value of the current state and desired state and the biggest difference was the most relevant. But at this point it became obvious that goals 
    needed to be able to have it's own calculation of relevance. For a capture point goal we need to consider if we own it and if we need an extra point to make a decision
    on how relevant the goal is. With four control points, the number of goals and actions started to increase rapidly. I had a capture goal and action for every point. This made it both hard to maintain the goals and manage the relevance
    scoring and I felt that I wasn't really utilising GOAP. I changed the goals from Capture A, B, etc to instead have a goal "Increase Score" which becomes relevant if the team is behind on score. 
    Now I had one goal to increase the score and one action per point to capture it. When planning we use the action's cost which will be based on distance to the point and if it is defended and the cheapest action 
    will be the point that is easiest to capture.`
  },
  {
    type: "text-image",
    title: "AI that cooperates",
    text: `Now I had a goal to increase score and maintain their lead. This caused one team to be more aggresive and the other defensive. Though at first all chose the same goal and same actions.
    When the maintain lead goal was selected the AI takes a snapshot of the current state and creates a plan which caused all of them to pick the same point to defend. So here started the challenge 
    of making multiple AI's communicate their intention so their teammates can make an informed choice when they plan. When a plan is created we will commit to the plan and inform our teammates what we are doing.  
    When calculating the cost of defending a point we can take in to account how many have already commited to guarding it.`,
    image: "images/capturePointSplitBlue.gif"
  },
  {
    type: "text-image",
    title: "Reevaluating Goals and Plans",
    text: `I needed to be able to reevaluate our current goal in case something happens which makes this goal irrelevant. When I added a survive goal it was never chosen even though it should be scoring highest. 
    The problem was that we were currently trying to fulfill another goal and with no reevaluation we were stuck on that goal until it was completed. When adding goal reevaluation I also noticed that a lot of times
    the same goal was chosen as most relevant but the current plan we have might not be the most effective or viable anymore. So even if we reevaluate the goal and find the same one we also have to check if the current 
    plan we are following is the best. The goal might be to maintain the lead but another point is in more need of defending than the one we chose earlier. In the gif we see an AI with the goal Increase Score and attack action. 
    It should have switched to survive and move to heal up when so low on health but without reevaluating the goal, we will try to complete the current first before checking a new one.`,
    image: "images/StuckOnGoal.gif"
  },
];

const gameProjects = [
  {
    title: "Merle: The kinda incompetent wizard",
    image: "images/merle.png",
    link: "project-six.html",
    description: ""
  },
  {
    title: "SPITE: OATHBOUND",
    image: "images/SpiteOathbound_Thumbnail.png",
    link: "project-five.html",
    description: ""
  },
  {
    title: "Operation Space Travel",
    image: "images/p4Thumbnail.png",
    link: "project-four.html",
    description: ""
  },
  {
    title: "TunnelVision",
    image: "images/p3Thumbnail.png",
    link: "project-three.html",
    description: ""
  },
  {
    title: "Pawn's Gambit",
    image: "images/p2Thumbnail.png",
    link: "project-two.html",
    description: ""
  },
  {
    title: "CyberBoard",
    image: "images/p1Thumbnail.png",
    link: "project-one.html",
    description: ""
  },
];

const container = document.getElementById("content-container");

if(container)
{
    contentBlocks.forEach((block, index) => {
      let contentBlock = document.createElement("div");
      
      contentBlock.classList.add("content-block");
    
      switch(block.type) {
        case "section-title":
          contentBlock.classList.add("section-title");
          contentBlock.innerHTML = `<h2>${block.title}</h2>`;
          break;

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
      <div class="card-image">
        <img src="${project.image}" alt="${project.title}">
      </div>
      <div class="card-overlay">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    `;
    
      gameContainer.appendChild(card);
    });

}