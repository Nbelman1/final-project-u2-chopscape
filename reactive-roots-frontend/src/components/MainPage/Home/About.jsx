const About = () => {
    return (
        <>
          <h2 className="light-shadow">About the Game</h2>

          <h3>What is Reactive Roots?</h3>
          <ul>
            <li>
              Reactive Roots is a browser-based recreation of the woodcutting skill from the game Old School RuneScape (OSRS).
            </li>
          </ul>

          <h3>How does it run?</h3>
          <ul>
            <li>
              The frontend runs in React. The backend runs in Spring Boot. The database runs on MySQL Workbench.
            </li>
          </ul>

          <h3>Why did you build this?</h3>
          <ul>
            <li>
              I was introduced to RuneScape (back when that was the only version) in 2002. I’ve played on and off over the years and have enjoyed many, many fond memories. I still create them today, only now the game is known as Old School RuneScape.
            </li>
            <li>
              Since learning object-oriented programming fundamentals, my experience playing the game has changed. I’m thinking about how features and systems interact with each other. I wanted to explore game engine design and thought that recreating a skill with the tech stack I knew would be an intellectually and creatively rewarding exercise. 
            </li>
          </ul>

          <h3>Why should I try it?</h3>
          <ul>
            <li>
              One of my favorite things about OSRS is the diversity of skills: you can play laid-back or high-key. You may want to kill a high-level boss, for instance, which requires extreme focus. On the other hand, skills like woodcutting promote a relaxing click-and-idle gameplay.
            </li>
            <li>
              Reactive Roots falls in the latter camp, so even if you aren’t glued to the screen, you can watch your character’s experience grow like a Reactive Root. 
            </li>
          </ul>
        </>
    );
};

export default About;
