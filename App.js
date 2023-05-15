import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {

  const [score, setScore] = useState({
    'X': 0,
    'O': 0,
  });

  const winConditions = [
    ['top1', 'top2', 'top3'],
    ['mid1', 'mid2', 'mid3'],
    ['bot1', 'bot2', 'bot3'],
    ['top1', 'mid1', 'bot1'],
    ['top2', 'mid2', 'bot2'],
    ['top3', 'mid3', 'bot3'],
    ['top1', 'mid2', 'bot3'],
    ['top3', 'mid2', 'bot1'],
  ];

  const [board, setBoard] = useState({
    top1: '',
    top2: '',
    top3: '',
    mid1: '',
    mid2: '',
    mid3: '',
    bot1: '',
    bot2: '',
    bot3: '',
  });

  const [turn, setTurn] = useState('X');

  const [occupiedTiles, setOccupiedTiles] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      checkWin();
    }, 300);

  }, [board]);


  function checkWin() {
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        const winner = board[a];
        setScore({ ...score, [winner]: score[winner] + 1 });
        Alert.alert(`${board[a]} wins!`, "Ready for revenge? \nYou have no choice anyway 😀", [
          {
            text: 'New Game',
            onPress: () => {
              setBoard({
                top1: '',
                top2: '',
                top3: '',
                mid1: '',
                mid2: '',
                mid3: '',
                bot1: '',
                bot2: '',
                bot3: '',
              });
              setOccupiedTiles([]);
              setTurn('X');

            },
          }]);
        return;
      }
    }
  }

  function onPressTile(tile) {

    if (occupiedTiles.includes(tile)) { return }

    setBoard({ ...board, [tile]: turn });

    setOccupiedTiles([...occupiedTiles, tile]);
    setTurn(turn === 'X' ? 'O' : 'X');

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.row}>
        <View onTouchEnd={() => onPressTile('top1')} style={styles.tile}>
          <Text style={styles.tileText}>{board.top1}</Text>
        </View>
        <View onTouchEnd={() => onPressTile('top2')} style={styles.tile}>
          <Text style={styles.tileText}>{board.top2}</Text>
        </View>
        <View onTouchEnd={() => onPressTile('top3')} style={styles.tile}>
          <Text style={styles.tileText}>{board.top3}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View onTouchEnd={() => onPressTile('mid1')} style={styles.tile}>
          <Text style={styles.tileText}>{board.mid1}</Text>
        </View>
        <View onTouchEnd={() => onPressTile('mid2')} style={styles.tile}>
          <Text style={styles.tileText}>{board.mid2}</Text>
        </View>
        <View onTouchEnd={() => onPressTile('mid3')} style={styles.tile}>
          <Text style={styles.tileText}>{board.mid3}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View onTouchEnd={() => onPressTile('bot1')} style={styles.tile}>
          <Text style={styles.tileText}>{board.bot1}</Text>
        </View>
        <View onTouchEnd={() => onPressTile('bot2')} style={styles.tile}>
          <Text style={styles.tileText}>{board.bot2}</Text>
        </View>
        <View onTouchEnd={() => onPressTile('bot3')} style={styles.tile}>
          <Text style={styles.tileText}>{board.bot3}</Text>
        </View>
      </View>
      <View style={styles.statsWrapper}>
        <Text style={[styles.stats, { color: '#5e548e' }]}>Next: {turn}</Text>
        <View style={{ borderBottomColor: '#c8e7ff', borderBottomWidth: 1, width: 300 }}></View>
        <Text style={styles.stats}>Total Wins:</Text>
        <Text style={styles.stats}> X : {score.X}</Text>
        <Text style={styles.stats}> O : {score.O}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90a8c3',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  tile: {
    width: 100,
    height: 100,
    backgroundColor: '#c8e7ff',
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 50,
    position: 'absolute',
    top: 50,
    marginTop: 20,
    color: '#c8e7ff',
  },
  tileText: {
    fontSize: 70,
    color: '#4f5d75',
  },
  stats: {
    fontSize: 30,
    color: 'white',
    margin: 10,
  },
  statsWrapper: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

