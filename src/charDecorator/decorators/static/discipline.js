import disciplines from 'Disciplines';

export default function(char) {
  char.discipline = disciplines[char.discipline];
}