
const contentBlocks = [
  {
    type: "text-video",
    title: "Behaviour Tree",
    text: `Our AI basically has four states. Patrol, Chase, Attack and Investigate. My goal when creating the nodes for the tree has been reusability so if we want
    to use a behaviour tree for our next project we don't have to redo everything. I have taken a lot of inspiration from Unreal regarding what nodes might be required and
    how they are implemented. I plan to make a behaviour tree editor for our next project and be able to create nodes with visual scripting.`,
    video: `video/BehaviourKnight.mp4`
  },
  {
    type: "text-only",
    title: "Animations",
    text: `Since the last project I added more functionality to our animations. We can now import animation events from the FBX files which makes it easier to trigger
    events at the correct time in the animation. Something that we struggled quite a bit with during our previous project.`,
    image: `images/p4screenshot4.png`
  },
  {
    type: "text-video",
    title: "",
    text: `We can also import sockets which are locations in the animation that we can place objects on. Our AI for example has a socket 
    by the head which we use as an achor for the vision cone so wherever the AI looks in the animation the vision cone will follow and gather sight info.`,
    video: `video/socketWithVisionCone.mp4`
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