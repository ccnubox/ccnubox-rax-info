import {createElement, Component, render} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import ListView from 'rax-listview';
import InfoService from './services';

// 将 item 定义成组件

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      data: []
    };
  }

  componentWillMount() {
    // alert(window.location.href)
    InfoService.getInfoList()
      .then((data) => {
        this.setState({data})
      })
  }

  listItem = (item, index) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textHead}>{item.apartment}</Text>
        {item.phone.map((num) => {
          return <Text style={styles.text}>电话：{num}</Text>
        })}
        <Text style={[styles.text, styles.paddingTop]}>地址：{item.place}</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
      <ListView
        renderRow={this.listItem}
        dataSource={this.state.data}
      />
      </View>
    );
  }

};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#efeff4',
    paddingTop: 40,
    paddingBottom: 40,
  },
  textHead: {
    color: '#6767fa',
    fontSize: 32,
    paddingTop: 32,
    paddingBottom: 17,
  },
  text: {
    fontSize: 24,
    color: '#434343',
  },
  item: {
    height: 250,
    backgroundColor: '#fff',
    marginBottom: 18,
    paddingLeft: 60,
    paddingRight: 60
  },
  paddingTop: {
    paddingTop: 27,
  }

};

export default App;
