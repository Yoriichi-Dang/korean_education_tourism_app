const ASSETS_PATH = "../assets/";
const IMAGES_PATH = `${ASSETS_PATH}images/`;
const AUDIO_PATH = `${ASSETS_PATH}audio/`;
const GIFTS_PATH = `${ASSETS_PATH}gifs/`;
export const images = {
  pochacco: {
    1: require(`${IMAGES_PATH}pochacco_1.png`),
    2: require(`${IMAGES_PATH}pochacco_2.jpeg`),
    3: require(`${IMAGES_PATH}pochacco_3.png`),
    4: require(`${IMAGES_PATH}pochacco_4.png`),
    5: require(`${IMAGES_PATH}pochacco_5.png`),
  },
  avatar: require(`${IMAGES_PATH}avatar.jpg`),
};
export const audios = {
  sontung: {
    1: require(`${AUDIO_PATH}sontung.mp4`),
  },
};
export const gifts = {
  1: require(`${GIFTS_PATH}congratulation.gif`),
};

export const getAudioByConversationId = (id: string) => {
  const audioMap = {
    "7": audios.sontung[1],
    "8": audios.sontung[1], // Replace with actual mappings when available
    "9": audios.sontung[1], // Replace with actual mappings when available
    "10": audios.sontung[1], // Replace with actual mappings when available
  } as Record<string, any>;

  return audioMap[id] || audios.sontung[1]; // Default fallback
};
