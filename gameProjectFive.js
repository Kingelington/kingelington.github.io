
const contentBlocks = [
  {
    type: "text-video",
    title: "Pathfinding",
    text: `I started to work with importing a navmesh and added functionality to use it for pathfinding with Astar. All characters in the game use pathfinding, except the boss
    who is stationary. The characters are using steering behaviours to move, the player and the enemies both have a path follow controller. The enemies also has a separation controller
    so they don't clip into each other and display a flocking behaviour.`,
    video: `video/pathfinding.mp4`
  },
  {
    type: "text-image",
    title: "Enemy Behaviour",
    text: `The enemies are using a decision tree for their behaviour. The behaviour for this game is pretty simple, they can either chase, idle or fight.
    I chose a decision tree because I felt it was sufficient to support this kind of behaviour. It was fast to setup which gave us more time to iterate on the behaviour
    and balance the enemies. `,
    image: `images/p4screenshot4.png`
  },
  {
    type: "text-image",
    title: "Boss Behaviour",
    text: `For the boss I decided to use a state machine to drive the behaviour. I felt it made more sense because the boss has clear and prolonged states with different
    attacks, for example the melee attack state is a three attack combo. We ended up with six states and to manage all this with a decision tree got messy. `,
    image: `images/p4screenshot4.png`
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

         case "text-video":
          if (index % 2 === 1) contentBlock.classList.add("reverse");
    
          const textvidDiv = document.createElement("div");
          textvidDiv.classList.add("text");
          textvidDiv.innerHTML = `<h3>${block.title}</h3><p>${block.text}</p>`;
    
          const videoDiv = document.createElement("div");
          videoDiv.classList.add("video");
          videoDiv.innerHTML = `
            <video autoplay muted loop playsinline>
              <source src="${block.video}" type="video/mp4">
            </video>`;
    
          contentBlock.appendChild(textvidDiv);
          contentBlock.appendChild(videoDiv);
          break;
    
        default:
          console.warn("Unknown block type:", block.type);
      }
    
      container.appendChild(contentBlock);
    });
}