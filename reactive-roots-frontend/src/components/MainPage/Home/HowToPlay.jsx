const HowToPlay = () => {
  return (
    <>
      <h2 className="light-shadow">How to Play</h2>

      <h3>How do I play?</h3>
      <ul>
        <li>
          First, create a free account - then jump in!
        </li>
        <li>
          This game was designed to be relaxing, so gameplay is very low-intensity. You click a tree to start chopping; when you fell it, you will stop. Then it’s time to chop another tree! 
        </li>
      </ul>

      <h3>How does it work?</h3>
        <ul>
          <li>
            Your woodcutting level - earned through experience - determines your success rate per chop.
          </li>
          <li>
            Higher trees not only live longer, but offer more experience per successful chop. 
          </li>
          <li>
            Normal trees are unlocked at level 1, oak trees are unlocked at level 15, and willow trees are unlocked at level 30.
          </li>
        </ul>

      <h3>What's on the user interface?</h3>
        <ul>
          <li>
            Skills tab (colored bar graph) - displays information about your current progress in the woodcutting skill.
          </li>
          <li>
            Inventory tab (green backpack) - displays how many logs you’re carrying. It can only hold 28 logs at once, so make sure to click the red X to drop them when your inventory is full (they don’t have a use yet, but future skills could change that).
          </li>
          <li>
            Logout tab (brown door) - the only way to safely log out and instantly save your progress.
          </li>
        </ul>
    </>
  );
};

export default HowToPlay;
