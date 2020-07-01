import MatchGenerator from "../../generator/match-gen";

const generateSingleMatch = () => {
  const mgen = new MatchGenerator();
  const singleMatch = mgen.generateSingleMatch();
  return singleMatch;
};

export default generateSingleMatch;
