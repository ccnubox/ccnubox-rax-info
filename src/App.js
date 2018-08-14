import { createElement, Component, render } from "rax";
import View from "rax-view";
import Text from "rax-text";
import Touchable from "rax-touchable";
import ListView from "rax-listview";
import InfoService from "./services";
const native = require("@weex-module/test");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      data: []
    };
  }

  componentWillMount() {
    InfoService.getInfoList().then(data => {
      this.setState({ data });
      native.changeLoadingStatus(true);
    });
  }

  listItem = (item, index) => {
    return (
      <View
        style={[
          styles.item,
          index === 0 ? styles.list_first_item : {},
          index === this.state.data.length - 1 ? styles.item_last_item : {}
        ]}
      >
        <Text style={styles.textHead}>{item.apartment}</Text>
        {item.phone.map(num => {
          return (
            <Touchable
              onPress={() => {
                native.makePhoneCall(num);
              }}
            >
              <Text style={styles.text}>
                电话：
                {num}
              </Text>
            </Touchable>
          );
        })}
        <Text style={[styles.text, styles.paddingTop]}>
          地址：
          {item.place}
        </Text>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <ListView renderRow={this.listItem} dataSource={this.state.data} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#efeff4"
  },
  textHead: {
    color: "#6767fa",
    fontSize: 32,
    paddingTop: 32,
    paddingBottom: 17
  },
  text: {
    fontSize: 24,
    color: "#434343"
  },
  item: {
    height: 250,
    backgroundColor: "#fff",
    marginBottom: 18,
    paddingLeft: 60,
    paddingRight: 60
  },
  paddingTop: {
    paddingTop: 27
  },
  list_first_item: {
    marginTop: 24
  },
  item_last_item: {
    marginBottom: 100
  }
};

export default App;
