/**
 * Mock data for fluency passages
 */

/**
 * Mock fluency passages
 */
export const mockPassages = [
  {
    id: 'passage_1',
    title: 'The Mysterious Forest',
    text: 'Deep in the heart of the mysterious forest, ancient trees stood tall and proud. Their branches reached toward the sky, creating a canopy that filtered the sunlight into dappled patterns on the forest floor. A small stream wound its way through the undergrowth, its clear water bubbling over smooth stones. Birds called to one another from hidden perches, their songs echoing through the quiet woods. A family of deer moved silently between the trees, pausing occasionally to nibble at tender shoots of grass. The air was filled with the scent of pine needles and wildflowers. It was a peaceful place, untouched by the busy world beyond its borders.',
    wordCount: 103,
    difficulty: 'intermediate',
    targetWcpm: 120,
    category: 'narrative',
    readingLevel: '4-5',
  },
  {
    id: 'passage_2',
    title: 'The Water Cycle',
    text: 'Water is always moving in a continuous cycle. The sun heats up water from oceans, lakes, and rivers, turning it into water vapor. This process is called evaporation. As the water vapor rises into the cooler air, it condenses to form clouds. This is condensation. When the clouds become heavy with water droplets, precipitation occurs in the form of rain, snow, sleet, or hail. The water falls back to Earth and collects in bodies of water or soaks into the ground. Some of it flows as runoff into streams and rivers, eventually making its way back to the ocean. The cycle then begins again with evaporation.',
    wordCount: 98,
    difficulty: 'intermediate',
    targetWcpm: 115,
    category: 'informational',
    readingLevel: '4-5',
  },
  {
    id: 'passage_3',
    title: 'The Invention of the Telephone',
    text: 'Alexander Graham Bell invented the telephone in 1876. He was working on a device to help people with hearing impairments when he discovered that sound could be transmitted through electrical wires. On March 10, 1876, Bell made the first telephone call to his assistant, Thomas Watson. He said, "Mr. Watson, come here. I want to see you." Watson heard the words clearly and came running to Bell from another room. This successful experiment changed communication forever. Before the telephone, people had to send messages by letter or telegraph, which took much longer. The telephone allowed people to talk to each other instantly, even when they were far apart.',
    wordCount: 105,
    difficulty: 'intermediate',
    targetWcpm: 125,
    category: 'informational',
    readingLevel: '4-5',
  },
  {
    id: 'repeated_reading',
    title: 'The Lost Key',
    text: 'Maya couldn't find her house key anywhere. She looked in her backpack, on her desk, and under her bed. She even checked all her coat pockets. "Mom, have you seen my key?" she called. Her mother suggested checking the kitchen counter. Maya ran to the kitchen and there it was, right next to the fruit bowl. "I must have left it there when I got a snack after school," she thought. Maya was relieved. She put the key in her pocket and promised herself to be more careful next time.',
    wordCount: 82,
    difficulty: 'beginner',
    targetWcpm: 100,
    category: 'narrative',
    readingLevel: '2-3',
  },
  {
    id: 'choral_reading',
    title: 'The Solar System',
    text: 'Our solar system consists of the sun and everything that orbits around it. This includes eight planets, dwarf planets, moons, asteroids, and comets. The four inner planets—Mercury, Venus, Earth, and Mars—are made of rock and metal. The four outer planets—Jupiter, Saturn, Uranus, and Neptune—are much larger and made mostly of gases. Earth is the only planet known to have life. It has one moon and is the third planet from the sun. Scientists continue to explore our solar system using telescopes and spacecraft to learn more about these celestial bodies.',
    wordCount: 89,
    difficulty: 'advanced',
    targetWcpm: 130,
    category: 'informational',
    readingLevel: '5-6',
  },
  {
    id: 'timed_reading',
    title: 'The Brave Firefighter',
    text: 'The alarm rang loudly at the fire station. Firefighter Sam jumped out of bed and quickly put on his gear. He slid down the pole and ran to the fire truck. The other firefighters were already there. They raced through the city streets with sirens blaring. When they arrived at the burning building, Sam saw smoke coming from a second-floor window. A family was trapped inside. Sam and his team worked together to rescue the family and put out the fire. Everyone was safe, thanks to the brave firefighters.',
    wordCount: 84,
    difficulty: 'beginner',
    targetWcpm: 95,
    category: 'narrative',
    readingLevel: '2-3',
  },
];

/**
 * Get a passage by ID
 * 
 * @param {string} id - Passage ID
 * @returns {Object|null} - Passage object or null if not found
 */
export const getPassageById = (id) => {
  return mockPassages.find(passage => passage.id === id) || null;
};

export default {
  mockPassages,
  getPassageById,
};
