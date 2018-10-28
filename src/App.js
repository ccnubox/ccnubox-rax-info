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
    InfoService.getInfoList()
      .then(data => {
        native.reportInsightApiEvent("getInfo", "success", "null");
        this.setState({ data });
        native.changeLoadingStatus(true);
      })
      .catch(e => {
        native.reportInsightApiEvent("getInfo", "error", JSON.stringify(e));
        native.changeLoadingStatus(true);
        alert(`服务端错误：${JSON.stringify(e)}`);
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
        {item.phone.map(num => {
          return (
            <Touchable
              onPress={() => {
                native.makePhoneCall(num);
              }}
            >
              <Text style={styles.textHead}>{item.apartment}</Text>
              <View style={[styles.phoneContainer]}>
                <Text style={[styles.text]}>电话：</Text>
                <Text style={[styles.text, styles.phone]}>{num}</Text>
              </View>
              <Text style={[styles.text, styles.paddingTop]}>
                地址：
                {item.place}
              </Text>
            </Touchable>
          );
        })}
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
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  phone: {
    color: "#feb75a"
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
