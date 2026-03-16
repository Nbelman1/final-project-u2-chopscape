const BeginnerTips = () => {
    return (
        <>
          <h2 className="light-shadow">Beginner Tips</h2>
      
          <h3>Account Progress</h3>
            <ul>
              <li>
                You do need to create an account to play, as all of your stats and inventory are linked to your account. Creating an account is completely free.
              </li>
              <li>
                If you log out and forget about the game for a week, your progress can resume as soon as you come back!
              </li>
              <li>
                While logging out of the game instantly saves your progress, the game will automatically save your progress every 5 seconds. Great for when you’re reluctantly forced to close the browser.
              </li>
            </ul>

          <h3>Additional Mechanics</h3>
            <ul>
              <li>Each axe swing occurs every 2.4 seconds.</li>
              <li>
                Each tree type has mechanics inspired by OSRS, such as respawn and despawn timers.
              </li>
              <li>
                You can only chop one tree at a time, and you will continue to chop until it is felled. Sorry, no dual-wielding here.
              </li>
              <li>
                The experience required to level up is based on an exponential formula, so it may take longer to level up with each level you progress. 
              </li>
              <li>
                Because willow trees are the highest tier tree in the scoped version of this project, the max level is 35. Achieve that and you beat the game! For now…
              </li>
            </ul>
        </>
    );
};

export default BeginnerTips;
